from django.urls import path, include
from rest_framework import routers

from conspects.views import RetrieveCreateCourseView, EditionListCreateAPIView, FolderCreateAPIView, FilesViewSet

app_name = "conspects"

router = routers.SimpleRouter(trailing_slash=False)
router.register(r'files', FilesViewSet)

# router.register(r"course", RetrieveCreateCourseView, basename="course")

urlpatterns = router.urls + [
    path('courses/', RetrieveCreateCourseView.as_view()),
    path('courses/<int:courseId>/editions/', EditionListCreateAPIView.as_view()),
    path('folders/', FolderCreateAPIView.as_view()),
    path('', include(router.urls)),
]
