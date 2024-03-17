from rest_framework import routers

from conspects.views import ConceptsViewSet, SubjectViewSet, EditionViewSet

app_name = "conspects"

router = routers.SimpleRouter(trailing_slash=False)

# Add viewsets to the router
router.register(r"conspects", ConceptsViewSet, basename="concepts")
router.register(r"subjects", SubjectViewSet, basename="subjects")
router.register(r"editions", EditionViewSet, basename="editions")

urlpatterns = router.urls + [

]
