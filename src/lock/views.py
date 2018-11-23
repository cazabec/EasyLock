from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

from lock.serializers import LockSerializer
from lock.models import Lock


class LockViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing Locks.
    """
    serializer_class = LockSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        This view should return a list of all the locks
        for the currently authenticated user.
        """
        user = self.request.user
        return Lock.objects.filter(right__user=user).order_by('name')
