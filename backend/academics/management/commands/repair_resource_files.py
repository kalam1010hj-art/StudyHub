from django.core.management.base import BaseCommand
from django.db import transaction
import cloudinary.api
import cloudinary.uploader

from academics.models import Resource


class Command(BaseCommand):
    help = "Repair legacy Cloudinary raw PDF resources by giving them a .pdf public ID."

    def handle(self, *args, **options):
        repaired = 0
        skipped = 0
        missing = 0

        for resource in Resource.objects.exclude(file=""):
            name = resource.file.name
            if not name:
                continue

            # Only legacy raw assets without an extension need repair.
            if name.lower().endswith(".pdf"):
                skipped += 1
                continue

            try:
                details = cloudinary.api.resource(
                    name,
                    resource_type="raw",
                    type="upload",
                )
            except Exception as exc:
                missing += 1
                self.stdout.write(
                    self.style.WARNING(f"Could not inspect {name}: {exc}")
                )
                continue

            if str(details.get("format", "")).lower() != "pdf":
                skipped += 1
                continue

            new_name = f"{name}.pdf"

            try:
                cloudinary.uploader.rename(
                    name,
                    new_name,
                    resource_type="raw",
                    type="upload",
                    invalidate=True,
                    overwrite=False,
                )
                with transaction.atomic():
                    Resource.objects.filter(pk=resource.pk).update(file=new_name)
                repaired += 1
                self.stdout.write(self.style.SUCCESS(f"Repaired PDF: {name} -> {new_name}"))
            except Exception as exc:
                self.stdout.write(
                    self.style.ERROR(f"Failed to repair {name}: {exc}")
                )

        self.stdout.write(
            self.style.SUCCESS(
                f"Resource repair complete: repaired={repaired}, skipped={skipped}, missing={missing}"
            )
        )
