from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListCreateAPIView, CreateAPIView
from rest_framework.response import Response

from conspects.models import Edition, Course
from conspects.serializers import CourseSerializer, EditionSerializer, FolderSerializer


# Create your views here.
class ConceptsViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "All concepts!"})


class FilesViewSet(viewsets.ViewSet):
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
