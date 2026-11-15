# CLAUDE.md — 파이썬 스터디 문제집

회차별 문제집(노트 + 문제 + 파이썬 실행기)을 HTML 한 장으로 만드는 폴더다. 문제집 내용을 쓰는 규칙은 `jump-quiz` 스킬(`.claude/skills/jump-quiz/SKILL.md`)에 있다.

## 구조

- `template.html`: 디자인과 동작. 사용자가 디자인이나 동작을 바꾸라고 할 때만 고친다.
- `build.py`: `content.js`를 템플릿의 `/*CONTENT*/` 자리에 넣는다. 표준 라이브러리만 쓴다.
- `sessions/NN/content.js`: 회차마다 새로 쓰는 내용. 형식은 `sessions/01/content.js`를 따른다.
- `sessions/NN/jump-to-python-NN-<range>.html`: 빌드 결과. 이름은 폴더 번호와 `content.js`의 `range`로 정해진다(예: `jump-to-python-01-ch01-02.html`). 손으로 고치지 않고 수정이 필요한 경우 다시 빌드한다.

## 빌드

```bash
python3 build.py sessions/NN/content.js
```

- `content.js`에 `</script`가 있으면 페이지가 깨진다. `build.py`가 빌드를 막는다.
- 템플릿을 고쳤으면 `sessions/` 아래의 모든 회차를 다시 빌드한다.

## 확인

- 빌드한 뒤 Chrome headless로 노트 화면과 `#quiz` 화면을 찍어 본다.
- 보기 선택, 다음 버튼처럼 클릭이 필요한 동작은 빌드한 HTML을 스크래치패드에 복사하고 `</body>` 앞에 클릭을 흉내 내는 스크립트를 넣어 확인한다. 결과는 `document.title`에 적어 `--dump-dom`으로 읽는다. 원본 파일에는 넣지 않는다.
- Python 실행(Pyodide 로딩)은 headless로 확인하지 못했다. 확인하지 못했다고 사용자에게 알린다.
- 파이썬 실행기는 Pyodide를 처음 실행할 때 CDN에서 불러온다. 그래서 인터넷 연결이 필요하고, 문제에 `input()`은 쓰지 않는다.
