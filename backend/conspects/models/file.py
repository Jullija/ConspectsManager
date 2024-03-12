from django.db import models
from django.utils.functional import cached_property
from django_extensions.db.models import TimeStampedModel

from conspectsmanager import settings


class File(TimeStampedModel):
    name = models.CharField(max_length=255,
                            blank=False,
                            null=False)
    file_type = models.CharField(max_length=255,
                                 blank=False,
                                 null=False)
    content = models.BinaryField()

    def __str__(self):
        return self.name + '.' + self.file_type

    @cached_property
    def can_be_edited(self):
        return self.file_type in settings.EDITABLE_EXTENSIONS

    @cached_property
    def can_be_previewed(self):
        return self.file_type in settings.PREVIEWABLE_EXTENSIONS

    @cached_property
    def is_attachment(self):
        return not self.can_be_edited and not self.can_be_previewed
