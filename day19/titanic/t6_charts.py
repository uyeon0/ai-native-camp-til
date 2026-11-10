"""차트 4개 + 함정 차트 — charts/ 폴더에 html로 저장"""
from pathlib import Path
import pandas as pd
import plotly.express as px
from plotly.subplots import make_subplots
import plotly.graph_objects as go

Path("charts").mkdir(exist_ok=True)
df = pd.read_csv("data/titanic_clean.csv")
raw = pd.read_csv("data/train.csv")
MAIN, SUB = "#2563eb", "#f97316"   # 대표 색 1개 + 비교 색 1개
CLASS = {1: "1등석", 2: "2등석", 3: "3등석"}

def rate(d, by):
    g = d.groupby(by)["Survived"].agg(생존율="mean", 인원="size").reset_index()
    g["생존율"] = g["생존율"] * 100
    g["라벨"] = g.apply(lambda r: f"{r['생존율']:.0f}% ({int(r['인원'])}명)", axis=1)
    return g

# 1) 등급별 생존율 — 제목 숫자도 데이터에서 계산
g1 = rate(df, "Pclass"); g1["등급"] = g1["Pclass"].map(CLASS)
r = g1.set_index("Pclass")["생존율"]
fig1 = px.bar(g1, x="등급", y="생존율", text="라벨", color_discrete_sequence=[MAIN],
              title=f"등급이 낮을수록 생존율이 떨어졌다 ({r[1]:.0f}% → {r[2]:.0f}% → {r[3]:.0f}%)")
fig1.update_yaxes(title="생존율 (%)", range=[0, 100])
fig1.write_html("charts/1_class_rate.html")

# 2) 성별 × 등급
g2 = rate(df, ["Pclass", "Sex"]); g2["등급"] = g2["Pclass"].map(CLASS)
g2["성별"] = g2["Sex"].map({"female": "여자", "male": "남자"})
ratio = g2.pivot(index="Pclass", columns="Sex", values="생존율")
min_ratio = (ratio["female"] / ratio["male"]).min()
fig2 = px.bar(g2, x="등급", y="생존율", color="성별", barmode="group", text="라벨",
              color_discrete_map={"여자": SUB, "남자": MAIN},
              title=f"어느 등급에서든 여자가 남자보다 {min_ratio:.1f}배 이상 많이 살았다")
fig2.update_yaxes(title="생존율 (%)", range=[0, 105])
fig2.write_html("charts/2_sex_class_rate.html")

# 3) 나이 분포: 원본 vs 전체 중앙값 채움
med = raw["Age"].median()
filled = raw["Age"].fillna(med)
in_bin = lambda s: s.between(28, 29.99).sum()
fig3 = make_subplots(rows=2, cols=1, shared_xaxes=True,
                     subplot_titles=(f"원본 (빈칸 {raw['Age'].isna().sum()}명 제외)", f"전체 중앙값({med:.0f}세)으로 채움"))
fig3.add_trace(go.Histogram(x=raw["Age"], xbins=dict(start=0, end=82, size=2), marker_color=MAIN, name="원본"), 1, 1)
fig3.add_trace(go.Histogram(x=filled, xbins=dict(start=0, end=82, size=2), marker_color=SUB, name="중앙값 채움"), 2, 1)
fig3.update_layout(showlegend=False,
                   title=f"중앙값 채우기는 나이 분포를 28세 한 칸에 몰아넣는다 ({in_bin(raw['Age'])}명 → {in_bin(filled)}명)")
fig3.update_xaxes(title="나이 (세)", row=2, col=1)
fig3.update_yaxes(title="인원 (명)")
fig3.write_html("charts/3_age_hist.html")

# 4) 1등석 안 운임 상·하위 생존율
first = df[df["Pclass"] == 1].copy()
fmed = first["Fare"].median()
first["운임"] = first["Fare"].gt(fmed).map({True: f"중앙값({fmed:.0f}) 초과", False: f"중앙값({fmed:.0f}) 이하"})
g4 = rate(first, "운임").sort_values("운임", ascending=False)
hi, lo = g4.iloc[0]["생존율"], g4.iloc[1]["생존율"]
fig4 = px.bar(g4, x="운임", y="생존율", text="라벨", color="운임",
              color_discrete_sequence=[MAIN, SUB],
              title=f"같은 1등석이라도 비싼 표를 산 사람이 더 많이 살았다 ({hi:.0f}% vs {lo:.0f}%)")
fig4.update_layout(showlegend=False)
fig4.update_xaxes(title="1등석 운임 (파운드)")
fig4.update_yaxes(title="생존율 (%)", range=[0, 100])
fig4.write_html("charts/4_first_fare_rate.html")

# 함정 차트: 생존자 수 vs 생존율
g5 = df.groupby("Pclass")["Survived"].sum().reset_index(); g5["등급"] = g5["Pclass"].map(CLASS)
fig5 = make_subplots(rows=1, cols=2, subplot_titles=("생존자 수 (명) — 분모가 숨음", "생존율 (%) — 인원 같이 표시"))
fig5.add_trace(go.Bar(x=g5["등급"], y=g5["Survived"], text=g5["Survived"], marker_color="#9ca3af"), 1, 1)
fig5.add_trace(go.Bar(x=g1["등급"], y=g1["생존율"], text=g1["라벨"], marker_color=MAIN), 1, 2)
fig5.update_layout(showlegend=False, title="생존자 수만 보면 3등석이 2등석보다 '잘 산' 것처럼 보인다")
fig5.update_yaxes(title="생존자 (명)", row=1, col=1); fig5.update_yaxes(title="생존율 (%)", range=[0, 100], row=1, col=2)
fig5.write_html("charts/5_trap.html")

for f in [fig1, fig2, fig3, fig4, fig5]:
    print("-", f.layout.title.text)
print(g1[["등급", "라벨"]].to_string(index=False))
