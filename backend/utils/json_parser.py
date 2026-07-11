import json
import re


def parse_json_response(response):

    content = response.content.strip()

    content = re.sub(r"^```json", "", content)
    content = re.sub(r"^```", "", content)
    content = re.sub(r"```$", "", content)

    content = content.strip()

    return json.loads(content)