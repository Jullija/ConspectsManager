from django.contrib import admin
from .models import Edition, UserEdition, Subject, Template, Folder, FolderFolder, File, FolderFile
from users.models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Edition)
class EditionAdmin(admin.ModelAdmin):
    list_display = ('id', 'parent_subject', 'year', 'name')

@admin.register(UserEdition)
class UserEditionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'edition')

@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Template)
class TemplateAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Folder)
class FolderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'edition')

@admin.register(FolderFolder)
class FolderFolderAdmin(admin.ModelAdmin):
    list_display = ('id', 'parent', 'child')

@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'file_type', 'content')

@admin.register(FolderFile)
class FolderFileAdmin(admin.ModelAdmin):
    list_display = ('id', 'folder', 'file')