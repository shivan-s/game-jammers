"""Main urls."""

from django.contrib import admin
from django.shortcuts import render
from django.urls import include, path
from django.views.generic.base import RedirectView

urlpatterns = [
    path("", lambda request: render(request, "index.html")),
    path("admin/", admin.site.urls),
    path("api/v1/", include("project.urls")),
    path("api/", RedirectView.as_view(url="api/v1", permanent=True), name="api_index"),
]
