"""수업 회고 모음판 — 화면. 보여주기만 한다."""

from datetime import date, datetime

import streamlit as st

import storage

FIELDS = ("learned", "stuck", "ask")

st.set_page_config(page_title="수업 회고 모음판", page_icon="📝")
st.title("📝 수업 회고 모음판")

ss = st.session_state
ss.setdefault("screen_date", date.today())  # 화면에 보이는 날짜 = 저장할 파일 날짜
ss.setdefault("saving", False)

# 저장 성공 직후: 위젯을 만들기 전에 칸을 비운다.
if ss.pop("clear_inputs", False):
    for key in FIELDS:
        ss[key] = ""


def start_saving():
    ss.saving = True


write_tab, = st.tabs(["✏️ 쓰기"])

with write_tab:
    st.subheader(f"{ss.screen_date:%Y-%m-%d} 회고 쓰기")
    st.caption("이 날짜 파일에 저장돼요. 한 칸만 적어도 돼요. 여러 줄도 괜찮아요.")
    st.text_area("배운 것", key="learned", placeholder="예: 서브에이전트에 역할을 나눠 주면 리뷰가 덜 뭉개진다")
    st.text_area("막힌 것", key="stuck", placeholder="예: Streamlit에서 저장 후 입력칸 비우기")
    st.text_area("물어볼 것", key="ask", placeholder="예: session_state 초기화 타이밍")
    st.button("저장하기", type="primary", disabled=ss.saving, on_click=start_saving)

    if ss.saving:
        kind, message = storage.save_retro(
            ss.screen_date, datetime.now(), ss.learned, ss.stuck, ss.ask
        )
        ss.saving = False
        ss.result = (kind, message)
        if kind == "ok":
            ss.clear_inputs = True
        st.rerun()

    # 마지막 저장 결과는 다음 저장 때까지 남겨 둔다.
    if "result" in ss:
        kind, message = ss.result
        {"ok": st.success, "empty": st.warning, "duplicate": st.info, "error": st.error}[kind](message)
