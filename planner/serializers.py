"""Serializers for the planner API."""
from rest_framework import serializers
from .models import WorkingDay, Task


class TaskSerializer(serializers.ModelSerializer):
    """Serializer for the Task model."""
    
    class Meta:
        model = Task
        fields = ['id', 'task_name', 'importance', 'estimate', 'created_at', 'updated_at']


class WorkingDaySerializer(serializers.ModelSerializer):
    """Serializer for the WorkingDay model."""
    tasks = TaskSerializer(many=True, read_only=True)
    
    class Meta:
        model = WorkingDay
        fields = ['id', 'date', 'notes', 'mood', 'productivity_rating', 'tasks', 'created_at', 'updated_at']


class TaskCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating tasks."""
    
    class Meta:
        model = Task
        fields = ['task_name', 'importance', 'estimate', 'working_day']