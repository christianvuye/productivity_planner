"""Views for the planner application."""
from datetime import date
from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse
from .forms import WorkingDayForm, TaskForm
from .models import WorkingDay
from .choices import MOOD_AVERAGE, PRODUCTIVITY_AVERAGE
from .helpers import save_task


def handle_post(request: HttpRequest, working_day: WorkingDay) -> HttpResponse:
    """Handle the POST request for the home page."""
    working_day_form = WorkingDayForm(request.POST, instance=working_day)
    main_task_form = TaskForm(request.POST, prefix='main_task')
    secondary_task_form_1 = TaskForm(request.POST, prefix='secondary_task_1')
    secondary_task_form_2 = TaskForm(request.POST, prefix='secondary_task_2')
    additional_task_form_1 = TaskForm(request.POST, prefix='additional_task_1')
    additional_task_form_2 = TaskForm(request.POST, prefix='additional_task_2')

    if working_day_form.is_valid():
        working_day_form.save()

        if main_task_form.is_valid():
            save_task(main_task_form, working_day)

        if secondary_task_form_1.is_valid():
            save_task(secondary_task_form_1, working_day)

        if secondary_task_form_2.is_valid():
            save_task(secondary_task_form_2, working_day)

        if additional_task_form_1.is_valid():
            save_task(additional_task_form_1, working_day)

        if additional_task_form_2.is_valid():
            save_task(additional_task_form_2, working_day)

        return redirect('home')

    return render_home_page(
        request, working_day_form, main_task_form,
        secondary_task_form_1, secondary_task_form_2,
        additional_task_form_1, additional_task_form_2
    )


def handle_get(request: HttpRequest, working_day: WorkingDay) -> HttpResponse:
    """Handle the GET request for the home page."""
    working_day_form = WorkingDayForm(request.POST, instance=working_day)
    main_task_form = TaskForm(request.POST, prefix='main_task')
    secondary_task_form_1 = TaskForm(request.POST, prefix='secondary_task_1')
    secondary_task_form_2 = TaskForm(request.POST, prefix='secondary_task_2')
    additional_task_form_1 = TaskForm(request.POST, prefix='additional_task_1')
    additional_task_form_2 = TaskForm(request.POST, prefix='additional_task_2')

    return render_home_page(
        request, working_day_form, main_task_form,
        secondary_task_form_1, secondary_task_form_2,
        additional_task_form_1, additional_task_form_2
    )


def render_home_page(
    request: HttpRequest | None,
    working_day_form: WorkingDayForm,
    main_task_form: TaskForm,
    secondary_task_form_1: TaskForm,
    secondary_task_form_2: TaskForm,
    additional_task_form_1: TaskForm,
    additional_task_form_2: TaskForm
) -> HttpResponse:
    """Render the home page with the given forms."""
    context = {
        'working_day_form': working_day_form,
        'main_task_form': main_task_form,
        'secondary_task_form_1': secondary_task_form_1,
        'secondary_task_form_2': secondary_task_form_2,
        'additional_task_form_1': additional_task_form_1,
        'additional_task_form_2': additional_task_form_2
    }

    return render(request, 'planner/home.html', context)


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
