"""Manager for CustomUser model."""

from django.contrib.auth.models import UserManager
from django.db import models
from django.db.models import Q
from softdelete.models import SoftDeleteManager


class CustomUserQuerySet(models.QuerySet):
    """CustomUser QuerySet."""

    def active_users(self) -> models.QuerySet:
        """Active users.

        Excludes anonymous user and admin account.
        """
        return self.filter(Q(is_superuser=False), ~Q(email="AnonymousUser"))


class CustomUserManager(UserManager, SoftDeleteManager):
    """CustomerUser Manager."""

    def get_queryset(self) -> CustomUserQuerySet:
        """Redefine queryset."""
        return CustomUserQuerySet(self.model, using=self._db)

    def active_users(self) -> models.QuerySet:
        """Determine the number of users."""
        return self.get_queryset().active_users()

    def _create_user(self, username, email, password, **kwargs):
        if not username:
            raise ValueError("Please provide a username.")
        if not email:
            raise ValueError("Please provide an e-mail.")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username=None, email=None, password=None, **kwargs):
        """Create user."""
        kwargs.setdefault("is_staff", False)
        kwargs.setdefault("is_superuser", False)
        return self._create_user(username, email, password, **kwargs)

    def create_superuser(self, username=None, email=None, password=None, **kwargs):
        """Create a superuser."""
        kwargs.setdefault("is_staff", True)
        kwargs.setdefault("is_superuser", True)
        return self._create_user(username, email, password, **kwargs)
