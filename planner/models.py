"""Models for the planner application."""
from datetime import date
from django.db import models
from .choices import (
    MOOD_CHOICES,
    PRODUCTIVITY_CHOICES,
    IMPORTANCE_CHOICES,
    ESTIMATE_CHOICES,
)


class WorkingDay(models.Model):
    """A working day with date, notes, mood and productivity rating."""

    date_value = models.DateField()
    notes = models.TextField(blank=True, null=True)
    mood = models.IntegerField(choices=MOOD_CHOICES)
    productivity_rating = models.IntegerField(choices=PRODUCTIVITY_CHOICES)

    def set_date(self, date_value: date) -> None:
        """Set the date and save the instance."""
        self.date_value = date_value
        self.save()

    def __str__(self) -> str:
        return f"Working Day: {self.date_value}"


class Task(models.Model):
    """A task with name, importance, estimate and working day."""

    task_name = models.CharField(max_length=255)
    importance = models.IntegerField(choices=IMPORTANCE_CHOICES)
    estimate = models.IntegerField(choices=ESTIMATE_CHOICES)
    working_day = models.ForeignKey(
        WorkingDay,
        related_name='tasks',
        on_delete=models.CASCADE
    )

    def __str__(self) -> str:
        return f"Task: {self.task_name}"
