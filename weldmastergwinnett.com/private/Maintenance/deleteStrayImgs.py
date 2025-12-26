import csv
import os

# === CONFIG ===
BASE_DIR = r"C:\Users\Sam\OneDrive\Desktop Cloud\HTML_Projects\weldmastergwinnett.com\public\Assets\Uploads"
CSV_FILE = r"C:\Users\Sam\OneDrive\Desktop Cloud\HTML_Projects\weldmastergwinnett.com\public\Experimental\media_files.csv"

# === STEP 1: load mediaSrc + thumbs from CSV ===
keep_files = set()

with open(CSV_FILE, newline="", encoding="utf-8") as f:
    reader = csv.reader(f)
    header = next(reader)  # skip header row
    for row in reader:
        if not row:
            continue
        media = row[0].strip()
        if not media:
            continue
        keep_files.add(media)

        # also keep the thumb if jpg/jpeg
        if media.lower().endswith((".jpg", ".jpeg")):
            base, ext = os.path.splitext(media)
            keep_files.add(f"{base}_thumb{ext}")

print(f"[INFO] Loaded {len(keep_files)} files to keep")

# === STEP 2: scan upload folder ===
all_files = set(os.listdir(BASE_DIR))
orphans = all_files - keep_files

print(f"[INFO] Found {len(all_files)} total files in Uploads")
print(f"[INFO] Found {len(orphans)} orphan files to delete")

# === STEP 3: delete orphans ===
for fname in sorted(orphans):
    path = os.path.join(BASE_DIR, fname)
    try:
        os.remove(path)
        print(f"[DELETE] {fname}")
    except Exception as e:
        print(f"[ERROR] Could not delete {fname}: {e}")

print("[DONE] Cleanup complete.")
