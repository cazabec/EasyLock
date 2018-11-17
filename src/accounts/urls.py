from django.conf.urls import url, include
from django.utils.translation import ugettext_lazy as _
from rest_framework import routers

import accounts.views

router = routers.SimpleRouter()

router.register(r'', accounts.views.UserViewSet)


urlpatterns = [
    url(_(r'^register/$'),
        accounts.views.UserRegisterView.as_view(),
        name='register'),
    url(_(r'^login/$'),
        accounts.views.UserLoginView.as_view(),
        name='login'),
    url(_(r'^confirm/email/(?P<activation_key>.*)/$'),
        accounts.views.UserConfirmEmailView.as_view(),
        name='confirm_email'),
    url(_(r'^status/email/$'),
        accounts.views.UserEmailConfirmationStatusView.as_view(),
        name='status'),
    url(r'', include(router.urls)),
]
