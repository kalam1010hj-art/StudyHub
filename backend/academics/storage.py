from pathlib import Path

from cloudinary_storage.storage import MediaCloudinaryStorage


class ResourceCloudinaryStorage(MediaCloudinaryStorage):
    """Use Cloudinary's image asset type for PDFs and raw for other documents."""

    PDF_EXTENSIONS = {"pdf"}
    VIDEO_EXTENSIONS = {"mp4", "webm", "mov", "avi", "mkv", "3gp", "3g2", "wmv", "mpeg", "mpg"}

    def _get_resource_type(self, name):
        extension = Path(name).suffix.lower().lstrip(".")

        # Cloudinary treats PDFs as image assets, which gives them normal
        # PDF delivery URLs and allows browser/PDF-viewer delivery.
        if extension in self.PDF_EXTENSIONS:
            return "image"

        # Keep video uploads on Cloudinary's video asset type.
        if extension in self.VIDEO_EXTENSIONS:
            return "video"

        # DOC/DOCX/PPT/PPTX/TXT/ZIP/etc. remain raw files.
        return "raw"
