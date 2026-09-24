from rest_framework import serializers
from .models import University,College,Degree,Branch,Subject,Semester,Resource,CollegeProgram
from accounts.models  import User
# University serializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","first_name","last_name","username","email","avatar"]

class UniversitySerailizer(serializers.ModelSerializer):

    class Meta:
        model = University
        fields = "__all__"

class CollegeSerializer(serializers.ModelSerializer):

    class Meta:
        model = College
        fields = "__all__"
class DegreeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Degree
        fields = "__all__"
class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = "__all__"

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"

class SemesterSerializer(serializers.ModelSerializer):

    class Meta:
            model = Semester
            fields = "__all__"
class ResourceSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only = True)
    class Meta:
        model = Resource
        fields = "__all__"
     

class CollegeProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeProgram
        fields = "__all__"

