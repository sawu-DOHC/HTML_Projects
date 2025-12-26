import os
import requests
import json

def test_post_thread():
    url = "http://localhost:8000/API/POST_article.php"
    data = {
        "articleType": "thread",
        "sectionId": 1,
        "displayName": "UnitTest",
        "title": "Thread test",
        "body": "Sample body text"
    }

    image_path = os.path.join(os.path.dirname(__file__), "Assets", "test.jpg")

    with open(image_path, "rb") as f:
        files = {"media": ("test.jpg", f, "image/jpeg")}
        r = requests.post(url, data=data, files=files)

    print(r.text)

    try:
        result = r.json()
    except json.JSONDecodeError:
        assert False, f"Invalid JSON returned: {r.text}"

    assert result.get("success") is True, f"API rejected thread: {result}"
