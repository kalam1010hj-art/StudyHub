from django.db import models
from django.conf import settings
from cloudinary_storage.storage import RawMediaCloudinaryStorage, MediaCloudinaryStorage

# Create your models here.
class University(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=50, unique=True)

    description = models.TextField(blank=True)

    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    pincode = models.CharField(max_length=10, blank=True)

    website = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)

    established_year = models.PositiveIntegerField(
        null=True,
        blank=True
    )

    logo = models.ImageField(
        upload_to="universities/logos/",
        storage=MediaCloudinaryStorage(),
        blank=True,
        null=True
    )

    is_active = models.BooleanField(default=True)

   
    

    def __str__(self):
        return self.name

class College(models.Model):
    university = models.ForeignKey(
        University,
        on_delete=models.CASCADE,
        related_name="colleges"
    )
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=50)
          
    address = models.TextField(blank=True)
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    pincode = models.CharField(max_length=10, blank=True)

    website = models.URLField(blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)

    description = models.TextField(blank=True)
    afflicatedTo = models.CharField(max_length=20,blank=True)
    logo = models.ImageField(
            upload_to="college/logos/",
            storage=MediaCloudinaryStorage(),
            blank=True,
            null=True
        )
    def __str__(self):
            return self.name
    
class Degree(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)
    description = models.TextField(blank=True)
    college = models.ForeignKey(College,on_delete=models.CASCADE)
    duration_years = models.PositiveSmallIntegerField(
        null=True,
        blank=True
    )
    level = models.CharField(
        max_length=50,
        blank=True
    )
    stream = models.CharField(
        max_length=100,
        blank=True
    )
    is_active = models.BooleanField(default=True)
    def __str__(self):
            return f"{self.code} {self.college.name}"



    

class Branch(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=20, unique=True)

    degree = models.ForeignKey(
        Degree,
        on_delete=models.CASCADE,
        related_name="branches"
    )

    degree_code = models.CharField(max_length=100,blank=True)

    short_name = models.CharField(
        max_length=100,
        blank=True
    )

    description = models.TextField(
        blank=True
    )

    duration_years = models.PositiveSmallIntegerField(
        default=4
    )

    is_active = models.BooleanField(
        default=True
    )

    

    def __str__(self):
        return f"{self.name} ({self.code})"

class Semester(models.Model):
    branch = models.ForeignKey(
        Branch,
        on_delete=models.CASCADE,
        related_name="semesters"
    )
    number = models.PositiveSmallIntegerField()
    

    def __str__(self):
        return f"{self.branch.code} - Semester {self.number}"
class Subject(models.Model):
    semester = models.ForeignKey(
        Semester,
        on_delete=models.CASCADE,
        related_name="subjects"
    )
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=50)


    def __str__(self):
        return f"{self.semester.branch.code} - {self.name}"

class Resource(models.Model):

    RESOURCE_TYPES = [
        ("notes", "Notes"),
        ("question_paper", "Question Paper"),
        ("assignment", "Assignment"),
        ("lab_manual", "Lab Manual"),
        ("textbook", "Textbook"),
        ("syllabus", "Syllabus"),
        ("other", "Other"),
    ]

    title = models.CharField(max_length=200)

    description = models.TextField(blank=True)

    file = models.FileField(upload_to="resources/", storage=RawMediaCloudinaryStorage())

    resource_type = models.CharField(
        max_length=30,
        choices=RESOURCE_TYPES
    )
    
    subject = models.ForeignKey(
    "academics.Subject",
    on_delete=models.PROTECT,
    related_name="resources"
)

    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        related_name="uploaded_resources"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class CollegeProgram(models.Model):
    college = models.ForeignKey(
        College,
        on_delete=models.CASCADE,
        related_name="programs"
    )

    branch = models.ForeignKey(
        Branch,
        on_delete=models.CASCADE,
        related_name="college_programs"
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["college", "branch"],
                name="unique_college_branch"
            )
        ]

    def __str__(self):
        return f"{self.college.name} - {self.branch.name}"