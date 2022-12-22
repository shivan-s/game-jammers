"""Admin for user model."""

from typing import Sequence

from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserChangeForm, UserCreationForm
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class CustomUserCreationForm(UserCreationForm):
    """Customising the admin form."""

    class Meta:
        """Setting for form."""

        model = User
        fields = ("name",)


class CustomUserChangeForm(UserChangeForm):
    """Change the admin form."""

    class Meta:
        """Setting for form."""

        model = User
        fields = ("name",)


@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    """Custom Admin form for users."""

    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    search_fields = ("username", "name", "email")
    readonly_fields = ("reference_id", "date_joined", "last_login")
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "reference_id",
                    "password",
                )
            },
        ),
        (_("Personal Information"), {"fields": ("username", "email", "name")}),
        (
            _("Persmissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                ),
            },
        ),
        (_("Important Dates"), {"fields": ("last_login", "date_joined")}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("password1", "password2"),
            },
        ),
    )
