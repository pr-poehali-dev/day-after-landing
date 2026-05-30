"""
Сохраняет email пользователя после авторизации через Steam.
Принимает session cookie и email, обновляет запись в БД.
"""
import os
import json
import re
import psycopg2

SCHEMA = "t_p2036102_day_after_landing"


def get_user_id_by_session(conn, session_id: str):
    with conn.cursor() as cur:
        cur.execute(
            f"""
            SELECT user_id FROM {SCHEMA}.sessions
            WHERE id = %s AND expires_at > NOW()
            """,
            (session_id,),
        )
        row = cur.fetchone()
    return row[0] if row else None


def handler(event: dict, context) -> dict:
    cors = {"Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type, X-Session-Id"}

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": {**cors, "Access-Control-Allow-Methods": "POST, OPTIONS"}, "body": ""}

    body = json.loads(event.get("body") or "{}")
    email = (body.get("email") or "").strip()

    # Валидация email
    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "Некорректный email"})}

    # Получаем session_id из заголовка
    headers = event.get("headers") or {}
    session_id = headers.get("X-Session-Id") or headers.get("x-session-id") or ""

    # Fallback: из cookie
    if not session_id:
        cookie_header = headers.get("X-Cookie") or headers.get("x-cookie") or ""
        for part in cookie_header.split(";"):
            if "da_session=" in part:
                session_id = part.split("da_session=")[-1].strip()
                break

    if not session_id:
        return {"statusCode": 401, "headers": cors, "body": json.dumps({"error": "Не авторизован"})}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    user_id = get_user_id_by_session(conn, session_id)

    if not user_id:
        conn.close()
        return {"statusCode": 401, "headers": cors, "body": json.dumps({"error": "Сессия не найдена"})}

    with conn.cursor() as cur:
        cur.execute(
            f"UPDATE {SCHEMA}.users SET email = %s WHERE id = %s",
            (email, user_id),
        )
        conn.commit()
    conn.close()

    return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}
