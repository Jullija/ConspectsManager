from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from conspects.models import Edition
from conspects.models.folder import Folder


@receiver(post_save, sender=Edition)
def create_root_folder(sender, instance: Edition, created, **kwargs):
    if created:
        folder_name = f"root-{instance}"
        instance.root_folder = Folder.objects.create(name=folder_name, edition=instance, parent=None)
        instance.save()
