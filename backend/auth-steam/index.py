"""
Редирект пользователя на страницу авторизации Steam через OpenID 2.0.
"""
import os
from urllib.parse import urlencode


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

    # URL, куда Steam вернёт пользователя после авторизации
    callback_url = os.environ.get("SITE_URL", "").rstrip("/") + "/api/auth-steam-callback"

    params = {
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": callback_url,
        "openid.realm": os.environ.get("SITE_URL", ""),
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
    }

    steam_url = "https://steamcommunity.com/openid/login?" + urlencode(params)

    return {
        "statusCode": 302,
        "headers": {
            "Location": steam_url,
            "Access-Control-Allow-Origin": "*",
        },
        "body": "",
    }
