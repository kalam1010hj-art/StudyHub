from rest_framework import serializers
from .models import University,College,Degree,Branch,Subject,Semester,Resource,CollegeProgram
from accounts.models import User


def breadcrumb_item(label, path):
    return {"label": label, "path": path}


def university_breadcrumb(university):
    return [
        breadcrumb_item("Home", "/"),
        breadcrumb_item(university.name, f"/universities/{university.id}"),
    ]


def college_breadcrumb(college):
    return university_breadcrumb(college.university) + [
        breadcrumb_item(college.name, f"/colleges/{college.id}"),
    ]


def degree_breadcrumb(degree):
    return college_breadcrumb(degree.college) + [
        breadcrumb_item(degree.name, f"/programs/{degree.id}"),
    ]


def branch_breadcrumb(branch):
    return degree_breadcrumb(branch.degree) + [
        breadcrumb_item(branch.name, f"/branch/{branch.id}"),
    ]


def semester_breadcrumb(semester):
    return branch_breadcrumb(semester.branch) + [
        breadcrumb_item(f"Semester {semester.number}", f"/semester/{semester.id}"),
    ]


def subject_breadcrumb(subject):
    return semester_breadcrumb(subject.semester) + [
        breadcrumb_item(subject.name, f"/resources/{subject.id}"),
    ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","first_name","last_name","username","email","avatar"]


class UniversitySerailizer(serializers.ModelSerializer):
    breadcrumb = serializers.SerializerMethodField()

    class Meta:
        model = University
        fields = "__all__"

    def get_breadcrumb(self, obj):
        return university_breadcrumb(obj)


class CollegeSerializer(serializers.ModelSerializer):
    breadcrumb = serializers.SerializerMethodField()

    class Meta:
        model = College
        fields = "__all__"

    def get_breadcrumb(self, obj):
        return college_breadcrumb(obj)


class DegreeSerializer(serializers.ModelSerializer):
    breadcrumb = serializers.SerializerMethodField()

    class Meta:
        model = Degree
        fields = "__all__"

    def get_breadcrumb(self, obj):
        return degree_breadcrumb(obj)


class BranchSerializer(serializers.ModelSerializer):
    breadcrumb = serializers.SerializerMethodField()

    class Meta:
        model = Branch
        fields = "__all__"

    def get_breadcrumb(self, obj):
        return branch_breadcrumb(obj)


class SubjectSerializer(serializers.ModelSerializer):
    breadcrumb = serializers.SerializerMethodField()

    class Meta:
        model = Subject
        fields = "__all__"

    def get_breadcrumb(self, obj):
        return subject_breadcrumb(obj)

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
    breadcrumb = serializers.SerializerMethodField()

    class Meta:
        model = Semester
        fields = "__all__"

    def get_breadcrumb(self, obj):
        return semester_breadcrumb(obj)

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
    uploaded_by = UserSerializer(read_only=True)

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
