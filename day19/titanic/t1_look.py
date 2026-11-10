"""타이타닉 데이터 첫인상 보기: shape · head · info · describe"""
import pandas as pd

df = pd.read_csv("data/train.csv")

print("=== 1. 몇 행 몇 칸 (shape) ===")
print(df.shape)

print("\n=== 2. 위 5줄 (head) ===")
print(df.head().to_string())

print("\n=== 3. 칸마다 비어 있지 않은 개수와 자료형 (info) ===")
df.info()

print("\n=== 4. 숫자 칸 요약 (describe) ===")
print(df.describe().round(2).to_string())
