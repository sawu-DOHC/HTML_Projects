import os
from PIL import Image

UPLOADS_DIR = r"C:/Users/Sam/OneDrive/Desktop Cloud/HTML_Projects/weldmastergwinnett.com/public/Assets/Uploads"
THUMB_SUFFIX = "_thumb.jpg"
THUMB_WIDTH = 600
QUALITY = 85

def create_thumbnail(image_path, thumb_path):
    """Create a thumbnail from the given image."""
    with Image.open(image_path) as img:
        w, h = img.size
        if w > THUMB_WIDTH:
            new_h = int(h * (THUMB_WIDTH / w))
            img = img.resize((THUMB_WIDTH, new_h), Image.LANCZOS)
        img.save(thumb_path, "JPEG", quality=QUALITY)
        print(f"[THUMB CREATED] {thumb_path}")

def main():
    for filename in os.listdir(UPLOADS_DIR):
        filepath = os.path.join(UPLOADS_DIR, filename)

        if not os.path.isfile(filepath):
            continue

        name, ext = os.path.splitext(filename)
        ext = ext.lower()

        # === Step 1: Normalize .jpeg → .jpg for EVERYTHING ===
        if ext == ".jpeg":
            new_filename = name + ".jpg"
            new_filepath = os.path.join(UPLOADS_DIR, new_filename)

            # If .jpg already exists, delete the .jpeg
            if os.path.exists(new_filepath):
                os.remove(filepath)
                print(f"[REMOVED DUPLICATE] {filename}")
            else:
                os.rename(filepath, new_filepath)
                print(f"[RENAMED] {filename} → {new_filename}")

            filename = new_filename
            filepath = new_filepath
            name, ext = os.path.splitext(filename)
            ext = ext.lower()

        # === Step 2: Work only with .jpg base images ===
        if ext != ".jpg":
            continue

        # Skip thumbs for thumbnail creation (but they’ll still be renamed above)
        if name.lower().endswith("_thumb"):
            continue

        # === Step 3: Generate missing thumbnail ===
        thumb_path = os.path.join(UPLOADS_DIR, f"{name}{THUMB_SUFFIX}")
        if not os.path.exists(thumb_path):
            try:
                create_thumbnail(filepath, thumb_path)
            except Exception as e:
                print(f"[ERROR] Failed to create thumb for {filename}: {e}")

if __name__ == "__main__":
    main()
