from rest_framework import serializers

from conspects.serializers import EditionSerializer
from .models import User
from .models import UserEdition, PermissionType



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'uid']
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            password=validated_data.get('password')
        )
        user.uid = validated_data.get('uid', '')
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])
        instance.uid = validated_data.get('uid', instance.uid)
        instance.save()
        return instance

class UserEditionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserEdition
        fields = ['id', 'user', 'edition', 'permission_type']
