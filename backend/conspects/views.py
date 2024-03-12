from rest_framework import viewsets
from rest_framework.response import Response


# Create your views here.
class ConceptsViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "All concepts!"})
