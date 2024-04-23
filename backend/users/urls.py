from django.urls import path, include
from rest_framework import routers
from .views import google_login

from users.views import HelloWorldView
from .views import UserViewSet
from .views import UserEditionViewSet
app_name = "users"

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'user-editions', UserEditionViewSet)

# Add viewsets to the router

urlpatterns = router.urls + [
    path("", HelloWorldView.as_view(), name="hello-world"),
    path('', include(router.urls)),
    path("google-login/", google_login, name='google-login'),
]
