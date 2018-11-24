from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ParseError

from django.http import Http404

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
            file = request.data['picture']
            return file
        except KeyError:
            raise ParseError('Request has no image attached')

    def post(self, request, lock_id):
        lock = self.get_object(lock_id)
        image = self.get_image(request)
        # TODO: link to the artificial intelligence
        return Response({'likeness': 85}, status=status.HTTP_200_OK)
