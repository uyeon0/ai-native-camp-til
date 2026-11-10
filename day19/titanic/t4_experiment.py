"""처리 방법이 답을 바꾼다 — 나이 결측 처리 4가지로 나이대별 생존율 비교"""
import pandas as pd

raw = pd.read_csv("data/train.csv")
raw["Title"] = raw["Name"].str.extract(r",\s*([^\.]+)\.")[0]

bins = [-1, 12, 19, 39, 59, 200]
labels = ["어린이(0~12)", "10대(13~19)", "청년(20~39)", "중년(40~59)", "노년(60+)"]

methods = {
    "①지우기": raw.dropna(subset=["Age"]),
    "②전체중앙값": raw.assign(Age=raw["Age"].fillna(raw["Age"].median())),
    "③호칭별중앙값": raw.assign(Age=raw["Age"].fillna(raw.groupby("Title")["Age"].transform("median"))),
    "④0으로": raw.assign(Age=raw["Age"].fillna(0)),
}

rows = {}
for name, d in methods.items():
    band = pd.cut(d["Age"], bins=bins, labels=labels)
    g = d.groupby(band, observed=False)["Survived"].agg(["mean", "size"])
    rows[name] = g.apply(lambda r: f"{r['mean']*100:.1f}% ({int(r['size'])}명)", axis=1)

print(pd.DataFrame(rows).to_string())
