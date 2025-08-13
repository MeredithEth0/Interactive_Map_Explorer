from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LandmarkViewSet
from django.contrib import admin

router = DefaultRouter()
router.register(r'landmarks', LandmarkViewSet, basename='landmark')

urlpatterns = [
    path('', include(router.urls)),
]