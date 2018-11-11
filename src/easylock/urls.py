from django.conf.urls import url, include
from rest_framework import status, serializers, views
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.schemas import get_schema_view

from base import views as base_views

urlpatterns = [
	url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/getdata/', base_views.ProtectedDataView.as_view()),
    url(r'^api/$', get_schema_view()),
	url(r'', base_views.IndexView.as_view()),
]