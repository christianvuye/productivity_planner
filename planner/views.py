"""Views for the planner application."""
from django.shortcuts import render
from django.http import HttpRequest, HttpResponse


def home(request: HttpRequest) -> HttpResponse:
    """Render the home page."""
    return render(request, 'planner/home.html')
