"""Views for the planner application."""
from django.shortcuts import render

def home(request):
    """Render the home page."""
    return render(request, 'planner/home.html')
