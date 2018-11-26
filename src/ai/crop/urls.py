from django.conf.urls import url
from rest_framework import routers

import crop.views

router = routers.SimpleRouter()


urlpatterns = [
        url((r'crop/$'), crop.views.CropView.as_view()),

]
