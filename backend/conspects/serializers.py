from rest_framework import serializers

from conspects.models import File, Folder


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ["id", "name", "file_type", "content", "can_be_edited", "can_be_previewed", "is_attachment"]


class FolderContentSerializer(serializers.Serializer):
    files = serializers.SerializerMethodField()

    class Meta:
        model = Folder
        fields = ["id", "name", "files"]

    def get_files(self, obj):
        files = obj.files.all()
        return FileSerializer(files, many=True).data
