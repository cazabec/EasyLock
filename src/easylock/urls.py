from django.conf.urls import url, include
from rest_framework.schemas import get_schema_view
from rest_framework import routers

from django.conf import settings
from django.conf.urls.static import static

from base import views as base_views

from lock.views import LockViewSet
from lock.views import OpenRequest
from pictures.views import PictureViewSet
from rights.views import RightViewSet

router = routers.SimpleRouter()

router.register(r'^api/v1/lock', LockViewSet, 'lock')
router.register(r'^api/v1/upload', PictureViewSet, 'upload')
router.register(r'^api/v1/rights', RightViewSet, 'rigths')

urlpatterns = [

    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),

    url(r'^api/v1/getdata/', base_views.ProtectedDataView.as_view()),

    url(r'^api/v1/train/', base_views.TrainView),

    url(r'^api/v1/open/(?P<lock_id>[0-9a-f-]+)', OpenRequest.as_view()),

    url(r'^api/$', get_schema_view()),

    url(r'', include(router.urls)),


] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [

    url(r'', base_views.IndexView.as_view()),
]
