# 타이타닉 데이터 분석

수업에서 Kaggle 타이타닉 데이터로 질문 → 첫인상 → 결측 처리 → 집계 → 시각화 → 검산 순서를 따라가며 만든 스크립트다.

| 파일 | 내용 |
|---|---|
| `t1_look.py` | shape · head · info · describe로 첫인상 보기 |
| `t2_missing.py` | 칸별 결측 개수 |
| `t2b_fare_zero.py` | 숨은 결측: Fare가 0인 승객 |
| `t2c_why.py` | Cabin · Age · Embarked가 왜 비었는지 |
| `t3_clean.py` | 칸마다 다르게 처리해 `data/titanic_clean.csv` 저장 |
| `t4_experiment.py` | 나이 결측 처리 4가지로 나이대별 생존율 비교 |
| `t5_groupby.py` | 등급 · 성별 · 항구별 생존율 (인원 수와 함께) |
| `t6_charts.py` | Plotly 차트 4개와 함정 차트를 `charts/`에 저장 |
| `t7_dash.py` | 한 장짜리 Streamlit 대시보드 |
| `t8_family.py` | 가족 동반 여부와 생존 |

데이터는 레포에 넣지 않았다. [Kaggle Titanic 대회](https://www.kaggle.com/competitions/titanic)에서 `train.csv`를 받아 `data/train.csv`로 두고, `t3_clean.py`를 먼저 실행한다.

```bash
pip install -r requirements.txt
python t3_clean.py
streamlit run t7_dash.py
```
