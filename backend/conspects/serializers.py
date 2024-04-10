from rest_framework import serializers

from conspects.models import File, Folder, Course, Edition, Template


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ["id", "name", "description"]


class EditionSerializer(serializers.ModelSerializer):
    folders = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Edition
        fields = ["id", "course", "year", "name", "root_folder", "folders"]
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
        return FolderSerializer(folders, many=True).data

    # def create(self, validated_data):
    #     course_id = self.context['request'].parser_context['kwargs']['courseId']
    #     try:
    #         course = Course.objects.get(pk=course_id)
    #     except Course.DoesNotExist:
    #         raise serializers.ValidationError("Course not found")
    #     validated_data['course'] = course
    #     instance = super().create(validated_data)
    #     return instance


class FolderSerializer(serializers.ModelSerializer):
    files = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Folder
        fields = ["id", "name", "edition", "parent", "files"]
        read_only_fields = ["edition"]

    def validate(self, data):
        request = self.context['request']
        parent_id = request.data.get('parent')

        if parent_id is not None:
            try:
                parent_folder = Folder.objects.get(pk=parent_id)

                if self.instance and (self.instance.pk == parent_folder.pk or parent_folder.is_descendant_of(self.instance)):
                    raise serializers.ValidationError({"parent": "Cannot set a descendant as the new parent."})

                data['parent'] = parent_folder
                data['edition'] = parent_folder.edition
            except Folder.DoesNotExist:
                raise serializers.ValidationError({"parent": "Parent folder not found."})

        return data

    def get_files(self, obj):
        files = obj.folder_files.all()
        return FileSerializer(files, many=True).data


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ["id", "name", "extension", "content", "folder",  "can_be_edited", "can_be_previewed", "is_attachment"]
        read_only_fields = ["can_be_edited", "can_be_previewed", "is_attachment"]

    def validate(self, data):
        instance = getattr(self, 'instance', None)

        folder = data.get('folder', instance.folder if instance else None)
        name = data.get('name', instance.name if instance else None)
        extension = data.get('extension', instance.extension if instance else None)

        # Check for files with the same name and extension in the same folder
        queryset = File.objects.filter(folder=folder, name=name, extension=extension)

        if instance:
            queryset = queryset.exclude(pk=instance.pk)

        if queryset.exists():
            raise serializers.ValidationError(
                "A file with this name and extension already exists in the selected folder.")

        return data


class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ['id', 'edition', 'name', 'description', 'structure']
        read_only_fields = ['structure']
