"""Custom User Serializer."""


from hashid_field.rest import HashidSerializerCharField
from project.models import CustomUser
from rest_framework import serializers


class CustomUserSerializer(serializers.ModelSerializer):
    """CustomUser Serializer for list views."""

    url = serializers.HyperlinkedIdentityField(view_name="users-detail", read_only=True)

    reference_id = serializers.PrimaryKeyRelatedField(
        pk_field=HashidSerializerCharField(
            source_field="project.CustomUser.reference_id"
        ),
        read_only=True,
    )

    class Meta:
        """Settings."""

        model = CustomUser
        fields = [
            "reference_id",
            "url",
            "username",
            "name",
            "date_joined",
        ]


class CustomUserDetailSerializer(CustomUserSerializer):
    """CustomUser Serializer for detail views.

    For example, this is the profile view.
    """

    class Meta(CustomUserSerializer.Meta):
        """Settings."""

        ...
