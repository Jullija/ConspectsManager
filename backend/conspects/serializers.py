from rest_framework import serializers

from conspects.models import Subject, Edition


class EditionSerializer(serializers.ModelSerializer):
    subject_id = serializers.IntegerField(write_only=True)
    edition_id = serializers.IntegerField(source='pk', read_only=True)

    class Meta:
        model = Edition
        fields = ['name', 'year', 'edition_id', 'subject_id']

    def create(self, validated_data):
        subject_id = validated_data.get('subject_id')
        if not subject_id:
            raise serializers.ValidationError({"subject_id": "Subject id is required."})
        subject: Subject
        try:
            subject = Subject.objects.get(pk=subject_id)
        except Subject.DoesNotExist:
            raise serializers.ValidationError({"subject_id": "Subject does not exist."})

        validated_data.pop('subject_id', None)
        edition = Edition.objects.create(parent_subject=subject, **validated_data)
        return edition


class SubjectSerializer(serializers.ModelSerializer):
    subject_id = serializers.IntegerField(source='pk', read_only=True)

    class Meta:
        model = Subject
        fields = ['name', 'subject_id']
