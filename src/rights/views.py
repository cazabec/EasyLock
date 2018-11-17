from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from knox.auth import TokenAuthentication

from rights.serializers import RightSerializer
from rights.models import Right


class RightViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing rights.
    """
    queryset = Right.objects.all()
    serializer_class = RightSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
