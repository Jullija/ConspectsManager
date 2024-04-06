import json

from django.db import models

import conspects.models as conspects_models


class Template(models.Model):
    edition = models.ForeignKey('conspects.Edition', on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=False)
    structure = models.JSONField(blank=True, null=True)

    def __str__(self):
        return f"Course: {self.course} template {self.name}"

    class Meta:
        unique_together = (('edition', 'name'),)

    def save_structure(self):
        structure = []
        for folder in self.edition.edition_folders.all():
            structure.append({'parent': folder.parent.name if folder.parent else '', 'folder': folder.name})
        self.structure = json.dumps(structure)
        self.save()

    def reconstruct_structure(self, root_folder: conspects_models.Folder):
        structure = json.loads(self.structure)
        root_folder_name = structure[0]['folder']
        created_folders = {root_folder_name: root_folder}

        for folder_structure in structure[1:]:
            folder_name = folder_structure['folder']
            parent_folder_name = folder_structure['parent']

            if parent_folder_name == root_folder_name:
                new_folder = root_folder.add_folder(folder_name)
                created_folders[folder_name] = new_folder
                print("Added folder in root:", folder_name)
                continue

            if parent_folder_name in created_folders:
                new_folder = created_folders[parent_folder_name].add_folder(folder_name)
                created_folders[folder_name] = new_folder
                print("Added folder", folder_name, "in", parent_folder_name)
            else:
                print(f"Error: Parent Folder {parent_folder_name} not found")
