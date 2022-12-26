"""Index."""

from project.models import CustomUser
from project.serializers import ProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .auth import request_scope


@api_view(http_method_names=["GET"])
def index(request):
    """Message for index."""
    if request.user.is_authenticated:
        return Response({"message": f"Welcome, {request.user.username}"})
    return Response({"message": "Welcome"})


@api_view(["GET"])
@permission_classes([AllowAny])
def public(request):
    """Public endpoint."""
    return Response({"message": "Public endpoint reached."})


@api_view(["GET"])
def private(request):
    """Private endpoint."""
    return Response({"message": "Private endpoint reached."})


@api_view(["GET"])
@request_scope("read:messages")
def private_scoped(request):
    """Scoped endpoint."""
    return Response({"message": "Scoped endpoint."})
