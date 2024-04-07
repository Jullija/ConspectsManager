import json
from django.http import JsonResponse
from rest_framework import views
from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import firebase_admin.auth as firebase_auth
from rest_framework import viewsets
from .models import User
from .serializers import UserSerializer

cred = credentials.Certificate('./resources/firebase_key.json')
firebase_admin.initialize_app(cred)


@csrf_exempt
@require_POST
def google_login(request):
    data = json.loads(request.body)
    id_token = data.get('token')

    try:
        decoded_token = firebase_auth.verify_id_token(id_token)
        uid = decoded_token.get('uid')
        email = decoded_token.get('email')
        name = decoded_token.get('name', email)  # Use email as name if name not provided

        # Check if user exists, update or create
        user, created = User.objects.update_or_create(
            uid=uid,
            defaults={'name': name, 'email': email}
        )

        return JsonResponse({"message": "User verified", "uid": uid, "created": created})
    except firebase_admin.auth.InvalidIdTokenError:
        return JsonResponse({"error": "Invalid token"}, status=400)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class HelloWorldView(views.APIView):
    def get(self, request, format=None):
        return Response({"message": "Hello, world!"})
