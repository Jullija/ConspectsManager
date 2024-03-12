from django_extensions.db.models import TimeStampedModel
from django.db import models

from conspects.models.file import File
from conspects.models.folder import Folder


class FolderFile(TimeStampedModel):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE)
    file = models.ForeignKey(File, on_delete=models.CASCADE)
    def __str__(self):
        return f"Folder: {self.folder} File {self.file}"
