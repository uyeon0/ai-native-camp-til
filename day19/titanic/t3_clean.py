"""결측치 정제 — 칸마다 다르게 처리하고 data/titanic_clean.csv 로 저장"""
import pandas as pd

raw = pd.read_csv("data/train.csv")
df = raw.copy()

# Age: 호칭별 중앙값으로 채우고, 원래 비었는지 age_missing 칸에 남긴다
df["age_missing"] = df["Age"].isna()
df["Title"] = df["Name"].str.extract(r",\s*([^\.]+)\.")[0]
df["Age"] = df["Age"].fillna(df.groupby("Title")["Age"].transform("median"))
df["Age"] = df["Age"].fillna(df["Age"].median())  # 호칭 자체에 나이 기록이 없을 때 대비

# Cabin: 빈칸은 Unknown, 갑판 글자(A~G 등)만 Deck 칸으로
df["Cabin"] = df["Cabin"].fillna("Unknown")
df["Deck"] = df["Cabin"].str[0].where(df["Cabin"] != "Unknown", "Unknown")

# Embarked: 최빈값(S)으로
df["Embarked"] = df["Embarked"].fillna(df["Embarked"].mode()[0])

# Fare 0: 진짜 0으로 보고 그대로 둔다

df.to_csv("data/titanic_clean.csv", index=False)

cols = ["Age", "Cabin", "Embarked"]
print(pd.DataFrame({
    "정제 전 결측": raw[cols].isna().sum(),
    "정제 후 결측": df[cols].isna().sum(),
}).to_string())
print(f"\n행 수: {len(raw)} → {len(df)}")
print("age_missing True:", df["age_missing"].sum())
print("Fare 0 인원(그대로):", (df["Fare"] == 0).sum())
