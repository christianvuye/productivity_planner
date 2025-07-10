"""API views for the planner application."""
from datetime import date
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import WorkingDay, Task
from .serializers import WorkingDaySerializer, TaskSerializer, TaskCreateSerializer
from .choices import MOOD_AVERAGE, PRODUCTIVITY_AVERAGE


class WorkingDayListCreateView(generics.ListCreateAPIView):
    """List all working days or create a new one."""
    queryset = WorkingDay.objects.all()
    serializer_class = WorkingDaySerializer


class WorkingDayDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a working day."""
    queryset = WorkingDay.objects.all()
    serializer_class = WorkingDaySerializer


@api_view(['GET', 'POST', 'PUT'])
def today_working_day(request):
    """Get or create/update today's working day."""
    today = date.today()
    
    if request.method == 'GET':
        working_day, created = WorkingDay.objects.get_or_create(
            date=today,
            defaults={
                'mood': MOOD_AVERAGE,
                'productivity_rating': PRODUCTIVITY_AVERAGE
            }
        )
        serializer = WorkingDaySerializer(working_day)
        return Response(serializer.data)
    
    elif request.method in ['POST', 'PUT']:
        working_day, created = WorkingDay.objects.get_or_create(
            date=today,
            defaults={
                'mood': MOOD_AVERAGE,
                'productivity_rating': PRODUCTIVITY_AVERAGE
            }
        )
        serializer = WorkingDaySerializer(working_day, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TaskListCreateView(generics.ListCreateAPIView):
    """List all tasks or create a new one."""
    queryset = Task.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TaskCreateSerializer
        return TaskSerializer


class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    """Retrieve, update or delete a task."""
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


@api_view(['GET', 'POST'])
def today_tasks(request):
    """Get or create tasks for today."""
    today = date.today()
    working_day, created = WorkingDay.objects.get_or_create(
        date=today,
        defaults={
            'mood': MOOD_AVERAGE,
            'productivity_rating': PRODUCTIVITY_AVERAGE
        }
    )
    
    if request.method == 'GET':
        tasks = Task.objects.filter(working_day=working_day)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        data = request.data.copy()
        data['working_day'] = working_day.id
        serializer = TaskCreateSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)