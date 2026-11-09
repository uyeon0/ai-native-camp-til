"""미션 ③ 지도 HTML — place.py로 찾은 장소를 카카오 지도에 마커로 찍어 map.html을 만든다.

실행: python make_map.py            (기본 검색어: 정자역 카페)
      python make_map.py 판교역 약국
열기: python -m http.server 8000 --bind 127.0.0.1  →  http://localhost:8000/map.html
"""
import json
import os
import sys

from dotenv import load_dotenv

from place import DEFAULT_QUERY, search_places

API = {
    "map_sdk": "https://dapi.kakao.com/v2/maps/sdk.js",  # 🔌 카카오 지도 JavaScript SDK (브라우저가 부름)
}

MAX_MARKERS = 200


def kakao_map_html(js_key, markers, height=500):
    """markers = [{"이름", "위도", "경도"}, ...] → 지도 HTML 글자. js_key는 JavaScript 키만."""
    data = [
        {"name": m["이름"], "lat": m["위도"], "lng": m["경도"]}
        for m in markers[:MAX_MARKERS]
    ]
    # json.dumps로 넣고 "</"를 끊어 둔다 (이름에 따옴표·태그가 있어도 안 깨지게)
    data_js = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    key_js = json.dumps(js_key)

    return f"""<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>카카오 지도</title>
<style>
  body {{ margin: 0; font-family: sans-serif; }}
  #map {{ width: 100%; height: {height}px; background: #e5e5e5; }}
  .help {{ font-size: 13px; color: #666; padding: 6px 8px; }}
  .label {{ padding: 4px 8px; font-size: 13px; white-space: nowrap; }}
</style>
</head>
<body>
<div id="map"></div>
<p class="help">지도가 회색이면: ① 카카오맵 사용 설정 ② 지금 주소(포트까지) 등록 ③ 서버 주소로 열기 (더블클릭 X)</p>
<script>
  const PLACES = {data_js};
  const script = document.createElement("script");
  script.src = "{API['map_sdk']}?autoload=false&appkey=" + encodeURIComponent({key_js});
  script.onload = () => kakao.maps.load(draw);
  document.head.appendChild(script);

  function draw() {{
    const map = new kakao.maps.Map(document.getElementById("map"), {{
      center: new kakao.maps.LatLng(37.5665, 126.9780),  // LatLng(위도, 경도)
      level: 4,
    }});
    const bounds = new kakao.maps.LatLngBounds();
    const info = new kakao.maps.InfoWindow({{ removable: true }});

    PLACES.forEach((p) => {{
      const pos = new kakao.maps.LatLng(p.lat, p.lng);  // 위도 먼저, 경도 나중
      const marker = new kakao.maps.Marker({{ map, position: pos, title: p.name }});
      bounds.extend(pos);
      kakao.maps.event.addListener(marker, "click", () => {{
        const box = document.createElement("div");
        box.className = "label";
        box.textContent = p.name;  // 이름은 textContent로
        info.setContent(box);
        info.open(map, marker);
      }});
    }});
    if (PLACES.length > 0) map.setBounds(bounds);
  }}
</script>
</body>
</html>
"""


def main():
    query = " ".join(sys.argv[1:]) or DEFAULT_QUERY
    load_dotenv(override=True)
    js_key = os.getenv("KAKAO_JS_KEY")
    if not js_key:
        print("⛔ .env에 KAKAO_JS_KEY가 없어요. .env.example을 보고 채워 주세요.")
        return

    try:
        places = search_places(query, size=15)
    except RuntimeError as e:
        print(e)
        return
    if not places:
        print(f"'{query}'을(를) 찾지 못했어요.")
        return

    with open("map.html", "w", encoding="utf-8") as f:
        f.write(kakao_map_html(js_key, places))

    print(f"🗺️ '{query}' {len(places)}곳을 map.html에 찍었어요.")
    print("열기: 이 폴더에서  python -m http.server 8000 --bind 127.0.0.1")
    print("      브라우저로   http://localhost:8000/map.html   (더블클릭으로 열면 지도가 안 떠요)")
    print("\n출처: 카카오 로컬 API (키워드로 장소 검색) · 카카오 지도 JavaScript SDK")


if __name__ == "__main__":
    main()
