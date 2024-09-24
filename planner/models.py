"""Models for the planner application."""
from datetime import date as Date
from typing import Any
from django.db import models
from .choices import (
    MOOD_CHOICES,
    PRODUCTIVITY_CHOICES,
    IMPORTANCE_CHOICES,
    ESTIMATE_CHOICES,
)


class WorkingDay(models.Model):
    """A working day with date, notes, mood and productivity rating."""

    date = models.DateField()
    notes = models.TextField(blank=True, null=True)
    mood = models.IntegerField(choices=MOOD_CHOICES)
    productivity_rating = models.IntegerField(choices=PRODUCTIVITY_CHOICES)

    class Meta:
        """Metadata for the working day model."""
        db_table = "working_day"

    def set_date(self, date: Date) -> None:
        """Set the date and save the instance."""
        self.date = date
        self.save()

    def set_notes(self, notes: str) -> None:
        """Set the notes and save the instance."""
        self.notes = notes
        self.save()

    def set_mood(self, mood: int) -> None:
        """Set the mood and save the instance."""
        if 1 <= mood <= 5:
            self.mood = mood
            self.save()
        else:
            raise ValueError("Mood must be between 1 and 5.")

    def set_productivity_rating(self, productivity_rating: int) -> None:
        """Set the productivity rating and save the instance."""
        if 1 <= productivity_rating <= 5:
            self.productivity_rating = productivity_rating
            self.save()
        else:
            raise ValueError("Productivity rating must be between 1 and 5.")

    def add_task(self, task: 'Task') -> None:
        """Add a task to the working day."""
        task.working_day = self
        task.save()

    def __str__(self) -> str:
        return f"Working Day: {self.date}"

    def save(self, *args: Any, **kwargs: Any) -> None:
        """Override save method to run validation before saving."""
        self.full_clean()  # Validate the model instance before saving
        super().save(*args, **kwargs)  # Call the parent save method


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
