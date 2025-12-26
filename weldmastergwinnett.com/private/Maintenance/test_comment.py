import requests
import json

def test_post_comment():
    url = "http://localhost:8000/API/POST_article.php"
    data = {
        "articleType": "comment",
        "parentId": "1",   # must exist in your DB
        "sectionId": "2",
        "body": "Pytest comment with image.",
        "displayName": "PyCommenter"
    }

    with open("testing/Assets/test.jpg", "rb") as f:
        files = {"media": ("test.jpg", f, "image/jpeg")}
        r = requests.post(url, data=data, files=files)

    print(r.text)

    # --- Validate response ---
    try:
        result = r.json()
    except json.JSONDecodeError:
        assert False, f"Invalid JSON returned: {r.text}"

    assert result.get("success") is True, f"API rejected comment: {result}"
