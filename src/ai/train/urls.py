from django.conf.urls import url

import train.views

urlpatterns = [
        url((r'train/$'), train.views.TrainView.as_view()),
        url((r'run/$'), train.views.RunView.as_view()),
]
