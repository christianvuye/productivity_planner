"""Helper functions for the planner application.

This module contains utility functions for managing tasks and forms in the
planner application.

It provides functionality for saving tasks and initializing various forms used
in the day planning interface.

The module handles the interaction between the web interface and the database
models for WorkingDay and Task entities.
"""
from django.http import HttpRequest
from .forms import TaskForm, WorkingDayForm
from .models import WorkingDay


def save_task(form: TaskForm, working_day: WorkingDay) -> None:
    """Save a task associated with the given working day.

    This function handles the process of saving a task form to the database
    while establishing the relationship with its corresponding working day.

    It performs a two-step save to ensure the working_day relationship is
    properly set.

    Args:
        form (TaskForm): A validated task form containing the task data
        working_day (WorkingDay): The WorkingDay instance to associate the
                                  task with
    """
    task = form.save(commit=False)
    task.working_day = working_day
    task.save()


def initialize_forms(
    request: HttpRequest, working_day: WorkingDay
) -> dict[str, WorkingDayForm | TaskForm]:
    """Initialize the forms for the home page.

    Creates and returns a dictionary containing all the forms needed for the
    day planning interface.

    This includes one WorkingDay form and multiple Task forms for different
    priority levels (main, secondary, and additional tasks).

    The forms are either bound to POST data if it's a POST request, or unbound
    for GET requests.

    Args:
        request (HttpRequest): The current HTTP request object
        working_day (WorkingDay): The WorkingDay instance to bind to the
                                  working day form

    Returns:
        dict[str, WorkingDayForm | TaskForm]: A dictionary containing all
                                                initialized forms with their
                                                respective prefixes as keys
    """
    # Use request.POST for POST requests, and None for GET requests.
    form_data = request.POST if request.method == 'POST' else None

    working_day_form = WorkingDayForm(form_data, instance=working_day)
    main_task_form = TaskForm(form_data, prefix='main_task')
    secondary_task_form_1 = TaskForm(form_data, prefix='secondary_task_1')
    secondary_task_form_2 = TaskForm(form_data, prefix='secondary_task_2')
    additional_task_form_1 = TaskForm(form_data, prefix='additional_task_1')
    additional_task_form_2 = TaskForm(form_data, prefix='additional_task_2')
    return {
        'working_day_form': working_day_form,
        'main_task_form': main_task_form,
        'secondary_task_form_1': secondary_task_form_1,
        'secondary_task_form_2': secondary_task_form_2,
        'additional_task_form_1': additional_task_form_1,
        'additional_task_form_2': additional_task_form_2
    }
