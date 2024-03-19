from django.core.management.base import BaseCommand

from conspects.models import Subject, Edition, Folder, FolderFolder, File, FolderFile


class Command(BaseCommand):
    help = 'Initializes the database with some data'

    def handle(self, *args, **options):
        subject1 = Subject.objects.create(name="Algorytmy i struktury danych")
        Subject.objects.create(name="Bazy danych")
        Subject.objects.create(name="Systemy operacyjne")

        edition1 = Edition.objects.create(year=2024, name="Edycja 2024", parent_subject=subject1)
        Edition.objects.create(year=2024, name="Edycja 2024 - kopia", parent_subject=subject1)

        folder1 = Folder.objects.create(name="Grafy", edition=edition1)
        folder2 = Folder.objects.create(name="Dynamiki", edition=edition1)
        Folder.objects.create(name="Informacje organizacyjne", edition=edition1)

        sub_folder1 = Folder.objects.create(name="BFS", edition=edition1)
        FolderFolder.objects.create(parent=folder1, child=sub_folder1)

        text_file = File.objects.create(name="File1", file_type="txt", content="Dzień dobry!".encode())
        FolderFile.objects.create(folder=sub_folder1, file=text_file)

        sub_folder2 = Folder.objects.create(name="Problem plecakowy", edition=edition1)
        FolderFolder.objects.create(parent=folder2, child=sub_folder2)

        with open("conspects/management/commands/sample_markdown.md", "r") as f:
            content = f.read()
        sample_file = File.objects.create(name="SampleFile", file_type="md", content=content.encode())
        FolderFile.objects.create(folder=sub_folder2, file=sample_file)
