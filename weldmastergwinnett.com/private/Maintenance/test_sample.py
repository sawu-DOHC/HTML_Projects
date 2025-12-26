import requests
import json

def test_post_sample():
    url = "http://localhost:8000/API/POST_article.php"
    data = {
        "articleType": "sample",
        "sectionId": "1",
        "title": "TIG Aluminium",
        "body": "pytest sample upload",
        "displayName": "PyWelder",
        "process": "TIG",
        "material": "Aluminium",
        "joint": "Lap",
        "thickness": "0.125",
        "countryId": "US"
    }

    with open("testing/Assets/test.jpg", "rb") as f:
        files = {"media": ("test.jpg", f, "image/jpeg")}
        r = requests.post(url, data=data, files=files)

    # Print response for debugging
    print(r.text)

    # ✅ Ensure valid JSON
    try:
        result = r.json()
    except json.JSONDecodeError:
        assert False, f"Invalid JSON returned: {r.text}"

    # ✅ Fail test explicitly if backend reports error
    assert result.get("success") is True, f"API rejected request: {result}"
