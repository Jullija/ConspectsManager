from django.urls import path
from rest_framework import routers

from users.views import HelloWorldView

app_name = "users"

router = routers.SimpleRouter(trailing_slash=False)

# Add viewsets to the router

urlpatterns = router.urls + [
    path("", HelloWorldView.as_view(), name="hello-world"),
]
