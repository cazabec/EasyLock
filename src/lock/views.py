import os
import requests

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ParseError

from django.conf import settings
from django.http import Http404
from django.shortcuts import get_object_or_404

from knox.auth import TokenAuthentication

from lock.serializers import LockSerializer
from lock.models import Lock
from rights.models import Right


class LockViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Locks.
    """
    serializer_class = LockSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        lock = serializer.save()
        Right.objects.create(user=self.request.user, lock=lock, right=Right.OWNER)


    def get_queryset(self):
        """
        This view should return a list of all the locks
        for the currently authenticated user.
        """
        user = self.request.user
        return Lock.objects.filter(right__user=user).order_by('name')


class OpenRequest(APIView):
    """
    View to check if a user can open a lock or not
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        try:
            return Lock.objects.get(pk=pk)
        except Lock.DoesNotExist:
            raise Http404

    def get_image(self, request):
        try:
            return request.data['picture']
        except KeyError:
            raise ParseError('Request has no image attached')

    def handle_uploaded_file(self, f):
        file = os.path.join(settings.FILE_UPLOAD_TEMP_DIR, f.name)
        with open(file, 'wb+') as destination:
            for chunk in f.chunks():
                destination.write(chunk)

    def post(self, request, lock_id):
        image = self.get_image(request)
        self.handle_uploaded_file(image)
        response = requests.get(
            'http://ai:2000/classifier/run/?'
            + 'image=' + str(image))
        user_id = response.text.splitlines()[2].split()[1][5:]
        similarity = response.text.splitlines()[2].split()[3]
        get_object_or_404(Right, user__pk=user_id, lock__pk=lock_id)
        return Response({'user_id': user_id,
                        'similarity': similarity}, status=status.HTTP_200_OK)
