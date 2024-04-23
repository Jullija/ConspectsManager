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
from rest_framework.views import APIView

from conspects.models import Edition, Course, Folder
from conspects.serializers import CourseSerializer, EditionSerializer, FolderSerializer
from users.models import UserEdition, PermissionType
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

        serializer = edition.folders.prefetch_related("files")
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

    @swagger_auto_schema(
        method='post',
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'destination_folder_id': openapi.Schema(type=openapi.TYPE_INTEGER,
                                                        description='ID of the destination folder')
            },
        ),
        responses={201: FileSerializer()}  # Instantiate the serializer
    )
    @action(detail=True, methods=['post'], url_path='copy_to_folder')
    def copy_to_folder(self, request, pk=None):
        file_to_copy = self.get_object()
        destination_folder_id = request.data.get('destination_folder_id')

        try:
            destination_folder = Folder.objects.get(pk=destination_folder_id)

            original_name = file_to_copy.name
            new_name = original_name
            counter = 1

            while File.objects.filter(name=new_name, folder=destination_folder).exists():
                new_name = f"{original_name} ({counter})"
                counter += 1

            file_copy = File.objects.create(
                name=new_name,
                content=file_to_copy.content,
                extension=file_to_copy.extension,
                folder=destination_folder
            )
            serializer = self.get_serializer(file_copy)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Folder.DoesNotExist:
            return Response({"message": "Destination folder not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class RetrieveCreateCourseView(ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class EditionListCreateAPIView(ListCreateAPIView):
    serializer_class = EditionSerializer

    def get_queryset(self):
        user = self.request.user
        course_id = self.kwargs['courseId']
        # If the user is not authenticated, return an empty queryset or public editions only
        if not user.is_authenticated:
            return Edition.objects.none()  # or filter for public editions if applicable

        # Check if the user has 'ADMIN' permission without a specific edition
        # This indicates they have access to all editions
        if UserEdition.objects.filter(user=user, edition__isnull=True, permission_type='admin').exists():
            return Edition.objects.filter(course_id=course_id)  # Return all editions for the course

        # Get all editions for the course that the user has 'view', 'owns', or 'edit' permission for
        viewable_editions = UserEdition.objects.filter(
            user=user,
            permission_type__in=['view', 'owns', 'edit'],
            edition__course_id=course_id
        ).values_list('edition', flat=True)

        return Edition.objects.filter(
            id__in=viewable_editions
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        edition = serializer.instance
        user = request.user
        UserEdition.objects.create(user=user, edition=edition, permission_type=PermissionType.OWNS)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all()
    serializer_class = FolderSerializer
    lookup_url_kwarg = 'folderId'

    def get_serializer_context(self):
        """
        Ensures that the request context is always included in the serializer context.
        """
        context = super(FolderViewSet, self).get_serializer_context()
        return context

    @swagger_auto_schema(
        method='get',
        manual_parameters=[
            openapi.Parameter(
                'destination_folder_id', in_=openapi.IN_QUERY,
                type=openapi.TYPE_INTEGER,
                description='ID of the destination folder',
                required=True
            )
        ],
        responses={
            201: FolderSerializer,
            400: 'Invalid input / Cannot copy into itself or its descendants',
            404: 'Destination folder not found'
        }
    )
    @action(detail=True, methods=['get'], url_path='copy_to')
    def copy_to(self, request, *args, **kwargs):
        folder_to_copy = self.get_object()
        destination_folder_id = request.query_params.get('destination_folder_id')
        print(destination_folder_id)
        try:
            destination_folder = Folder.objects.get(pk=destination_folder_id)
            if destination_folder.is_descendant_of(folder_to_copy) or folder_to_copy == destination_folder:
                return Response({"error": "Cannot copy a folder into itself or one of its descendants."},
                                status=status.HTTP_400_BAD_REQUEST)

            new_folder = folder_to_copy.copy_to(destination_folder)
            serializer = FolderSerializer(new_folder, context={'request': request})
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Folder.DoesNotExist:
            return Response({"error": "Destination folder not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class EditionDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Edition.objects.all()
    serializer_class = EditionSerializer
    lookup_url_kwarg = 'editionId'


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


class DuplicateEditionView(APIView):
    def post(self, request, format=None):
        base_edition = get_object_or_404(Edition, id=request.data.get('base_edition_id'))
        new_edition_name = request.data.get('new_edition_name', base_edition.name + ' copy')
        new_edition_year = request.data.get('new_edition_year', base_edition.year)
        try:
            new_edition = Edition.objects.create(course=base_edition.course, year=new_edition_year,
                                                 name=new_edition_name)
        except IntegrityError:
            return Response({'error': 'An edition with this name already exists for this course.'},
                            status=status.HTTP_400_BAD_REQUEST)

        new_root_folder = new_edition.root_folder
        for file in base_edition.root_folder.folder_files.all():
            File.objects.create(name=file.name, extension=file.extension, content=file.content, folder=new_root_folder)
        for folder in base_edition.root_folder.folder_children.all():
            folder.copy_to(new_root_folder)

        return Response({'message': 'Edition duplicated successfully', 'new_edition_id': new_edition.id},
                        status=status.HTTP_201_CREATED)
