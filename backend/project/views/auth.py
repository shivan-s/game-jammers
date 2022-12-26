"""Auth0."""

from functools import wraps

import jwt
from rest_framework import status
from rest_framework.response import Response


def get_token_auth_header(request):
    """Obtain the access token from the Authorization Header."""
    auth = request.META.get("HTTP_AUTHORIZATION", None)
    if auth is None:
        return ""
    parts = auth.split()
    if len(parts) < 2:
        return ""
    token = parts[1]
    return token


def request_scope(required_scope: str):
    """Determine if the required scope is present in the Access Token.

    Args:
        required_scope (str): The scope required to access resource.
    """

    def require_scope(func):
        @wraps(func)
        def decorated(*args, **kwargs):
            token = get_token_auth_header(args[0])
            decoded = jwt.decode(token, verify=False)
            if decoded.get("scope"):
                token_scopes = decoded["scope"].split()
                for token_scope in token_scopes:
                    if token_scope == required_scope:
                        return func(*args, **kwargs)
            response = Response("message", "You do not have access to this resource")
            response.status_code = status.HTTP_403_FORBIDDEN
            return response

        return decorated

    return require_scope
