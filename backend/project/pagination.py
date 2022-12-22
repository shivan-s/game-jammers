"""Pagination."""

from rest_framework.pagination import CursorPagination


class CustomCursorPagination(CursorPagination):
    """CursorPagination."""

    ordering = ["-date_joined"]
