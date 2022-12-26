"""Profile."""

from project.models import CustomUser
from project.serializers import ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


class ProfileViewSet(APIView):
    """Custom users."""

    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """Queryset."""
        return CustomUser.objects.filter(pk=self.request.pk)

    def get_serializer_class(self):
        """Serializers."""
        return ProfileSerializer
