"""Views for the planner application."""
from datetime import date
from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse
from .models import WorkingDay
from .choices import MOOD_AVERAGE, PRODUCTIVITY_AVERAGE, TASK_FORM_KEYS
from .helpers import save_task, initialize_forms


def home(request: HttpRequest) -> HttpResponse:
    """Home page view."""
    working_day, _ = WorkingDay.objects.get_or_create(
        date=date.today(),
        defaults={
            'mood': MOOD_AVERAGE,
            'productivity_rating': PRODUCTIVITY_AVERAGE
        }
    )

    if request.method == 'POST':
        return handle_post(request, working_day)

    return handle_get(request, working_day)


def handle_post(request: HttpRequest, working_day: WorkingDay) -> HttpResponse:
    """Handle the POST request for the home page."""
    forms = initialize_forms(request, working_day)

    # Check that all forms are valid before saving anything
    if (forms['working_day_form'].is_valid() and
            all(forms[form_key].is_valid() for form_key in TASK_FORM_KEYS)):
        forms['working_day_form'].save()

        # Save tasks
        for form_key in TASK_FORM_KEYS:
            save_task(forms[form_key], working_day)

        return redirect('home')

    return render_home_page(request, **forms)


def handle_get(request: HttpRequest, working_day: WorkingDay) -> HttpResponse:
    """Handle the GET request for the home page."""
    forms = initialize_forms(request, working_day)

    return render_home_page(request, **forms)


def render_home_page(request: HttpRequest, **forms) -> HttpResponse:
    """Render the home page with the given forms."""
    return render(request, 'planner/home.html', forms)
