from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListCreateAPIView, CreateAPIView
from rest_framework.response import Response
import marko
from django.http import HttpResponse
from rest_framework.decorators import action
from .models import File
from .serializers import FileSerializer
from conspects.models import Edition, Course
from conspects.serializers import CourseSerializer, EditionSerializer, FolderSerializer


class ConceptsViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "All concepts!"})


class FilesViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    @action(detail=False, methods=["get"], url_name="edition")
    def per_edition(self, request):
        edition_id = request.get("id")
        edition: Edition
        try:
            edition_id = int(edition_id)
            edition = Edition.objects.find(id=edition_id)
        except ValueError:
            return Response({"message": "Invalid edition id!"})
        except Edition.DoesNotExist:
            return Response({"message": "Edition not found!"})

        folders = edition.folders.prefetch_related("files")
        return Response(serializer.data)

    def post(self, request):
        return Response({"message": "Create a file!"})

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


class RetrieveCreateCourseView(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class EditionListCreateAPIView(ListCreateAPIView):
    serializer_class = EditionSerializer

    def get_queryset(self):
        course_id = self.kwargs['courseId']
        return Edition.objects.filter(course_id=course_id)


class FolderCreateAPIView(ListCreateAPIView):
    serializer_class = FolderSerializer
