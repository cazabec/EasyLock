from django.conf.urls import url

import crop.views

urlpatterns = [
        url((r'crop/$'), crop.views.CropView.as_view()),

]
