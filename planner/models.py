"""Models for the planner application."""
from datetime import date as Date
from typing import Any
from django.db import models
from django.core.exceptions import ValidationError
from .choices import (
    MOOD_CHOICES,
    PRODUCTIVITY_CHOICES,
    IMPORTANCE_CHOICES,
    ESTIMATE_CHOICES,
    MOOD_MIN,
    MOOD_MAX,
    PRODUCTIVITY_MIN,
    PRODUCTIVITY_MAX,
    IMPORTANCE_MIN,
    IMPORTANCE_MAX,
    ESTIMATE_MIN,
    ESTIMATE_MAX,
)


class WorkingDay(models.Model):
    """A working day with date, notes, mood and productivity rating."""

    date = models.DateField(unique=True)
    notes = models.TextField(blank=True, null=True)
    mood = models.IntegerField(choices=MOOD_CHOICES)
    productivity_rating = models.IntegerField(choices=PRODUCTIVITY_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Metadata for the working day model."""
        db_table = "working_day"
        ordering = ["-date"]
        indexes = [
            models.Index(fields=["-date"]),
        ]

    def clean(self) -> None:
        if self.date < Date.today():
            raise ValidationError("Date cannot be in the past.")

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
        if MOOD_MIN <= mood <= MOOD_MAX:
            self.mood = mood
            self.save()
        else:
            raise ValueError("Mood must be between 1 and 5.")

    def set_productivity_rating(self, productivity_rating: int) -> None:
        """Set the productivity rating and save the instance."""
        if PRODUCTIVITY_MIN <= productivity_rating <= PRODUCTIVITY_MAX:
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
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        """Metadata for the task model."""
        db_table = "task"
        ordering = ["-importance"]
        indexes = [
            models.Index(fields=["-importance"]),
        ]

    def set_task_name(self, task_name: str) -> None:
        """Set the task name and save the instance."""
        self.task_name = task_name
        self.save()

    def set_importance(self, importance: int) -> None:
        """Set the importance and save the instance."""
        if IMPORTANCE_MIN <= importance <= IMPORTANCE_MAX:
            self.importance = importance
        else:
            raise ValueError("Importance must be between 1 and 5.")

    def set_estimate(self, estimate: int) -> None:
        """Set the estimate and save the instance."""
        if ESTIMATE_MIN <= estimate <= ESTIMATE_MAX:
            self.estimate = estimate
        else:
            raise ValueError("Estimate must be between 1 and 5.")

    def __str__(self) -> str:
        return f"Task: {self.task_name}"

    def save(self, *args: Any, **kwargs: Any) -> None:
        """Override save method to run validation before saving."""
        self.full_clean()  # Validate the model instance before saving
        super().save(*args, **kwargs)  # Call the parent save method
