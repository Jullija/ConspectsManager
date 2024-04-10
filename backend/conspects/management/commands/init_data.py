from django.core.management.base import BaseCommand

from conspects.models import Edition, Course, File


class Command(BaseCommand):
    help = 'Initializes the database with some data'

    def handle(self, *args, **options):
        # Creating courses
        asd_course = Course.objects.create(name="Algorytmy i struktury danych")
        sysopy_course = Course.objects.create(name="Systemy operacyjne")

        # Creating editions
        asd_2024 = Edition.objects.create(course=asd_course, year=2024, name="Edycja 2024")
        asd_2025 = Edition.objects.create(course=asd_course, year=2025, name="Edycja 2025")
        sysopy_2024 = Edition.objects.create(course=sysopy_course, year=2024, name="Edycja 2024")

        # Creating folders
        grafy_folder = asd_2024.root_folder.add_folder("Grafy")
        algorithms_folder = grafy_folder.add_folder("Algorithms")
        zadania_folder = grafy_folder.add_folder("zadania")
        teoria_folder = grafy_folder.add_folder("teoria")

        teoria_folder.add_file(name="File1", extension="txt", content="Dzień dobry!".encode())

        przyklady_folder = grafy_folder.add_folder("przykłady")
        dynamiki_folder = asd_2024.root_folder.add_folder("Dynamiki")
        kolejny_folder_w_teorii = teoria_folder.add_folder("Kolejny folder w teorii")

        asd_template = asd_2024.new_template("demo-asd-template", "last year edition template")

        # Creating files
        file_paths = {
            "mark.md": "resources/mark.md",
            "ggif.gif": "resources/ggif.gif",
            "image1.png": "resources/image1.png",
            "image2.jpg": "resources/image2.jpg",
            "samplepdf.pdf": "resources/samplepdf.pdf",
            "movie.mp4": "resources/movie.mp4",
            "moovie.mp4": "resources/moovie.mp4",
            "image3.png": "resources/image3.png",
            "image4.png": "resources/image4.png",
        }

        for file_name, file_path in file_paths.items():
            with open(file_path, 'rb') as file:
                binary_content = file.read()
                extension = file_name.split('.')[-1]
                name = file_name.rsplit('.', 1)[0]
                folder = None
                if file_name in ["text.txt", "mark.md"]:
                    folder = teoria_folder
                elif file_name == "ggif.gif":
                    folder = grafy_folder
                elif file_name == "image3.png":
                    folder = zadania_folder
                elif file_name == "image4.png":
                    folder = algorithms_folder
                elif file_name in ["movie.mp4", "moovie.mp4"]:
                    folder = kolejny_folder_w_teorii
                else:
                    folder = teoria_folder
                File.objects.create(
                    name=name,
                    extension=extension,
                    created_at="2022-01-01 12:00:00",
                    content=binary_content,
                    folder=folder
                )

        self.stdout.write(self.style.SUCCESS('Database initialized successfully!'))
