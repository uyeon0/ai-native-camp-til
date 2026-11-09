"""미션 ⑤ Streamlit 지도 — 장소를 하나 고르면 반경 안의 카페·약국 등이나 공공데이터 주차장을 지도·숫자·표로 보여 준다.

실행: streamlit run map_app.py  →  http://localhost:8501
(카카오 콘솔 JavaScript SDK 도메인에 http://localhost:8501 등록 필요)
주차장 데이터는 먼저 python clean_parking.py 로 data/parking_clean.csv 를 만든다.
"""
import os

import numpy as np
import pandas as pd
import streamlit as st
from dotenv import load_dotenv

from make_map import kakao_map_html
from place import search_places

CATEGORIES = {
    "카페": "CE7",
    "음식점": "FD6",
    "편의점": "CS2",
    "약국": "PM9",
    "병원": "HP8",
    "주차장": "PK6",
    "지하철역": "SW8",
    "은행": "BK9",
}
PARKING_MODE = "주차장 (공공데이터)"
PARKING_CSV = "data/parking_clean.csv"
MAX_PAGES = 3  # 한 번 검색에 최대 15곳 × 3쪽 = 45곳
MAX_MARKERS = 200

load_dotenv(override=True)


@st.cache_data(ttl=600)
def find_center(query):
    """검색어 → 첫 번째 장소 하나. 에러는 캐시하지 않도록 그대로 밖으로 던진다."""
    places = search_places(query, size=1)
    return places[0] if places else None


@st.cache_data(ttl=600)
def find_nearby(keyword, category_code, lat, lng, radius):
    """중심 좌표 반경 안의 장소를 가까운 순서로 최대 45곳."""
    found = []
    for page in range(1, MAX_PAGES + 1):
        batch = search_places(
            keyword, size=15, page=page,
            x=lng, y=lat,  # 보낼 때는 x=경도, y=위도
            radius=radius, sort="distance", category_group_code=category_code,
        )
        found.extend(batch)
        if len(batch) < 15:
            break
    return found


@st.cache_data
def load_parking():
    df = pd.read_csv(PARKING_CSV, encoding="utf-8-sig", dtype={"주차장관리번호": str})
    df["주소"] = df["소재지도로명주소"].fillna(df["소재지지번주소"])
    return df


def distance_m(lat, lng, lats, lngs):
    """중심에서 각 점까지 직선거리(m, 하버사인)."""
    lat1, lng1, lat2, lng2 = map(np.radians, [lat, lng, lats, lngs])
    a = np.sin((lat2 - lat1) / 2) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin((lng2 - lng1) / 2) ** 2
    return (6_371_000 * 2 * np.arcsin(np.sqrt(a))).round().astype(int)


st.set_page_config(page_title="주변 지도", page_icon="🗺️", layout="wide")
st.title("🗺️ 여기 근처에 뭐가 있지?")

with st.sidebar:
    st.header("조건")
    center_query = st.text_input("어디 근처?", value="강남역")
    category = st.selectbox("무엇을?", [PARKING_MODE, *CATEGORIES])
    if category == PARKING_MODE:
        radius = st.slider("반경 (m)", min_value=100, max_value=3000, value=1000, step=100)
        free_only = st.checkbox("무료만")
        kinds = st.multiselect("구분", ["공영", "민영"], default=["공영", "민영"])
    else:
        radius = st.slider("반경 (m)", min_value=100, max_value=2000, value=500, step=100)
    st.caption("지도가 회색이면 카카오 콘솔 JavaScript SDK 도메인에 http://localhost:8501 이 있는지 확인하고, "
               "주소창이 localhost:8501 인지 봐 주세요 (127.0.0.1·IP·8502로 열면 안 떠요). "
               ".env를 고쳤다면 Ctrl+C 후 다시 streamlit run.")

js_key = os.getenv("KAKAO_JS_KEY")
if not js_key:
    st.error(".env에 KAKAO_JS_KEY가 없어요. .env.example을 보고 채워 주세요.")
    st.stop()

