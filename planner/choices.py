"""
This module defines the choice constants and valid ranges used throughout the planner application.

It contains predefined choices for:
- Mood ratings (1-5 scale)
- Productivity ratings (1-5 scale)
- Task importance levels (1-3 scale)
- Time estimates in Pomodoros (1-5 scale)

It also defines minimum, maximum, and average values for these scales,
as well as constants for task form identification.

These constants are used to maintain consistency in form fields, models,
and validation throughout the application.
"""

# Define choices for the mood field
MOOD_CHOICES = [
    (1, 'Very Bad'),
    (2, 'Bad'),
    (3, 'Neutral'),
    (4, 'Good'),
    (5, 'Very Good'),
]

# Define choices for the productivity_rating field
PRODUCTIVITY_CHOICES = [
    (1, 'Very Low'),
    (2, 'Low'),
    (3, 'Average'),
    (4, 'High'),
    (5, 'Very High'),
]

# Define choices for the importance field
IMPORTANCE_CHOICES = [
    (1, 'Most important task of the day'),
    (2, 'Secondary tasks of importance'),
    (3, 'Additional tasks'),
]

# Define choices for the estimate field (1 to 5 Pomodoros)
ESTIMATE_CHOICES = [
    (1, '1 Pomodoro'),
    (2, '2 Pomodoros'),
    (3, '3 Pomodoros'),
    (4, '4 Pomodoros'),
    (5, '5 Pomodoros'),
]

# Define constants for valid ranges
MOOD_MIN = 1
MOOD_MAX = 5
MOOD_AVERAGE = 3
PRODUCTIVITY_MIN = 1
PRODUCTIVITY_MAX = 5
PRODUCTIVITY_AVERAGE = 3
IMPORTANCE_MIN = 1
IMPORTANCE_MAX = 5
ESTIMATE_MIN = 1
ESTIMATE_MAX = 5

# Define constants for task forms
TASK_FORM_KEYS = [
    'main_task_form',
    'secondary_task_form_1',
    'secondary_task_form_2',
    'additional_task_form_1',
    'additional_task_form_2'
]
