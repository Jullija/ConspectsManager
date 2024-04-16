from rest_framework import serializers

from conspects.models import File, Folder, Course, Edition, Template
from users.models import UserEdition


def get_user_permission(serializer, edition):
    user = serializer.context['request'].user
    if user.is_authenticated:
        if UserEdition.objects.filter(user=user, edition__isnull=True, permission_type='admin').exists():
            return "admin"
        permission = UserEdition.objects.filter(user=user, edition=edition).first()
        return permission.permission_type if permission else None
    return None


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "name", "description"]


class EditionSerializer(serializers.ModelSerializer):
    folders = serializers.SerializerMethodField(read_only=True)
    user_permission = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Edition
        fields = ["id", "course", "year", "name", "root_folder", "folders", "user_permission"]
        read_only_fields = ["root_folder", "course"]

    def validate_name(self, value):
        course_id = self.context['request'].parser_context['kwargs']['courseId']
        if Edition.objects.filter(course_id=course_id, name=value).exists():
            raise serializers.ValidationError("an edition with this name already exists for this course")
        return value

    def validate(self, data):
        course_id = self.context['request'].parser_context['kwargs']['courseId']
        try:
            course = Course.objects.get(pk=course_id)
        except Course.DoesNotExist:
            raise serializers.ValidationError("course not found")
        data['course'] = course
        return data

    def get_folders(self, obj):
        folders = obj.edition_folders.all()
        return FolderSerializer(folders, many=True, context=self.context).data

    def get_user_permission(self, obj):
        return get_user_permission(self, obj)


class FolderSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField(read_only=True)
    user_permission = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Folder
        fields = ["id", "name", "edition", "parent", "files", "user_permission"]
        read_only_fields = ["edition"]

    def validate(self, data):
        parent_id = self.context['request'].data.get('parent-id')
        try:
            folder = Folder.objects.get(pk=parent_id)
        except Folder.DoesNotExist:
            raise serializers.ValidationError("parent folder not found")
        data['parent'] = folder
        data['edition'] = folder.edition
        return data

    def get_files(self, obj):
        files = obj.folder_files.all()
        return FileSerializer(files, many=True, context=self.context).data

    def get_user_permission(self, obj):
        return get_user_permission(self, obj.edition)


class FileSerializer(serializers.ModelSerializer):
    user_permission = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = File
        fields = ["id", "name", "extension", "content", "can_be_edited", "can_be_previewed", "is_attachment",
                  "user_permission"]
        read_only_fields = ["can_be_edited", "can_be_previewed", "is_attachment"]

    def get_user_permission(self, obj):
        return get_user_permission(self, obj.folder.edition)


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ['id', 'edition', 'name', 'description', 'structure']
        read_only_fields = ['structure']
