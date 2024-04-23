from django.db import models, transaction

import conspects.models as conspects_models
from conspects.models import File


class Folder(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    edition = models.ForeignKey(conspects_models.Edition, on_delete=models.CASCADE, null=False, blank=False,
                                related_name='edition_folders')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, related_name='folder_children')

    def add_folder(self, name):
        return Folder.objects.create(name=name, parent=self, edition=self.edition)

    def add_file(self, name, extension, content):
        return conspects_models.File.objects.create(name=name, extension=extension, content=content, folder=self)

    def is_descendant_of(self, potential_parent):
        current_folder = self
        while current_folder.parent:
            if current_folder.parent == potential_parent:
                return True
            current_folder = current_folder.parent
        return False

    def copy_to(self, destination_folder, name=None):
        with transaction.atomic():
            # Copy the current folder
            new_name = self.name
            if name is not None: new_name = name
            new_folder = Folder.objects.create(
                name=new_name,
                parent=destination_folder,
                edition=destination_folder.edition
            )

            # Recursively copy child folders and files
            self._copy_contents_to(new_folder)

        return new_folder

    def _copy_contents_to(self, new_folder):
        # Copy files
        for file in self.folder_files.all():
            File.objects.create(
                name=file.name,
                content=file.content,
                extension=file.extension,
                folder=new_folder
            )

        # Copy subfolders
        for child_folder in self.folder_children.all():
            child_copy = child_folder.copy_to(new_folder)  # Recursively copy each child folder

    def __str__(self):
        return self.name
