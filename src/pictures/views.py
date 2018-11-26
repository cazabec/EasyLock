from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from knox.auth import TokenAuthentication

from pictures.serializers import PictureSerializer
from pictures.models import Picture

import requests


class PictureViewSet(viewsets.ModelViewSet):
    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        requests.get(
            'http://ai:4000/image/crop/?user='
            + str(self.request.user.id)
            + '&image=' + str(self.request.FILES['image']))
