import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv("NEIS_API_KEY")
ENDPOINT = "https://open.neis.go.kr/hub/schoolInfo"

def search_school(school_name: str) -> list[dict]:
    params = {"KEY": API_KEY, "Type": "json", "SCHUL_NM": school_name}
    resp = requests.get(ENDPOINT, params=params)
    resp.raise_for_status()
    data = resp.json()

    if "schoolInfo" not in data or len(data["schoolInfo"]) < 2:
        return []
    head = data["schoolInfo"][0]["head"]
    if head[1]["RESULT"]["CODE"] != "INFO-000":
        return []
    return data["schoolInfo"][1]["row"]