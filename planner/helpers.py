"""Helper functions for the planner application."""
from .forms import TaskForm
from .models import WorkingDay


def save_task(form: TaskForm, working_day: WorkingDay) -> None:
    """Save a task associated with the given working day."""
    task = form.save(commit=False)
    task.working_day = working_day
    task.save()
