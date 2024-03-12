from rest_framework import views
from rest_framework.response import Response


class HelloWorldView(views.APIView):
    def get(self, request, format=None):
        return Response({"message": "Hello, world!"})
