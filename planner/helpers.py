"""Helper functions for the planner application."""
from django.http import HttpRequest
from .forms import TaskForm, WorkingDayForm
from .models import WorkingDay


def save_task(form: TaskForm, working_day: WorkingDay) -> None:
    """Save a task associated with the given working day."""
    task = form.save(commit=False)
    task.working_day = working_day
    task.save()


def initialize_forms(request: HttpRequest, working_day: WorkingDay) -> dict:
    """Initialize the forms for the home page."""
    working_day_form = WorkingDayForm(request.POST, instance=working_day)
    main_task_form = TaskForm(request.POST, prefix='main_task')
    secondary_task_form_1 = TaskForm(request.POST, prefix='secondary_task_1')
    secondary_task_form_2 = TaskForm(request.POST, prefix='secondary_task_2')
    additional_task_form_1 = TaskForm(request.POST, prefix='additional_task_1')
    additional_task_form_2 = TaskForm(request.POST, prefix='additional_task_2')
    return {
        'working_day_form': working_day_form,
        'main_task_form': main_task_form,
        'secondary_task_form_1': secondary_task_form_1,
        'secondary_task_form_2': secondary_task_form_2,
        'additional_task_form_1': additional_task_form_1,
        'additional_task_form_2': additional_task_form_2
    }
