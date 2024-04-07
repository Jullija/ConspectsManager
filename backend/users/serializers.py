from rest_framework import serializers
from .models import User
from .models import UserEdition, PermissionType


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'uid', 'created', 'modified']


class UserEditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEdition
        fields = ['id', 'user', 'edition', 'permission_type']
