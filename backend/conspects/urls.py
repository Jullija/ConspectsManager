from django.urls import path, include
from rest_framework import routers
from .views import export_edition_as_zip

from conspects.views import RetrieveCreateCourseView, EditionListCreateAPIView, FilesViewSet, EditionDetailAPIView, \
    TemplateViewSet, FolderViewSet, DuplicateEditionView

app_name = "conspects"

router = routers.DefaultRouter()
router.register(r'files', FilesViewSet)
router.register(r'folders', FolderViewSet)

router.register(r"templates", TemplateViewSet)

urlpatterns = [
    path('courses/', RetrieveCreateCourseView.as_view()),
    path('courses/<int:courseId>/editions/', EditionListCreateAPIView.as_view()),
    path('courses/<int:courseId>/editions/<int:editionId>/', EditionDetailAPIView.as_view(), name='edition-detail'),
    path('', include(router.urls)),
    path('editions/duplicate/', DuplicateEditionView.as_view(), name='duplicate_edition'),
    path('export-edition/<int:edition_id>/', export_edition_as_zip, name='export-edition'),
]
