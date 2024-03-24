from django.core.management.base import BaseCommand

from conspects.models import Edition
from conspects.models.course import Course


class Command(BaseCommand):
    help = 'Initializes the database with some data'

    def handle(self, *args, **options):




        # Courses
        ASD = Course.objects.create(name="Algorytmy i struktury danych")
        SYSOPY = Course.objects.create(name="Systemy operacyjne")

        # Editions
        ASD_2024 = Edition.objects.create(course=ASD, year=2024, name="Edycja 2024")
        ASD_2025 = Edition.objects.create(course=ASD, year=2025, name="Edycja 2025")
        SYSOPY_2024 = Edition.objects.create(course=SYSOPY, year=2024, name="Edycja 2024")

        # Folders
        grafy = ASD_2024.root_folder.add_folder("Grafy")
        grafy.add_folder("zadania")
        ASD_2024_teoria = grafy.add_folder("teoria")
        grafy.add_folder("przykłady")
        ASD_2024.root_folder.add_folder("Dynamiki")

        # Files
        ASD_2024_teoria.add_file(name="wstęp", extension="pdf", content=b"PDF content")
        ASD_2024_teoria.add_file(name="File1", extension="txt", content="Dzień dobry!".encode())
        
        # Sample Markdown
        with open("conspects/management/commands/sample_markdown.md", "r") as f:
            content = f.read()
        sample_file = File.objects.create(name="SampleFile", file_type="md", content=content.encode())
        FolderFile.objects.create(folder=sub_folder2, file=sample_file)
