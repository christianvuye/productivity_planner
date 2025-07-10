"""
URL configuration for planner project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from . import views, api_views

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.home, name="home"),
    
    # API endpoints
    path("api/working-days/", api_views.WorkingDayListCreateView.as_view(), name="working-days-list"),
    path("api/working-days/<int:pk>/", api_views.WorkingDayDetailView.as_view(), name="working-day-detail"),
    path("api/today/", api_views.today_working_day, name="today-working-day"),
    path("api/tasks/", api_views.TaskListCreateView.as_view(), name="tasks-list"),
    path("api/tasks/<int:pk>/", api_views.TaskDetailView.as_view(), name="task-detail"),
    path("api/today/tasks/", api_views.today_tasks, name="today-tasks"),
]
