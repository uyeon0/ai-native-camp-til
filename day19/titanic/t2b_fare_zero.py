"""숨은 결측 — Fare가 0인 승객 보기"""
import pandas as pd

df = pd.read_csv("data/train.csv")
zero = df[df["Fare"] == 0]
print(f"Fare 0 승객: {len(zero)}명\n")
print(zero[["Name", "Pclass", "Ticket", "Age", "Embarked", "Survived"]].to_string())

print("\n=== 같은 티켓을 가진 다른 승객 (Fare > 0) ===")
same = df[df["Ticket"].isin(zero["Ticket"]) & (df["Fare"] > 0)]
print(same[["Name", "Ticket", "Fare"]].to_string() if len(same) else "없음")