try:
    center = find_center(center_query)
    if center is None:
        st.info(f"'{center_query}'을(를) 찾지 못했어요. 다른 이름으로 검색해 보세요.")
        st.stop()
    if category != PARKING_MODE:
        places = find_nearby(category, CATEGORIES[category], center["위도"], center["경도"], radius)
except RuntimeError as e:
    st.error(str(e).lstrip("⛔ "))
    st.stop()

st.write(f"**{center['이름']}** ({center['주소']}) 반경 **{radius:,}m** 안의 **{category}**")

# 지도·숫자·표를 모두 이 view 하나에서 만든다
if category == PARKING_MODE:
    if not os.path.exists(PARKING_CSV):
        st.error(f"{PARKING_CSV}가 없어요. 먼저 python clean_parking.py 를 실행해 주세요.")
        st.stop()
    parking = load_parking()
    parking["거리(m)"] = distance_m(center["위도"], center["경도"], parking["위도"], parking["경도"])
    view = parking[(parking["거리(m)"] <= radius) & parking["주차장구분"].isin(kinds)]
    if free_only:
        view = view[view["요금정보"] == "무료"]
    view = view.sort_values("거리(m)").rename(columns={"주차장명": "이름"})
else:
    view = pd.DataFrame(places)

if view.empty:
    st.info("조건에 맞는 곳이 없어요. 반경을 넓히거나 조건을 바꿔 보세요.")
    st.stop()

c1, c2, c3 = st.columns(3)
if category == PARKING_MODE:
    c1.metric("주차장 수", f"{len(view):,}곳")
    c2.metric("무료 주차장", f"{(view['요금정보'] == '무료').sum():,}곳")
    c3.metric("주차 구획 합계", f"{int(view['주차구획수'].sum()):,}면")
else:
    c1.metric(f"{category} 수", f"{len(view)}곳")
    c2.metric("가장 가까운 곳", f"{view['거리(m)'].min():,}m")
    c3.metric("평균 거리", f"{round(view['거리(m)'].mean()):,}m")
    if len(view) == MAX_PAGES * 15:
        st.caption(f"카카오 검색은 한 번에 최대 {MAX_PAGES * 15}곳까지만 보여 줘요. 실제로는 더 있을 수 있어요.")

markers = [{"이름": center["이름"] + " (중심)", "위도": center["위도"], "경도": center["경도"]}]
markers += view[["이름", "위도", "경도"]].head(MAX_MARKERS - 1).to_dict("records")
if len(view) >= MAX_MARKERS:
    st.caption(f"지도에는 가까운 {MAX_MARKERS - 1}곳만 찍었어요. 표에는 전부 있어요.")
st.iframe(kakao_map_html(js_key, markers, height=480), height=520)

if category == PARKING_MODE:
    st.dataframe(
        view[["이름", "거리(m)", "주차장구분", "주차장유형", "요금정보", "주차기본시간", "주차기본요금",
              "주차구획수", "운영요일", "평일운영시작시각", "평일운영종료시각", "주소"]],
        hide_index=True,
        width="stretch",
        column_config={
            "주차기본시간": st.column_config.NumberColumn("기본시간(분)"),
            "주차기본요금": st.column_config.NumberColumn("기본요금(원)", format="%d"),
            "주차구획수": st.column_config.NumberColumn("구획수", format="%d"),
        },
    )
    st.caption(f"출처: 공공데이터포털 전국주차장정보표준데이터 (데이터 기준일 {view['데이터기준일자'].min()} ~ "
               f"{view['데이터기준일자'].max()}) · 거리는 중심에서 직선거리 · 운영 정보는 기준일 이후 바뀌었을 수 있어요")
else:
    st.dataframe(
        view[["이름", "거리(m)", "주소", "분류", "링크"]],
        hide_index=True,
        width="stretch",
        column_config={"링크": st.column_config.LinkColumn("카카오맵", display_text="열기")},
    )
    st.caption("출처: 카카오 로컬 API (키워드로 장소 검색) · 카카오 지도 JavaScript SDK · 검색 결과는 10분간 저장해 두고 다시 써요")
