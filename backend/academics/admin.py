from django.contrib import admin
from .models import University,College,Degree,Branch,CollegeProgram,Semester,Subject,Resource
# Register your models here.
admin.site.register(University)
admin.site.register(College)
admin.site.register(Degree)
admin.site.register(Branch)
admin.site.register(CollegeProgram)
admin.site.register(Semester)
admin.site.register(Subject)

admin.site.register(Resource)
