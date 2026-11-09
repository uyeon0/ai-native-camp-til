"""미션 ① 장소 검색 — 검색어로 카카오에서 장소를 찾아 이름·주소·위도·경도를 보여 준다.

실행: python place.py            (기본 검색어: 정자역 카페)
      python place.py 판교역 약국
"""
import os
import sys

import requests
from dotenv import load_dotenv

API = {
    "keyword": "https://dapi.kakao.com/v2/local/search/keyword.json",  # 🔌 카카오 로컬 키워드 검색
}

DEFAULT_QUERY = "정자역 카페"


def in_korea(lat, lng):
    """한국 밖 좌표(뒤바뀐 좌표·0 좌표)는 버린다."""
    return 33 <= lat <= 39 and 124 <= lng <= 132


def search_places(query, size=10, **extra):
    """장소 목록을 돌려준다. 실패하면 한국어 한 줄짜리 RuntimeError.

    extra로 x(경도)·y(위도)·radius·sort·category_group_code·page를 더 보낼 수 있다.
    """
    load_dotenv(override=True)
    key = os.getenv("KAKAO_REST_API_KEY")
    if not key:
        raise RuntimeError("⛔ .env에 KAKAO_REST_API_KEY가 없어요. .env.example을 보고 채워 주세요.")

    try:
        res = requests.get(  # 🔌 API 호출
            API["keyword"],
            headers={"Authorization": f"KakaoAK {key}"},
            params={"query": query, "size": size, **extra},
            timeout=10,
        )
    except requests.RequestException:
        raise RuntimeError("⛔ 카카오에 연결하지 못했어요. 인터넷 연결을 확인해 주세요.")

    if res.status_code == 401:
        raise RuntimeError("⛔ 카카오 REST API 키가 틀렸어요. (JavaScript 키를 넣지 않았는지 확인)")
    if res.status_code == 403:
        raise RuntimeError("⛔ 카카오맵 사용 설정을 켜 주세요. (콘솔 → 내 앱 → 카카오맵 → ON)")
    if res.status_code != 200:
        raise RuntimeError(f"카카오 검색이 실패했어요. (상태 코드 {res.status_code})")

    places = []
    for doc in res.json()["documents"]:  # data["documents"] = 찾은 장소 목록
        lat = float(doc["y"])  # doc["y"] = 위도 (글자 → 숫자)
        lng = float(doc["x"])  # doc["x"] = 경도 (글자 → 숫자)
        if not in_korea(lat, lng):
            continue
        places.append({
            "이름": doc["place_name"],  # doc["place_name"] = 장소 이름
            "주소": doc["road_address_name"] or doc["address_name"],  # 도로명이 비면 지번 주소
            "위도": lat,
            "경도": lng,
            "분류": doc["category_name"],  # doc["category_name"] = "음식점 > 카페" 같은 분류
            "링크": doc["place_url"],  # doc["place_url"] = 카카오맵 장소 페이지
            "거리(m)": int(doc["distance"]) if doc["distance"] else None,  # doc["distance"] = 중심에서 거리 (x·y를 보냈을 때만)
        })
    return places


def main():
    query = " ".join(sys.argv[1:]) or DEFAULT_QUERY
    try:
        places = search_places(query)
    except RuntimeError as e:
        print(e)
        return

    if not places:
        print(f"'{query}'을(를) 찾지 못했어요.")
    else:
        print(f"🔎 '{query}' 검색 결과 {len(places)}곳\n")
        for i, p in enumerate(places, 1):
            print(f"{i:2}. {p['이름']}")
            print(f"    주소: {p['주소']}")
            print(f"    위도·경도: ({p['위도']:.5f}, {p['경도']:.5f})")
            print(f"    {p['링크']}")

    print("\n출처: 카카오 로컬 API (키워드로 장소 검색)")


if __name__ == "__main__":
    main()
