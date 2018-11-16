from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


from lock.serializers import LockSerializer

from lock.models import Lock

class LockViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Locks.
    """
    queryset = Lock.objects.all()
    serializer_class = LockSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        """
        This view should return a list of all the locks
        for the currently authenticated user.
        """
        user = self.request.user
        return Lock.objects.all()