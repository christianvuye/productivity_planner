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
PRODUCTIVITY_MIN = 1
PRODUCTIVITY_MAX = 5