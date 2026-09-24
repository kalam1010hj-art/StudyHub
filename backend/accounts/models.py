from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


class User(AbstractUser):
    class Role(models.TextChoices):
        STUDENT = 'STUDENT', 'Student'
        EDUCATOR = 'EDUCATOR', 'Educator / Professor'
        MODERATOR = 'MODERATOR', 'Moderator'

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.STUDENT,
        help_text="User's primary role on StudyHub"
    )
    is_verified_student = models.BooleanField(
        default=False,
        help_text="Designates whether the user's academic status has been verified."
    )

    # ------------------------------------------------------------------
    # 2. Profile Details
    # ------------------------------------------------------------------
    bio = models.TextField(
        max_length=500,
        blank=True,
        help_text="Short profile summary or bio"
    )
    avatar = models.ImageField(
        upload_to='avatars/%Y/%m/',
        null=True,
        blank=True,
        help_text="Profile picture"
    )
    phone_number = models.CharField(
        max_length=15,
        blank=True,
        help_text="Optional contact number"
    )

    # ------------------------------------------------------------------
    # 3. Academic Background
    # ------------------------------------------------------------------
    college_name = models.CharField(
        max_length=255,
        blank=True,
        help_text="Current university, institute, or college"
    )
    branch_or_major = models.CharField(
        max_length=100,
        blank=True,
        help_text="Field of study (e.g. Computer Science, AIML, Mechanical)"
    )
    academic_year = models.PositiveSmallIntegerField(
        null=True,
        blank=True,
        validators=[MinValueValidator(1), MaxValueValidator(6)],
        help_text="Current year of study (1-6)"
    )
    graduation_year = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text="Expected or actual year of graduation (e.g. 2026)"
    )

    # ------------------------------------------------------------------
    # 4. Gamification & Community Contributions
    # ------------------------------------------------------------------
    reputation_points = models.PositiveIntegerField(
        default=0,
        help_text="Points earned by uploading quality notes, resources, or helping others"
    )

    # ------------------------------------------------------------------
    # 5. Professional & Social Links
    # ------------------------------------------------------------------
    github_url = models.URLField(max_length=200, blank=True)
    linkedin_url = models.URLField(max_length=200, blank=True)
    website_url = models.URLField(max_length=200, blank=True)

    # ------------------------------------------------------------------
    # Metadata
    # ------------------------------------------------------------------
    updated_at = models.DateTimeField(auto_now=True)

    # def __str__(self):
    #     return f"{self.username} ({self.get_role_display()})"