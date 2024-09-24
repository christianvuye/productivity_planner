"""Admin configuration for the planner app."""
from django.contrib import admin
from .models import WorkingDay, Task


@admin.register(WorkingDay)
class WorkingDayAdmin(admin.ModelAdmin):
    """Admin configuration for WorkingDay model."""
    list_display = ('date', 'mood', 'productivity_rating',
                    'created_at', 'updated_at')
    list_filter = ("date", "mood", "productivity_rating")
    search_fields = ("date", "notes")
    date_hierarchy = "date"


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    """Admin configuration for Task model."""
    list_display = (
        'task_name', 'importance', 'estimate', 'working_day',
        'created_at', 'updated_at'
    )
    list_filter = ('importance', 'estimate', 'working_day')
    search_fields = ('task_name',)
    autocomplete_fields = ['working_day']
