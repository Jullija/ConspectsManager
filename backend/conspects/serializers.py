from rest_framework import serializers
from .models import File
import base64


class Base64Field(serializers.Field):
    def to_representation(self, value):
        # Convert binary data to base64 encoded string for representation
        return base64.b64encode(value).decode()

    def to_internal_value(self, data):
        # Convert base64 encoded string back to binary data
        return base64.b64decode(data)


class FileSerializer(serializers.ModelSerializer):
    content = Base64Field()

    class Meta:
        model = File
        fields = ['id', 'name', 'file_type', 'content']
