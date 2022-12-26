"""Utils."""

import json
from urllib.parse import urlparse

import jwt
import requests
from django.conf import settings
from django.contrib.auth import authenticate


def jwt_get_username_from_payload_hander(payload):
    """Obtain username from JWT token."""
    username = payload.get("sub").replace("|", ".")
    authenticate(remote_user=username)


def jwt_decode_token(token):
    """Decode token."""
    header = jwt.get_unverified_header(token)
    issuer_url = settings.JWT_AUTH.get("JWT_ISSUER")
    issuer = urlparse(issuer_url).netloc
    jwks = requests.get(f"https://{issuer}/.well-known/jwks.json").json()
    public_key = None
    for jwk in jwks["keys"]:
        if jwk["kid"] == header["kid"]:
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

    if public_key is None:
        raise Exception("Public key not found.")

    return jwt.decode(
        token,
        public_key,
        authenticate=settings.JWT_AUTH.get("JWT_AUDIENCE"),
        issuer=issuer,
        algorithms=settings.JWT_AUTH.get("JWT_ALGORITHM"),
    )
