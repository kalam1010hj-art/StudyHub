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

    def validate(self, attrs):
        semester = attrs.get("semester", getattr(self.instance, "semester", None))
        code = attrs.get("code", getattr(self.instance, "code", "")).strip()

        if semester and code:
            queryset = Subject.objects.filter(semester=semester, code__iexact=code)
            if self.instance:
                queryset = queryset.exclude(pk=self.instance.pk)

            if queryset.exists():
                raise serializers.ValidationError(
                    {"code": "A subject with this code already exists in this semester."}
                )

        attrs["code"] = code
        return attrs

class SemesterSerializer(serializers.ModelSerializer):

    class Meta:
            model = Semester
            fields = "__all__"

    def validate(self, attrs):
        branch = attrs.get("branch", getattr(self.instance, "branch", None))
        number = attrs.get("number", getattr(self.instance, "number", None))

        if branch and number:
            queryset = Semester.objects.filter(branch=branch, number=number)
            if self.instance:
                queryset = queryset.exclude(pk=self.instance.pk)

            if queryset.exists():
                raise serializers.ValidationError(
                    {"number": "This semester already exists for the selected branch."}
                )

        return attrs
class ResourceSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only = True)
    class Meta:
        model = Resource
        fields = "__all__"
     

class MyResourceSerializer(serializers.ModelSerializer):
    uploaded_by = UserSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)

    class Meta:
        model = Resource
        fields = "__all__"


class CollegeProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeProgram
        fields = "__all__"

