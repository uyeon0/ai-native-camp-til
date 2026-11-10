"""한 장짜리 타이타닉 대시보드 — Claude Design 시안 v2의 배치 · 색을 Streamlit으로 옮김
실행: streamlit run t7_dash.py
"""
import pandas as pd
import plotly.graph_objects as go
import streamlit as st

PAPER, INK, INK2, RULE, BAR, ACCENT = "#f8f3eb", "#271d17", "#5e534b", "#cdc2b7", "#918377", "#af5331"
CLASS = {1: "1등석", 2: "2등석", 3: "3등석"}

st.set_page_config(page_title="타이타닉 생존 분석", layout="wide")


@st.cache_data
def load():
    return pd.read_csv("data/titanic_clean.csv")


df = load()
by_class = df.groupby("Pclass")["Survived"].mean()
ratio = by_class[1] / by_class[3]

# ① 맨 위 결론 한 줄 (시안 v2: 결론을 맨 위로) — 숫자는 데이터에서 계산
st.caption("TITANIC · 승객 891명 생존 기록 · 출처: Kaggle Titanic train.csv · 나이 결측은 호칭별 중앙값으로 채움")
st.title(f"1등석 승객은 3등석보다 {ratio:.1f}배 많이 살았다")
st.divider()

# ② 핵심 숫자 3개 (시안: 한 줄 3칸 → st.columns + st.metric)
c1, c2, c3 = st.columns(3)
c1.metric("전체 승객", f"{len(df):,}명")
c2.metric("전체 생존율", f"{df['Survived'].mean() * 100:.1f}%")
c3.metric("나이를 채운 승객 (호칭별 중앙값)", f"{int(df['age_missing'].sum())}명")
st.divider()

# ③ 성별 버튼 + 등급별 생존율 차트 (버튼에 따라 제목 숫자도 바뀜)
choice = st.segmented_control("성별", ["전체", "여자", "남자"], default="전체", label_visibility="collapsed") or "전체"
sub = df if choice == "전체" else df[df["Sex"] == {"여자": "female", "남자": "male"}[choice]]
g = sub.groupby("Pclass")["Survived"].agg(["mean", "size"])
rates = g["mean"] * 100
who = "" if choice == "전체" else f"{choice} 승객도 "
title = f"{who}등급이 낮을수록 생존율이 떨어졌다 ({rates[1]:.0f}% → {rates[2]:.0f}% → {rates[3]:.0f}%)"

st.subheader(title)
st.caption("등급별 생존율 · 세로축 0–100% · 막대 위 숫자는 생존율(인원)")
fig = go.Figure(go.Bar(
    x=[CLASS[i] for i in g.index], y=rates,
    text=[f"{r:.1f}%<br>({n}명)" for r, n in zip(rates, g["size"])], textposition="outside",
    marker_color=[ACCENT if r == rates.max() else BAR for r in rates],   # 강조 색은 가장 높은 막대 하나만
))
fig.update_layout(
    paper_bgcolor=PAPER, plot_bgcolor=PAPER, font=dict(color=INK, size=16),
    height=420, margin=dict(t=30, b=10, l=10, r=10), bargap=0.45,
    yaxis=dict(range=[0, 110], title="생존율 (%)", gridcolor=RULE, tickvals=[0, 25, 50, 75, 100]),
    xaxis=dict(title=None),
)
st.plotly_chart(fig, width="stretch")
st.divider()

# ④ 사실 · 해석 · 행동 3칸
f1, f2, f3 = st.columns(3)
f1.markdown(f"**사실**  \n1등석 생존율({by_class[1]*100:.0f}%, {int((df.Pclass==1).sum())}명)은 "
            f"3등석({by_class[3]*100:.0f}%, {int((df.Pclass==3).sum())}명)의 약 {ratio:.1f}배다.")
f2.markdown("**해석**  \n'여자와 어린이 먼저' 원칙과 객실 위치가 함께 작용했을 수 있다. 데이터만으로 단정할 수는 없다.")
f3.markdown("**행동**  \n등급별 갑판 위치와 생존율을 확인해 '위치' 가설을 검증한다.")
