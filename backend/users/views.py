import json
import time

from django.http import JsonResponse
from rest_framework import views
from rest_framework.response import Response
import firebase_admin
from django_filters import rest_framework as filters
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
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()


@csrf_exempt
@require_POST
def google_login(request):
    data = json.loads(request.body)
    id_token = data.get('token')
    try:
        time.sleep(2)
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
    except Exception as e:
        print(str(e))
        return JsonResponse({"error": str(e)}, status=500)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    def check_permissions(self, request):
        super().check_permissions(request)

        # If the user is not authenticated, raise AuthenticationFailed exception
        if not request.user.is_authenticated:
            raise AuthenticationFailed()


class UserEditionFilter(filters.FilterSet):
    edition = filters.NumberFilter(field_name='edition__id')

    class Meta:
        model = UserEdition
        fields = ['edition']


class UserEditionViewSet(viewsets.ModelViewSet):
    queryset = UserEdition.objects.all()
    serializer_class = UserEditionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = UserEditionFilter

    def check_permissions(self, request):
        super().check_permissions(request)

        # If the user is not authenticated, raise AuthenticationFailed exception
        if not request.user.is_authenticated:
            raise AuthenticationFailed()

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            return UserEdition.objects.none()  # No access for unauthenticated users

        edition_id = self.request.query_params.get('edition')
        if edition_id:
            # Check if the user owns the queried edition
            if not UserEdition.objects.filter(user=user, edition__isnull=True, permission_type='admin').exists():
                if UserEdition.objects.filter(user=user, edition_id=edition_id, permission_type='owns').exists():
                    return UserEdition.objects.filter(edition_id=edition_id)
                else:
                    return UserEdition.objects.none()

        return UserEdition.objects

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        user = self.request.user
        if not user.is_authenticated:
            return UserEdition.objects.none()
        if not UserEdition.objects.filter(user=user, edition__isnull=True, permission_type='admin').exists():
            if not UserEdition.objects.filter(user=user, edition=instance.edition, permission_type='owns').exists():
                return Response({"detail": "You do not have permission to perform this action."}, status=403)
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            print(f"Serializer errors: {serializer.errors}")  # Log serializer errors
            return Response(serializer.errors, status=400)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)


class HelloWorldView(views.APIView):
    def get(self, request, format=None):
        return Response({"message": "Hello, world!"})
