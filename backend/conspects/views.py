from rest_framework import viewsets
from rest_framework.response import Response
import marko
from django.http import HttpResponse
from rest_framework.decorators import action
from .models import File
from .serializers import FileSerializer


# Create your views here.
class ConceptsViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "All concepts!"})


class FileViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    @action(detail=True, methods=['get'])
    def raw_markdown(self, request, pk=None):
        """
        Custom action to fetch raw Markdown content.
        """
        file = self.get_object()
        return HttpResponse(file.content, content_type="text/plain")

    @action(detail=True, methods=['get'])
    def html_markdown(self, request, pk=None):
        """
        Custom action to fetch Markdown content parsed to HTML.
        """
        file = self.get_object()
        html_content = marko.convert(file.content.decode('utf-8'))
        return HttpResponse(html_content, content_type="text/html")
