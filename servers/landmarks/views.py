from rest_framework import viewsets
from .models import Landmark
from .serializers import LandmarkSerializer

class LandmarkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Landmark.objects.all()
    serializer_class = LandmarkSerializer