"""Custom User model."""

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.mail import send_mail
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from hashid_field import HashidAutoField
from simple_history.models import HistoricalRecords
from softdelete.models import SoftDeleteObject

from .managers import CustomUserManager

alphanumeric = RegexValidator(
    r"^\w*$", "Only alphabet, numbers, and underscores ('_') are accepted."
)


class CustomUser(AbstractBaseUser, PermissionsMixin, SoftDeleteObject):
    """User model for application.

    Features soft deletion.
    """

    username_validator = UnicodeUsernameValidator()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    reference_id = HashidAutoField(
        primary_key=True, salt=f"custom_user_{settings.HASHID_FIELD_SALT}"
    )
    username = models.CharField(
        _("username"),
        unique=True,
        max_length=50,
        validators=[username_validator],
    )
    email = models.EmailField(_("e-mail"), unique=True)

    name = models.CharField(_("display name"), max_length=50, blank=True, null=True)

    # TODO: set is_active to False when setting up email authentication.
    is_active = models.BooleanField(_("is active"), default=True)
    is_superuser = models.BooleanField(_("is superuser"), default=False)
    is_staff = models.BooleanField(_("is staff"), default=False)

    date_joined = models.DateTimeField(_("date joined"), default=timezone.now())
    last_login = models.DateTimeField(_("last login"), blank=True, null=True)

    is_private = models.BooleanField(_("is_private"), default=False)

    history = HistoricalRecords()

    objects = CustomUserManager()

    def get_full_name(self):
        """Return the name of the user."""
        return self.name

    def get_short_name(self):
        """Shadows get_full_name()."""
        return self.get_full_name()

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Email the user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def __str__(self):
        """Represent string."""
        return f"{self.pk} - {self.email} {self.username}"

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
