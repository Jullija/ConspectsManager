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
from django.contrib.auth import get_user_model

from .models import UserEdition
from .serializers import UserEditionSerializer
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token

User = get_user_model()


@csrf_exempt
@require_POST
def google_login(request):
    data = json.loads(request.body)
    id_token = data.get('token')

    try:
        decoded_token = firebase_auth.verify_id_token(id_token)
        uid = decoded_token.get('uid')
        email = decoded_token.get('email')
        name = decoded_token.get('name', None)

        # Assuming you want to use the email as the username. Adjust as needed.
        username = email

        # If your logic separates first and last names, adjust this part.
        first_name = name if name else email.split('@')[0]
        last_name = ""  # or set based on your logic

        # Check if user exists, update or create
        user, created = User.objects.update_or_create(
            username=username,  # Adjust if you use a different logic for usernames
            defaults={
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'uid': uid  # Assuming you've added a `uid` field to your user model
            }
        )

        token, _ = Token.objects.get_or_create(user=user)
        return JsonResponse({"message": "User verified", "uid": uid, "created": created, "token": token.key})

    except firebase_admin.auth.InvalidIdTokenError:
        return JsonResponse({"error": "Invalid token"}, status=400)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserEditionViewSet(viewsets.ModelViewSet):
    queryset = UserEdition.objects.all()
    serializer_class = UserEditionSerializer


class HelloWorldView(views.APIView):
    def get(self, request, format=None):
        return Response({"message": "Hello, world!"})
