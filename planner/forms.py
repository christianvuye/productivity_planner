"""Forms for the planner application."""
from django import forms
from .models import WorkingDay, Task


class WorkingDayForm(forms.ModelForm):
    """Form for the WorkingDay model."""
    class Meta:
        """Meta options for the WorkingDayForm."""
        model = WorkingDay
        fields = ['date', 'notes', 'mood', 'productivity_rating']


class TaskForm(forms.ModelForm):
    """Form for the Task model."""
    class Meta:
        """Meta options for the TaskForm."""
        model = Task
        fields = ['task_name', 'importance', 'estimate']
