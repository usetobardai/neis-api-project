import os
import requests
from dotenv import load_dotenv

# .env에서 neis_api_key 읽기
load_dotenv()
API_KEY = os.getenv("neis_api_key")

ENDPOINT = "https://open.neis.go.kr/hub/schoolInfo"

def search_school(school_name: str):
    params = {
        "KEY"     : API_KEY,
        "Type"    : "json",
        "SCHUL_NM": school_name,
        # pIndex, pSize는 기본값이 1, 100이므로 생략
    }
    resp = requests.get(ENDPOINT, params=params)
    resp.raise_for_status()
    data = resp.json()

    # schoolInfo가 없거나 데이터가 부족한 경우 빈 리스트 반환
    if "schoolInfo" not in data or len(data["schoolInfo"]) < 2:
        return []

    # 결과 코드 검사
    head = data["schoolInfo"][0]["head"]
    result_code = head[1]["RESULT"]["CODE"]
    if result_code != "INFO-000":
        return []

    # 실제 데이터는 두 번째 요소의 "row" 안에 있음
    return data["schoolInfo"][1]["row"]

def main():
    school_name = input("학교 이름을 입력하세요: ")
    schools = search_school(school_name)
    
    if schools:
        for s in schools:
            print(f"학교명: {s['SCHUL_NM']} / 학교종류: {s['SCHUL_KND_SC_NM']}")
    else:
        print("데이터가 없습니다")

if __name__ == "__main__":
    main()
