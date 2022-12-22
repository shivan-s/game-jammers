"""Main urls."""

from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic.base import RedirectView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("project.urls")),
    re_path(
        r"^(\/)(api)?(\/)?$",
        RedirectView.as_view(url="api/v1", permanent=True),
        name="index",
    ),
]
