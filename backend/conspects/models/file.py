from django.db import models
from django.utils.functional import cached_property

from conspectsmanager import settings


class File(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    content = models.BinaryField(null=False, blank=True)
    extension = models.CharField(max_length=255, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    folder = models.ForeignKey('conspects.Folder', on_delete=models.CASCADE, null=False, blank=False,
                               related_name='folder_files')

    def __str__(self):
        return self.name + '.' + self.extension

    @cached_property
    def can_be_edited(self):
        return self.extension in settings.EDITABLE_EXTENSIONS

    @cached_property
    def can_be_previewed(self):
        return self.extension in settings.PREVIEWABLE_EXTENSIONS

    @cached_property
    def is_attachment(self):
        return not self.can_be_edited and not self.can_be_previewed
