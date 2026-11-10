"""결측치 찾기 — 아무것도 고치지 않고 보기만 한다"""
import pandas as pd

df = pd.read_csv("data/train.csv")

# isna(): 칸마다 비었으면 True / sum(): True 개수 = 결측 개수
missing = df.isna().sum()
table = pd.DataFrame({
    "결측 개수": missing,
    "비율(%)": (missing / len(df) * 100).round(1),
})
table = table[table["결측 개수"] > 0].sort_values("결측 개수", ascending=False)
print("=== 칸별 결측 (많은 순) ===")
print(table.to_string())

for col in table.index:
    print(f"\n=== {col} 이 비어 있는 행 3개 ===")
    print(df[df[col].isna()].head(3)[["PassengerId", "Name", "Pclass", "Age", "Ticket", "Cabin", "Embarked"]].to_string())
