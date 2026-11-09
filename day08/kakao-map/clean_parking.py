"""판다스 미션 — 전국주차장정보표준데이터 CSV를 정리해 data/parking_clean.csv로 저장한다.

실행: python clean_parking.py
원본: data/parking_raw.csv (공공데이터포털 '전국주차장정보표준데이터', 레포에는 안 올림)

읽기 → 살펴보기 → 걸러내기 → 숫자로 → 빈 좌표 채우기 → 요약 → 저장
동네로 거르지 않고 전국을 남긴다. 동네 고르기는 map_app.py 화면에서 한다.

왜 판다스? 원본은 그대로 지도에 못 쓴다. 판다스 = 파이썬 속 엑셀(필터·찾아 바꾸기·피벗을 코드로).
  - 한글이 cp949라 그냥 열면 깨짐             → 인코딩 바꿔 가며 읽기
  - 18,939줄 × 34칸, 필요 없는 칸이 많음       → 칸 골라 남기기
  - 숫자가 글자, 무료인 곳은 요금이 빈칸       → to_numeric, 무료는 0
  - 좌표 빈 줄 765개, 한국 밖 좌표도 있음      → 걸러내고 카카오로 채우기
  - "유형별 개수·평균 요금"                    → groupby 한 줄
for 문으로 한 줄씩 짤 일을 표 전체에 한 번에 한다. 데이터가 새로 나오면 이 파일을 다시 실행만 하면 된다.
"""
import time

import pandas as pd

from geo import address_to_xy, in_korea

RAW = "data/parking_raw.csv"
CLEAN = "data/parking_clean.csv"
FILL_LIMIT = 30  # 빈 좌표를 카카오로 채우는 최대 줄 수

KEEP = [
    "주차장관리번호", "주차장명", "주차장구분", "주차장유형",
    "소재지도로명주소", "소재지지번주소", "주차구획수",
    "운영요일", "평일운영시작시각", "평일운영종료시각",
    "요금정보", "주차기본시간", "주차기본요금", "추가단위시간", "추가단위요금", "1일주차권요금",
    "위도", "경도", "데이터기준일자", "제공기관명",
]  # 전화번호(민영은 개인 번호일 수 있음)·특기사항(긴 글)은 뺀다
NUMBER_COLS = ["주차구획수", "주차기본시간", "주차기본요금", "추가단위시간", "추가단위요금", "1일주차권요금", "위도", "경도"]


def read_csv(path):
    for enc in ["utf-8-sig", "cp949"]:
        try:
            df = pd.read_csv(path, encoding=enc, dtype=str)
            print(f"① 읽기: {path} ({enc})")
            return df
        except UnicodeDecodeError:
            continue
    raise SystemExit(f"{path}를 utf-8-sig·cp949 둘 다로 읽지 못했어요.")


def main():
    df = read_csv(RAW)

    print(f"② 살펴보기: {df.shape[0]:,}줄 × {df.shape[1]}칸")
    blanks = df[["주차장명", "소재지도로명주소", "소재지지번주소", "위도", "경도", "주차기본요금"]].isna().sum()
    print("   빈칸:", ", ".join(f"{k} {v:,}" for k, v in blanks.items()))

    df = df[KEEP].copy()
    print(f"③ 걸러내기: 칸 {len(KEEP)}개만 남김 (전화번호·특기사항 등 제외)")

    for col in NUMBER_COLS:
        df[col] = pd.to_numeric(df[col], errors="coerce")
    df.loc[df["요금정보"] == "무료", "주차기본요금"] = 0  # 무료인데 요금이 비어 있으면 0원
    print(f"④ 숫자로: {', '.join(NUMBER_COLS)} → 숫자, 요금정보='무료'는 기본요금 0")

    # 한국 밖 좌표(뒤바뀐 좌표·0 좌표)는 빈칸으로 돌려 채우기 대상에 넣는다
    bad = df["위도"].notna() & ~df.apply(lambda r: in_korea(r["위도"], r["경도"]) if pd.notna(r["경도"]) else False, axis=1)
    df.loc[bad, ["위도", "경도"]] = None
    missing = df[df["위도"].isna() | df["경도"].isna()]
    print(f"⑤ 빈 좌표 채우기: 좌표 없음 {len(missing):,}줄 (한국 밖 좌표 {bad.sum()}줄 포함) → 최대 {FILL_LIMIT}줄만 카카오로")

    filled = 0
    for idx, row in missing.head(FILL_LIMIT).iterrows():
        address = row["소재지도로명주소"] if pd.notna(row["소재지도로명주소"]) else row["소재지지번주소"]
        if pd.isna(address):
            continue
        try:
            result = address_to_xy(address)
        except RuntimeError as e:
            print(f"   {e}")
            if str(e).startswith("⛔"):
                print("   키·설정·연결 문제라 채우기를 멈춰요.")
                break
            continue
        time.sleep(0.1)
        if result:
            df.loc[idx, ["위도", "경도"]] = [result["위도"], result["경도"]]
            filled += 1
    print(f"   카카오로 {filled}줄 채움")

    clean = df.dropna(subset=["위도", "경도"])
    print(f"⑥ 요약 (조건: 좌표가 있는 줄, 요금정보 == '무료'를 무료로 셈)")
    summary = clean.groupby("주차장유형").agg(
        개수=("주차장명", "size"),
        평균기본요금=("주차기본요금", "mean"),
        무료=("요금정보", lambda s: (s == "무료").sum()),
    ).round(0)
    print(summary.to_string())

    clean.to_csv(CLEAN, encoding="utf-8-sig", index=False)
    print(f"⑦ 저장: {CLEAN} ({len(clean):,}줄, 좌표 없어 뺀 줄 {len(df) - len(clean):,})")
    print(f"   데이터 기준일: {clean['데이터기준일자'].min()} ~ {clean['데이터기준일자'].max()}")

    print("\n출처: 공공데이터포털 전국주차장정보표준데이터 · 빈 좌표는 카카오 로컬 API(주소로 좌표 변환)")


if __name__ == "__main__":
    main()
