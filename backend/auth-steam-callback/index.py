"""
Обрабатывает ответ Steam после авторизации через OpenID 2.0.
Верифицирует подпись, получает профиль пользователя, создаёт/обновляет запись в БД,
выдаёт cookie-сессию и редиректит на сайт.
"""
import os
import re
import secrets
import urllib.request
import urllib.parse
import json
import psycopg2


SCHEMA = "t_p2036102_day_after_landing"
STEAM_API_KEY = os.environ.get("STEAM_API_KEY", "")


def verify_openid(params: dict):
    """Верифицирует OpenID-ответ Steam. Возвращает steam_id или None."""
    # Строим запрос верификации
    verify_params = dict(params)
    verify_params["openid.mode"] = "check_authentication"

    data = urllib.parse.urlencode(verify_params).encode()
    req = urllib.request.Request(
        "https://steamcommunity.com/openid/login",
        data=data,
        method="POST",
    )
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    with urllib.request.urlopen(req, timeout=10) as resp:
        body = resp.read().decode()

    if "is_valid:true" not in body:
        return None

    # Извлекаем Steam ID из claimed_id
    claimed_id = params.get("openid.claimed_id", "")
    match = re.search(r"https://steamcommunity\.com/openid/id/(\d+)", claimed_id)
    if not match:
        return None

    return match.group(1)


def get_steam_profile(steam_id: str) -> dict:
    """Получает профиль пользователя через Steam Web API."""
    if not STEAM_API_KEY:
        return {"personaname": f"Survivor#{steam_id[-4:]}", "avatarfull": "", "profileurl": ""}

    url = (
        f"https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/"
        f"?key={STEAM_API_KEY}&steamids={steam_id}"
    )
    with urllib.request.urlopen(url, timeout=10) as resp:
        data = json.loads(resp.read().decode())

    players = data.get("response", {}).get("players", [])
    return players[0] if players else {}


def upsert_user(conn, steam_id: str, profile: dict) -> int:
    """Создаёт или обновляет пользователя. Возвращает user_id."""
    username = profile.get("personaname", f"Survivor#{steam_id[-4:]}")
    avatar_url = profile.get("avatarfull", "")
    profile_url = profile.get("profileurl", "")

    with conn.cursor() as cur:
        cur.execute(
            f"""
            INSERT INTO {SCHEMA}.users (steam_id, username, avatar_url, profile_url, last_login)
            VALUES (%s, %s, %s, %s, NOW())
            ON CONFLICT (steam_id) DO UPDATE
              SET username = EXCLUDED.username,
                  avatar_url = EXCLUDED.avatar_url,
                  profile_url = EXCLUDED.profile_url,
                  last_login = NOW()
            RETURNING id
            """,
            (steam_id, username, avatar_url, profile_url),
        )
        row = cur.fetchone()
        conn.commit()
        return row[0]


def create_session(conn, user_id: int) -> str:
    """Создаёт новую сессию и возвращает её ID."""
    session_id = secrets.token_hex(32)
    with conn.cursor() as cur:
        cur.execute(
            f"""
            INSERT INTO {SCHEMA}.sessions (id, user_id)
            VALUES (%s, %s)
            """,
            (session_id, user_id),
        )
        conn.commit()
    return session_id


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": "",
        }

    site_url = os.environ.get("SITE_URL", "").rstrip("/")
    query = event.get("queryStringParameters") or {}

    # Нет параметров — явно невалидный запрос
    if not query.get("openid.mode"):
        return {
            "statusCode": 302,
            "headers": {"Location": f"{site_url}?auth=error"},
            "body": "",
        }

    # Верификация OpenID
    steam_id = verify_openid(query)
    if not steam_id:
        return {
            "statusCode": 302,
            "headers": {"Location": f"{site_url}?auth=error"},
            "body": "",
        }

    # Получаем профиль и сохраняем пользователя
    profile = get_steam_profile(steam_id)

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    user_id = upsert_user(conn, steam_id, profile)
    session_id = create_session(conn, user_id)
    conn.close()

    username = profile.get("personaname", f"Survivor#{steam_id[-4:]}")
    avatar = profile.get("avatarfull", "")

    # Редирект на сайт с сессионной cookie
    return {
        "statusCode": 302,
        "headers": {
            "Location": f"{site_url}?auth=success&username={urllib.parse.quote(username)}&avatar={urllib.parse.quote(avatar)}",
            "X-Set-Cookie": f"da_session={session_id}; Path=/; Max-Age=2592000; SameSite=Lax",
            "Access-Control-Allow-Origin": "*",
        },
        "body": "",
    }