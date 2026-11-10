"""왜 비었을까 — Cabin · Age · Embarked 결측 원인 확인"""
import pandas as pd

df = pd.read_csv("data/train.csv")

print("=== Cabin: 등급별 Cabin 빈 비율 ===")
print(df.groupby("Pclass")["Cabin"].apply(lambda s: f"{s.isna().mean()*100:.1f}% ({s.isna().sum()}/{len(s)})").to_string())

print("\n=== Age: 나이 빈 사람 vs 있는 사람 ===")
df["age_missing"] = df["Age"].isna()
g = df.groupby("age_missing").agg(인원=("Survived", "size"), 생존율=("Survived", "mean"),
                                  _3등석비율=("Pclass", lambda s: (s == 3).mean()))
print(g.round(3).to_string())

print("\n=== Embarked: 빈 2명과 같은 티켓 ===")
emp = df[df["Embarked"].isna()]
print(emp[["Name", "Pclass", "Ticket", "Fare", "Cabin"]].to_string())
print("같은 티켓 전체 인원:", (df["Ticket"] == emp["Ticket"].iloc[0]).sum())
print("\n참고: 1등석 · Fare 70~90 승객의 항구 분포")
print(df[(df.Pclass == 1) & df.Fare.between(70, 90)]["Embarked"].value_counts().to_string())
