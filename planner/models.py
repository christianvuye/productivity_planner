"""Models for the planner application."""
from django.db import models
from .choices import MOOD_CHOICES, PRODUCTIVITY_CHOICES


class WorkingDay(models.Model):
    """A working day with date, notes, mood and productivity rating."""

    date = models.DateField()
    notes = models.TextField(blank=True, null=True)
    mood = models.IntegerField(choices=MOOD_CHOICES)
    productivity_rating = models.IntegerField(choices=PRODUCTIVITY_CHOICES)

    def __str__(self) -> str:
        return f"Working Day: {self.date}"
