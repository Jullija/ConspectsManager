from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from conspects.models import Edition
import conspects.models as models


@receiver(post_save, sender=Edition)
def create_root_folder(sender, instance: Edition, created, **kwargs):
    if created:
        folder_name = f"root-edition_id-{instance.id}"
        instance.root_folder = models.Folder.objects.create(name=folder_name, edition=instance, parent=None)
        instance.save()
