"""미션 ④ AI 추천 팩트체크 — AI가 추천한 장소가 진짜 있는지 카카오로 하나씩 확인한다.

실행: python factcheck.py                   (기본: data/ai_picks.txt)
      python factcheck.py 다른파일.txt
파일 형식: 한 줄에 "이름 | 주소", #으로 시작하는 줄은 무시

✅ 있음 / 🟡 있는데 주소 다름 / ❌ 못 찾음
❌가 곧 가짜는 아니다 (폐업·이름 바뀜) → 카카오맵 웹에서 사람이 한 번 더.
"""
import re
import sys
import time

from place import search_places

PICKS = "data/ai_picks.txt"
CHECK_LIMIT = 20  # 한 번 실행에 확인하는 최대 개수


def squash(text):
    """비교용: 공백·괄호 빼기."""
    return re.sub(r"[\s()]", "", text or "")


def address_key(address):
    """주소에서 비교할 핵심(도로명+번호 또는 동+번지)만 뽑는다. 예: '강남대로98길 12-5'."""
    m = re.search(r"(\S+(?:로|길)\d*(?:번?길)?)\s*(\d+(?:-\d+)?)", address)
    if m:
        return squash(m.group(1) + m.group(2))
    m = re.search(r"(\S+동)\s*(\d+(?:-\d+)?)", address)
    return squash(m.group(1) + m.group(2)) if m else squash(address)


def name_match(ai_name, kakao_name):
    a, k = squash(ai_name), squash(kakao_name)
    return a in k or k in a


def check(ai_name, ai_address):
    """→ (표시, 카카오 이름, 카카오 주소)"""
    places = search_places(ai_name, size=5)
    same_name = [p for p in places if name_match(ai_name, p["이름"])]
    if not same_name:
        return "❌", "", ""
    key = address_key(ai_address)
    for p in same_name:
        # p["주소"]는 도로명 우선. 지번 비교는 위해 search_places 결과에 없으므로 도로명 기준
        if key and key in squash(p["주소"]):
            return "✅", p["이름"], p["주소"]
    return "🟡", same_name[0]["이름"], same_name[0]["주소"]


def read_picks(path):
    picks = []
    with open(path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "|" not in line:
                continue
            name, address = (s.strip() for s in line.split("|", 1))
            picks.append((name, address))
    return picks


def main():
    path = sys.argv[1] if len(sys.argv) > 1 else PICKS
    picks = read_picks(path)[:CHECK_LIMIT]
    if not picks:
        print(f"{path}에서 '이름 | 주소' 줄을 찾지 못했어요.")
        return

    counts = {"✅": 0, "🟡": 0, "❌": 0}
    print(f"🔍 AI 추천 {len(picks)}곳 팩트체크 ({path})\n")
    for i, (name, address) in enumerate(picks, 1):
        try:
            mark, k_name, k_address = check(name, address)
        except RuntimeError as e:
            print(e)
            if str(e).startswith("⛔"):
                print("키·설정·연결 문제라 확인을 멈춰요.")
                return
            continue
        counts[mark] += 1
        print(f"{i:2}. {mark} {name}")
        print(f"     AI:     {address}")
        if mark != "❌":
            print(f"     카카오: {k_address}  [{k_name}]")
        time.sleep(0.1)

    total = sum(counts.values())
    wrong = counts["🟡"] + counts["❌"]
    print(f"\n결과: ✅ {counts['✅']} · 🟡 {counts['🟡']} · ❌ {counts['❌']}  →  AI 실수율 {wrong / total:.0%} ({wrong}/{total})")
    print("조건: 이름이 서로 포함되면 같은 곳, 도로명+번호(또는 동+번지)가 카카오 주소에 들어 있으면 주소 일치")
    print("❌는 폐업·이름 변경일 수 있어요. 카카오맵 웹에서 한 번 더 찾아보세요.")
    print("\n출처: 카카오 로컬 API (키워드로 장소 검색)")


if __name__ == "__main__":
    main()
