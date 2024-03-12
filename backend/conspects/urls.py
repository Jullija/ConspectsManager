from rest_framework import routers

from conspects.views import ConceptsViewSet

app_name = "conspects"

router = routers.SimpleRouter(trailing_slash=False)

# Add viewsets to the router
router.register(r"conspects", ConceptsViewSet, basename="concepts")

urlpatterns = router.urls + [

]
