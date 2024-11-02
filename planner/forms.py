"""Forms for the planner application.

This module contains Django ModelForms that handle the creation and editing of
WorkingDay and Task objects. These forms provide form validation and clean data
conversion between HTTP requests and database models.

The forms in this module:
- WorkingDayForm: Handles daily journal entries including mood and
  productivity tracking
- TaskForm: Manages task creation with time estimates
"""
from django import forms
from .models import WorkingDay, Task


class WorkingDayForm(forms.ModelForm):
    """Form for creating and editing daily journal entries.

    This form handles the creation and modification of WorkingDay objects,
    allowing users to:
    - Set the date for the entry
    - Add personal notes about the day
    - Track their mood
    - Record their productivity level

    The form provides validation and proper data formatting for all fields.
    """
    class Meta:
        """Meta options for the WorkingDayForm."""
        model = WorkingDay
        fields = ['date', 'notes', 'mood', 'productivity_rating']


class TaskForm(forms.ModelForm):
    """Form for creating and managing individual tasks.

    This form facilitates task creation and editing, enabling users to:
    - Define task names
    - Set time estimates for task completion

    The form ensures proper validation of task data before database storage
    and provides a clean interface between the frontend and the Task model.
    """
    class Meta:
        """Meta options for the TaskForm."""
        model = Task
        fields = ['task_name', 'estimate']
