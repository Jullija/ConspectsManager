from rest_framework import viewsets
from rest_framework.response import Response

from conspects.models import Subject, Edition
from conspects.serializers import SubjectSerializer, EditionSerializer


# Create your views here.
class ConceptsViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response({"message": "All concepts!"})


class SubjectViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = Subject.objects.all()
        serializer = SubjectSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = SubjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class EditionViewSet(viewsets.ModelViewSet):
    serializer_class = EditionSerializer

    def get_queryset(self):
        subject_id = self.request.query_params.get('subject_id', None)
        print(subject_id)
        if subject_id is not None:
            return Edition.objects.filter(parent_subject__pk=subject_id)
        return Edition.objects.none()

    def perform_create(self, serializer):
        return serializer.save()
