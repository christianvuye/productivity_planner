"""Views for the planner application."""
from datetime import date
from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse
from .forms import WorkingDayForm, TaskForm
from .models import WorkingDay


def home(request: HttpRequest) -> HttpResponse:
    """Render the home page and handle form submissions."""

    # Try to get today's working day, or create one if it does not exist.
    # pylint: disable=E1101
    try:
        working_day = WorkingDay.objects.get(date=date.today())
    except WorkingDay.DoesNotExist:
        working_day = WorkingDay.objects.create(date=date.today())

    # Handle form submissions.
    if request.method == 'POST':
        working_day_form = WorkingDayForm(request.POST, instance=working_day)

        # Main task form.
        main_task_form = TaskForm(request.POST, prefix='main_task')

        # Secondary tasks form.
        secondary_task_form_1 = TaskForm(
            request.POST, prefix='secondary_task_1'
        )
        secondary_task_form_2 = TaskForm(
            request.POST, prefix='secondary_task_2'
        )

        # Additional tasks form.
        additional_task_form_1 = TaskForm(
            request.POST, prefix='additional_task_1'
        )
        additional_task_form_2 = TaskForm(
            request.POST, prefix='additional_task_2'
        )

        # Check if the working day and main task forms are valid.
        # Working day form and main task form are required.
        # Secondary and additional task forms are optional.
        if working_day_form.is_valid() and main_task_form.is_valid():
            working_day = working_day_form.save()
            main_task = main_task_form.save(commit=False)
            main_task.working_day = working_day
            main_task.save()

            # Save secondary tasks.
            if secondary_task_form_1.is_valid():
                secondary_task_1 = secondary_task_form_1.save(commit=False)
                secondary_task_1.working_day = working_day
                secondary_task_1.save()

            if secondary_task_form_2.is_valid():
                secondary_task_2 = secondary_task_form_2.save(commit=False)
                secondary_task_2.working_day = working_day
                secondary_task_2.save()

            # Save additional tasks.
            if additional_task_form_1.is_valid():
                additional_task_1 = additional_task_form_1.save(commit=False)
                additional_task_1.working_day = working_day
                additional_task_1.save()

            if additional_task_form_2.is_valid():
                additional_task_2 = additional_task_form_2.save(commit=False)
                additional_task_2.working_day = working_day
                additional_task_2.save()

        # Redirect to the home page if successful and to prevent resubmission.
        # If not valid, render the page again with the error messages.
        return redirect('home')

    # Handle GET requests when the page is loaded initially.
    else:
        # Populate the forms with existing data or empty forms.
        working_day_form = WorkingDayForm(instance=working_day)
        main_task_form = TaskForm(prefix='main_task')
        secondary_task_form_1 = TaskForm(prefix='secondary_task_1')
        secondary_task_form_2 = TaskForm(prefix='secondary_task_2')
        additional_task_form_1 = TaskForm(prefix='additional_task_1')
        additional_task_form_2 = TaskForm(prefix='additional_task_2')

    context = {
        'working_day_form': working_day_form,
        'main_task_form': main_task_form,
        'secondary_task_form_1': secondary_task_form_1,
        'secondary_task_form_2': secondary_task_form_2,
        'additional_task_form_1': additional_task_form_1,
        'additional_task_form_2': additional_task_form_2,
    }

    return render(request, 'planner/home.html', context)
