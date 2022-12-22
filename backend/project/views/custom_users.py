"""CustomUser Viewset."""

from project.models import CustomUser
from project.serializers import CustomUserDetailSerializer, CustomUserSerializer
from rest_framework import viewsets


class CustomUserViewSet(viewsets.ReadOnlyModelViewSet):
    """Custom users."""

    def get_queryset(self):
        """Queryset."""
        return CustomUser.objects.all()

    def get_serializer_class(self):
        """Serializers."""
        if self.action == "retrieve":
            return CustomUserDetailSerializer
        return CustomUserSerializer

    class Meta:
        ordering = ["-date_joined"]
