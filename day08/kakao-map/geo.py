"""미션 ② 주소 ↔ 좌표 — 주소를 위도·경도로, 위도·경도를 주소로 바꾼다.

실행: python geo.py                                  (기본 예시 두 개)
      python geo.py "경기 성남시 분당구 정자일로 95"   (주소 → 좌표)
      python geo.py 37.3669 127.1085                  (위도 경도 → 주소)
"""
import os
import sys

import requests
from dotenv import load_dotenv

API = {
    "address": "https://dapi.kakao.com/v2/local/search/address.json",  # 🔌 카카오 주소로 좌표 변환
    "coord2address": "https://dapi.kakao.com/v2/local/geo/coord2address.json",  # 🔌 카카오 좌표로 주소 변환
}

DEFAULT_ADDRESS = "경기 성남시 분당구 정자일로 95"
DEFAULT_LATLNG = (37.3669, 127.1085)


def in_korea(lat, lng):
    """한국 밖 좌표(뒤바뀐 좌표·0 좌표)는 버린다."""
    return 33 <= lat <= 39 and 124 <= lng <= 132


def _kakao_get(url, params):
    """카카오에 한 번 요청해 JSON을 돌려준다. 실패하면 한국어 한 줄짜리 RuntimeError."""
    load_dotenv(override=True)
    key = os.getenv("KAKAO_REST_API_KEY")
    if not key:
        raise RuntimeError("⛔ .env에 KAKAO_REST_API_KEY가 없어요. .env.example을 보고 채워 주세요.")

    try:
        res = requests.get(  # 🔌 API 호출
            url,
            headers={"Authorization": f"KakaoAK {key}"},
            params=params,
            timeout=10,
        )
    except requests.RequestException:
        raise RuntimeError("⛔ 카카오에 연결하지 못했어요. 인터넷 연결을 확인해 주세요.")

    if res.status_code == 401:
        raise RuntimeError("⛔ 카카오 REST API 키가 틀렸어요. (JavaScript 키를 넣지 않았는지 확인)")
    if res.status_code == 403:
        raise RuntimeError("⛔ 카카오맵 사용 설정을 켜 주세요. (콘솔 → 내 앱 → 카카오맵 → ON)")
    if res.status_code != 200:
        raise RuntimeError(f"카카오 요청이 실패했어요. (상태 코드 {res.status_code})")
    return res.json()


def address_to_xy(address):
    """주소 → {"위도", "경도", "주소"}. 못 찾거나 한국 밖이면 None."""
    data = _kakao_get(API["address"], {"query": address})
    if not data["documents"]:  # data["documents"] = 찾은 주소 목록 (비면 못 찾음)
        return None
    doc = data["documents"][0]
    lat = float(doc["y"])  # doc["y"] = 위도 (글자 → 숫자)
    lng = float(doc["x"])  # doc["x"] = 경도 (글자 → 숫자)
    if not in_korea(lat, lng):
        return None
    return {"위도": lat, "경도": lng, "주소": doc["address_name"]}  # doc["address_name"] = 전체 주소


def xy_to_address(lat, lng):
    """위도·경도 → 주소 글자(도로명, 없으면 지번). 못 찾으면 None."""
    if not in_korea(lat, lng):
        return None
    data = _kakao_get(API["coord2address"], {"x": lng, "y": lat})  # 보낼 때는 x=경도, y=위도
    if not data["documents"]:
        return None
    doc = data["documents"][0]
    road = doc["road_address"]  # doc["road_address"] = 도로명 주소 (산·공원은 null일 수 있음)
    if road:
        return road["address_name"]
    return doc["address"]["address_name"]  # doc["address"]["address_name"] = 지번 주소


def show_address_to_xy(address):
    result = address_to_xy(address)
    if result is None:
        print(f"'{address}'을(를) 찾지 못했어요.")
    else:
        print(f"📍 주소 → 좌표: {address}")
        print(f"    위도·경도: ({result['위도']:.5f}, {result['경도']:.5f})  [{result['주소']}]")


def show_xy_to_address(lat, lng):
    address = xy_to_address(lat, lng)
    if address is None:
        print(f"({lat}, {lng}) 위치의 주소를 찾지 못했어요. (위도 33~39, 경도 124~132 안인지 확인)")
    else:
        print(f"🧭 좌표 → 주소: ({lat}, {lng})")
        print(f"    주소: {address}")


def main():
    args = sys.argv[1:]
    try:
        if len(args) == 2 and all(a.replace(".", "", 1).isdigit() for a in args):
            show_xy_to_address(float(args[0]), float(args[1]))
        elif args:
            show_address_to_xy(" ".join(args))
        else:
            show_address_to_xy(DEFAULT_ADDRESS)
            print()
            show_xy_to_address(*DEFAULT_LATLNG)
    except RuntimeError as e:
        print(e)

    print("\n출처: 카카오 로컬 API (주소로 좌표 변환 · 좌표로 주소 변환)")


if __name__ == "__main__":
    main()
