# 수업 회고 모음판

배운 것·막힌 것·물어볼 것을 적으면 날짜별 md 파일로 쌓아 주는 개인용 Streamlit 앱. 기획과 결정 기록은 [docs/PRD.md](docs/PRD.md)에 있다.

```text
app.py       화면. 보여 주기만 한다
retro.py     md 블록을 만드는 순수 함수
storage.py   파일 읽기·쓰기
tests/       pytest
docs/        PRD
```

```bash
pip install streamlit pytest
streamlit run app.py   # retros/에 저장. RETRO_DIR로 폴더를 바꿀 수 있다
pytest
```
