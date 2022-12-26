"""Profile Serializer."""


from hashid_field.rest import HashidSerializerCharField
from project.models import CustomUser
from rest_framework import serializers


class ProfileSerializer(serializers.ModelSerializer):
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
            "email",
            "username",
            "name",
            "date_joined",
        ]
