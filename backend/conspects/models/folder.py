from django.db import models

import conspects.models as conspects_models


class Folder(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    edition = models.ForeignKey(conspects_models.Edition, on_delete=models.CASCADE, null=False, blank=False,
                                related_name='edition_folders')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, related_name='folder_children')

    def add_folder(self, name):
        return Folder.objects.create(name=name, parent=self, edition=self.edition)

    def add_file(self, name, extension, content):
        return conspects_models.File.objects.create(name=name, extension=extension, content=content, folder=self)

    def __str__(self):
        return self.name
