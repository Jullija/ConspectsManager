import marko
from django.db import IntegrityError
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response

from conspects.models import Edition, Course, Folder
from conspects.serializers import CourseSerializer, EditionSerializer, FolderSerializer
from .models import File, Template
from .serializers import FileSerializer, TemplateSerializer


class ConceptsViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "All concepts!"})


class FilesViewSet(viewsets.ModelViewSet):
    queryset = File.objects.all()
    serializer_class = FileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    @swagger_auto_schema(
        method='get',
        manual_parameters=[
            openapi.Parameter(
                'id',
                openapi.IN_QUERY,
                description="ID of the edition to filter folders by",
                type=openapi.TYPE_INTEGER
            )
        ]
    )
    @action(detail=False, methods=["get"], url_name="edition")
    def per_edition(self, request):
        edition_id = request.query_params.get("id")
        try:
            edition_id = int(edition_id)
            edition = Edition.objects.get(id=edition_id)
        except ValueError:
            return Response({"message": "Invalid edition id!"}, status=400)
        except Edition.DoesNotExist:
            return Response({"message": "Edition not found!"}, status=404)

        files = File.objects.filter(folder__edition=edition).select_related('folder')
        serializer = FileSerializer(files, many=True)

        return Response(serializer.data)

    def post(self, request):
        return Response({"message": "Create a file!"})

    @action(detail=True, methods=['get'])
    def raw_markdown(self, request, pk=None):
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
    queryset = Folder.objects.all()


class EditionDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Edition.objects.all()
    serializer_class = EditionSerializer
    lookup_url_kwarg = 'editionId'


class FolderDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    lookup_url_kwarg = 'folderId'


class TemplateViewSet(viewsets.ModelViewSet):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer

    def create(self, request, *args, **kwargs):
        edition_id = request.data.get('edition')
        name = request.data.get('name')
        description = request.data.get('description')

        if not all([edition_id, name, description]):  # check if any field is not provided in request data
            return Response({'error': 'Missing required fields in request data.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            edition = Edition.objects.get(pk=edition_id)
        except Edition.DoesNotExist:
            return Response({'error': f'Edition with id {edition_id} does not exist.'},
                            status=status.HTTP_400_BAD_REQUEST)

        try:
            template = Template.objects.create(
                edition=edition,
                name=name,
                description=description
            )
            template.save_structure()
        except IntegrityError:
            return Response({
                'error': 'A template with this edition and name already exists.'
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(template)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def apply(self, request, pk=None):
        template = self.get_object()
        root_folder_id = request.data.get('root_folder_id')
        root_folder = get_object_or_404(Folder, pk=root_folder_id)
        try:
            template.reconstruct_structure(root_folder)
            return Response({'status': 'template applied'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        response = {'message': 'Update function is not offered in this path.'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    def partial_update(self, request, *args, **kwargs):
        response = {'message': 'Partial Update function is not offered in this path.'}
        return Response(response, status=status.HTTP_405_METHOD_NOT_ALLOWED)
