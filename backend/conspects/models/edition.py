from django.db import models

import conspects.models as conspects_models


class Edition(models.Model):
    course = models.ForeignKey('conspects.Course', on_delete=models.CASCADE)
    year = models.IntegerField(null=False, blank=False)
    name = models.CharField(max_length=255, null=False, blank=False)
    root_folder = models.ForeignKey('conspects.Folder', on_delete=models.CASCADE, null=True, blank=True,
                                    related_name='+')

    def __str__(self):
        return f"Course: {self.course} | Year: {self.year} | Name: {self.name}"

    class Meta:
        unique_together = (('course', 'name'),)

    def new_template(self, name, description):
        template = conspects_models.Template.objects.create(name=name, description=description, edition=self)
        template.save_structure()
        return template
