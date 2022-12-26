"""Routing for project."""

from django.urls import include, path
from project import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)

# /users/<user pk>
router.register(r"users", views.CustomUserViewSet, "users")

urlpatterns = [
    path("profile/", views.ProfileViewSet.as_view(), name="profile"),
    path("index/", views.index, name="index"),
    path("private/", views.private, name="private"),
    path("public/", views.public, name="public"),
    path("private_scoped/", views.private_scoped, name="private_scoped"),
    path("", include(router.urls)),
]
