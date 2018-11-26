from django.conf.urls import url, include
from rest_framework import routers

router = routers.SimpleRouter()


urlpatterns = [
    url(r'^image', include('crop.urls', namespace='crop')),
]
