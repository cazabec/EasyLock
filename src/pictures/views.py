from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from pictures.serializers import PictureSerializer
from pictures.models import Picture


class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    permission_classes = [IsAuthenticated]
