"""질문 3 — 가족 동반 여부와 생존"""
import pandas as pd

df = pd.read_csv("data/titanic_clean.csv")
df["가족수"] = df["SibSp"] + df["Parch"]
df["동반"] = df["가족수"].map(lambda n: "혼자" if n == 0 else ("소가족(1~3)" if n <= 3 else "대가족(4+)"))

def rate(by):
    g = df.groupby(by, observed=True)["Survived"].agg(생존율="mean", 인원="size")
    g["생존율"] = (g["생존율"] * 100).round(1)
    return g

print("=== 동반 여부 ==="); print(rate("동반").to_string())
print("\n=== 동반 × 성별 ==="); print(rate(["동반", "Sex"]).to_string())
print("\n=== 동반 × 등급 ==="); print(rate(["동반", "Pclass"]).to_string())
