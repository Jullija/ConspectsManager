from django.urls import path, include
from rest_framework import routers

from conspects.views import RetrieveCreateCourseView,\
    EditionListCreateAPIView, FolderCreateAPIView, FilesViewSet, EditionDetailAPIView, FolderDetailAPIView

app_name = "conspects"

router = routers.DefaultRouter()
router.register(r'files', FilesViewSet)

# router.register(r"course", RetrieveCreateCourseView, basename="course")

urlpatterns = [
    path('courses/', RetrieveCreateCourseView.as_view()),
    path('courses/<int:courseId>/editions/', EditionListCreateAPIView.as_view()),
    path('courses/<int:courseId>/editions/<int:editionId>/', EditionDetailAPIView.as_view(), name='edition-detail'),
    path('folders/', FolderCreateAPIView.as_view()),
    path('folders/<int:folderId>/', FolderDetailAPIView.as_view(), name='folder-detail'),
    path('', include(router.urls)),
]
