import marko
from django.db import IntegrityError
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

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
            id__in=viewable_editions  # Filter editions based on the user's specific permissions
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # Create a UserEdition instance with 'owns' permission for the current user
        edition = serializer.instance
        user = request.user
        UserEdition.objects.create(user=user, edition=edition, permission_type=PermissionType.OWNS)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


# class FolderCreateAPIView(ListCreateAPIView):
#     serializer_class = FolderSerializer
#     queryset = Folder.objects.all()
#
#     def get_serializer_context(self):
#         """
#         Ensures that the request context is always included in the serializer context.
#         """
#         context = super(FolderCreateAPIView, self).get_serializer_context()
#         print("Context in get_serializer_context2:", context)
#         return context


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

class EditionDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Edition.objects.all()
    serializer_class = EditionSerializer
    lookup_url_kwarg = 'editionId'


# class FolderDetailAPIView(RetrieveUpdateDestroyAPIView):
#     queryset = Folder.objects.all()
#     serializer_class = FolderSerializer
#     lookup_url_kwarg = 'folderId'
#
#     def get_serializer_context(self):
#         """
#         Ensures that the request context is always included in the serializer context.
#         """
#         context = super(FolderDetailAPIView, self).get_serializer_context()
#         print("Context in get_serializer_context:", context)
#         return context


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
