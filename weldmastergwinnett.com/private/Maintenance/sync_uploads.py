import os, re, requests
from urllib.parse import urljoin

# === CONFIG ===
REMOTE_URL = "https://weldmastergwinnett.com/public/Assets/Uploads/"
LOCAL_DIR = r"C:\Users\Sam\OneDrive\Desktop Cloud\HTML_Projects\weldmastergwinnett.com\public\Assets\Uploads"

os.makedirs(LOCAL_DIR, exist_ok=True)

print(f"Fetching listing from {REMOTE_URL} ...")

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36"
}
resp = requests.get(REMOTE_URL, headers=headers)
resp.raise_for_status()
html = resp.text

# Regex: grab href="filename"
files = re.findall(r'href="([^"/?][^"]+)"', html)
print(f"Found {len(files)} files on server.")

local_files = set(os.listdir(LOCAL_DIR))
missing = [f for f in files if f not in local_files]

print(f"Missing {len(missing)} files locally.")

for fname in missing:
    url = urljoin(REMOTE_URL, fname)
    path = os.path.join(LOCAL_DIR, fname)
    print(f"Downloading {fname} ...")
    with requests.get(url, headers=headers, stream=True) as r:
        r.raise_for_status()
        with open(path, "wb") as f:
            for chunk in r.iter_content(8192):
                f.write(chunk)

print("✅ Done. Local Uploads folder is synced (new files only).")
