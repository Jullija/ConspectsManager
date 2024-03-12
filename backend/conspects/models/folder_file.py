from django.db import models
from django_extensions.db.models import TimeStampedModel

from conspects.models.file import File
from conspects.models.folder import Folder


class FolderFile(TimeStampedModel):
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, related_name='files')
    file = models.ForeignKey(File, on_delete=models.CASCADE)
