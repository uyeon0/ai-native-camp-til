"""집계하고 검산하기 — 비율 옆에는 항상 인원 수"""
import pandas as pd

df = pd.read_csv("data/titanic_clean.csv")

def rate(by):
    g = df.groupby(by)["Survived"].agg(생존율="mean", 인원="size")
    g["생존율"] = (g["생존율"] * 100).round(1)
    return g

print("=== 성별 ===");      print(rate("Sex").to_string())
print("\n=== 등급별 ===");  print(rate("Pclass").to_string())
print("\n=== 성별 × 등급 ==="); print(rate(["Sex", "Pclass"]).to_string())
print("\n=== 항구별 ===");  print(rate("Embarked").to_string())
print("\n=== 항구 × 등급 ==="); print(rate(["Embarked", "Pclass"]).to_string())
print("\n=== 항구별 등급 구성 (%) ===")
print((pd.crosstab(df["Embarked"], df["Pclass"], normalize="index") * 100).round(1).to_string())
