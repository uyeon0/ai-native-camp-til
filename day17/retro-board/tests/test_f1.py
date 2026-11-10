"""F1 회고 쓰기 — PRD '다 됐다 기준'을 하나씩 확인한다.

진짜 retros/는 건드리지 않는다. 모든 파일 시험은 tmp_path를 RETRO_DIR로 덮어써서 한다.
"""

import os
import re
import sys
from datetime import date, datetime
from pathlib import Path

import pytest

APP_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(APP_DIR))

import retro  # noqa: E402
import storage  # noqa: E402

DAY = date(2026, 11, 5)
T1430 = datetime(2026, 11, 5, 14, 30)
T1810 = datetime(2026, 11, 5, 18, 10)


@pytest.fixture
def folder(tmp_path, monkeypatch):
    """RETRO_DIR을 임시 폴더로 덮어쓴다 (셸에 이미 있어도 덮어씀)."""
    d = tmp_path / "camp"
    monkeypatch.setenv("RETRO_DIR", str(d))
    return d


# ---------- 파일 모양 ----------

PRD_EXAMPLE = (
    "# 2026-11-05\n"
    "\n"
    "## 14:30\n"
    "- 배운 것: 서브에이전트에 역할을 나눠 주면 리뷰가 덜 뭉개진다\n"
    "- 막힌 것: Streamlit에서 저장 후 입력칸 비우기\n"
    "  session_state를 언제 지워야 하는지 모르겠다\n"
    "- 물어볼 것: session_state 초기화 타이밍\n"
    "\n"
    "## 18:10\n"
    "- 배운 것: PRD 빈틈은 리뷰어 에이전트로 먼저 거른다\n"
)


def test_새_파일은_PRD_예시와_한_글자도_다르지_않다(folder):
    # 블록 2개를 저장해 PRD '파일 모양' 예시 문자열과 그대로 비교
    storage.save_retro(
        DAY, T1430,
        "서브에이전트에 역할을 나눠 주면 리뷰가 덜 뭉개진다",
        "Streamlit에서 저장 후 입력칸 비우기\nsession_state를 언제 지워야 하는지 모르겠다",
        "session_state 초기화 타이밍",
    )
    storage.save_retro(DAY, T1810, "PRD 빈틈은 리뷰어 에이전트로 먼저 거른다", "", "")
    assert (folder / "2026-11-05.md").read_text(encoding="utf-8") == PRD_EXAMPLE


def test_제목_뒤_빈줄_1개와_파일_끝_줄바꿈_1개(folder):
    storage.save_retro(DAY, T1430, "가", "", "")
    text = (folder / "2026-11-05.md").read_bytes().decode()
    assert text == "# 2026-11-05\n\n## 14:30\n- 배운 것: 가\n"
    assert text.endswith("\n") and not text.endswith("\n\n")


def test_블록_사이_빈줄_1개(folder):
    storage.save_retro(DAY, T1430, "가", "", "")
    storage.save_retro(DAY, T1810, "나", "", "")
    assert "- 배운 것: 가\n\n## 18:10\n" in (folder / "2026-11-05.md").read_text(encoding="utf-8")


def test_제목은_처음_만들_때_한_번만(folder):
    storage.save_retro(DAY, T1430, "가", "", "")
    storage.save_retro(DAY, T1810, "나", "", "")
    text = (folder / "2026-11-05.md").read_text(encoding="utf-8")
    assert text.count("# 2026-11-05") == 1


# ---------- PRD 기준: 저장 내용 ----------

def test_파일이_없으면_만들고_제목과_블록이_들어간다(folder):
    assert not folder.exists()  # 폴더도 없는 상태에서 시작
    kind, _ = storage.save_retro(DAY, T1430, "가", "나", "다")
    assert kind == "ok"
    assert (folder / "2026-11-05.md").read_text(encoding="utf-8") == (
        "# 2026-11-05\n\n## 14:30\n- 배운 것: 가\n- 막힌 것: 나\n- 물어볼 것: 다\n"
    )


def test_기존_파일_내용은_바이트까지_보존된다(folder):
    folder.mkdir()
    original = "# 2026-11-05\n\n## 09:00\n- 배운 것: 처음\n".encode()
    path = folder / "2026-11-05.md"
    path.write_bytes(original)
    kind, _ = storage.save_retro(DAY, T1430, "새것", "", "")
    after = path.read_bytes()
    assert kind == "ok"
    assert after.startswith(original)
    assert after[len(original):] == "\n## 14:30\n- 배운 것: 새것\n".encode()


def test_기존_파일_끝에_줄바꿈이_없어도_원래_바이트_보존(folder):
    folder.mkdir()
    original = "# 2026-11-05\n\n## 09:00\n- 배운 것: 처음".encode()  # 끝 \n 없음
    path = folder / "2026-11-05.md"
    path.write_bytes(original)
    storage.save_retro(DAY, T1430, "새것", "", "")
    after = path.read_bytes()
    assert after.startswith(original)
    assert after.decode().endswith("\n\n## 14:30\n- 배운 것: 새것\n")  # 빈 줄 1개 뒤 블록


@pytest.mark.parametrize(
    "args,expected_lines",
    [
        (("가", "", ""), ["- 배운 것: 가"]),
        (("", "나", ""), ["- 막힌 것: 나"]),
        (("", "", "다"), ["- 물어볼 것: 다"]),
    ],
)
def test_한_칸만_채워도_저장되고_채운_줄만_들어간다(folder, args, expected_lines):
    kind, _ = storage.save_retro(DAY, T1430, *args)
    lines = (folder / "2026-11-05.md").read_text(encoding="utf-8").splitlines()
    assert kind == "ok"
    assert lines[3:] == expected_lines


@pytest.mark.parametrize("blank", ["", "   ", " \n\t \n  "])
def test_세_칸이_비거나_공백뿐이면_안내만_뜨고_파일은_안_생긴다(folder, blank):
    kind, msg = storage.save_retro(DAY, T1430, blank, blank, blank)
    assert (kind, msg) == ("empty", "한 칸 이상 적어 주세요")
    assert not folder.exists()


def test_빈_입력은_기존_파일을_바꾸지_않는다(folder):
    folder.mkdir()
    path = folder / "2026-11-05.md"
    path.write_text("# 2026-11-05\n\n## 09:00\n- 배운 것: 처음\n", encoding="utf-8")
    before = path.read_bytes()
    storage.save_retro(DAY, T1430, " ", "", "\n")
    assert path.read_bytes() == before


def test_칸_앞뒤_공백은_지운다(folder):
    storage.save_retro(DAY, T1430, "   가   ", "\n\n나\n\n", "\t다\t")
    text = (folder / "2026-11-05.md").read_text(encoding="utf-8")
    assert text.endswith("- 배운 것: 가\n- 막힌 것: 나\n- 물어볼 것: 다\n")


def test_여러_줄은_둘째_줄부터_공백_2칸_들여쓰기(folder):
    storage.save_retro(DAY, T1430, "첫줄\n둘째줄\n셋째줄", "", "")
    text = (folder / "2026-11-05.md").read_text(encoding="utf-8")
    assert text.endswith("- 배운 것: 첫줄\n  둘째줄\n  셋째줄\n")


def test_칸_안_빈줄과_공백뿐인_줄은_지운다(folder):
    storage.save_retro(DAY, T1430, "첫줄\n\n   \n둘째줄", "", "")
    text = (folder / "2026-11-05.md").read_text(encoding="utf-8")
    assert text.endswith("- 배운 것: 첫줄\n  둘째줄\n")


def test_줄_끝_공백은_지운다(folder):
    storage.save_retro(DAY, T1430, "첫줄   \n둘째줄\t ", "", "")
    text = (folder / "2026-11-05.md").read_text(encoding="utf-8")
    assert text.endswith("- 배운 것: 첫줄\n  둘째줄\n")
    assert not any(line != line.rstrip() for line in text.splitlines())


def test_비운_칸은_줄을_쓰지_않는다(folder):
    storage.save_retro(DAY, T1430, "가", "", "다")
    text = (folder / "2026-11-05.md").read_text(encoding="utf-8")
    assert "막힌 것" not in text


def test_md_문법으로_시작하는_줄도_이스케이프하지_않는다(folder):
    storage.save_retro(DAY, T1430, "첫줄\n# 제목처럼\n- 목록처럼", "", "")
    text = (folder / "2026-11-05.md").read_text(encoding="utf-8")
    assert text.endswith("- 배운 것: 첫줄\n  # 제목처럼\n  - 목록처럼\n")


# ---------- 중복 막기 ----------

def test_직전_블록과_같으면_붙지_않고_안내가_뜬다(folder):
    storage.save_retro(DAY, T1430, "가", "나", "")
    path = folder / "2026-11-05.md"
    before = path.read_bytes()
    kind, msg = storage.save_retro(DAY, T1810, "가", "나", "")  # 시각이 달라도 내용이 같음
    assert (kind, msg) == ("duplicate", "방금 저장한 내용과 같아요. 새 내용을 적어 주세요")
    assert path.read_bytes() == before


def test_같은_입력으로_연달아_두_번_부르면_블록은_하나(folder):
    r1 = storage.save_retro(DAY, T1430, "가", "", "")
    r2 = storage.save_retro(DAY, T1430, "가", "", "")
    text = (folder / "2026-11-05.md").read_text(encoding="utf-8")
    assert r1[0] == "ok" and r2[0] == "duplicate"
    assert retro.count_blocks(text) == 1


def test_내용이_다르면_같은_분에도_붙는다(folder):
    storage.save_retro(DAY, T1430, "가", "", "")
    kind, msg = storage.save_retro(DAY, T1430, "나", "", "")
    text = (folder / "2026-11-05.md").read_text(encoding="utf-8")
    assert kind == "ok" and "(오늘 2번째)" in msg
    assert text.count("## 14:30\n") == 2


def test_직전이_아니라_더_앞_블록과_같으면_붙는다(folder):
    storage.save_retro(DAY, T1430, "가", "", "")
    storage.save_retro(DAY, T1430, "나", "", "")
    kind, _ = storage.save_retro(DAY, T1810, "가", "", "")  # 직전은 '나'
    assert kind == "ok"


def test_칸_위치가_다르면_같은_내용이_아니다(folder):
    storage.save_retro(DAY, T1430, "가", "", "")
    kind, _ = storage.save_retro(DAY, T1430, "", "가", "")
    assert kind == "ok"


# ---------- 오늘 N번째 ----------

def test_성공_문구는_폴더이름_슬래시_파일이름과_N번째(folder):
    kind, msg = storage.save_retro(DAY, T1430, "가", "", "")
    assert (kind, msg) == ("ok", "저장했어요: camp/2026-11-05.md (오늘 1번째)")
    _, msg2 = storage.save_retro(DAY, T1810, "나", "", "")
    assert msg2 == "저장했어요: camp/2026-11-05.md (오늘 2번째)"


def test_입력_안의_샵샵_줄이_있어도_N이_틀리지_않는다(folder):
    storage.save_retro(DAY, T1430, "## 12:34\n## 제목", "## 99:99", "## 11:11")
    _, msg = storage.save_retro(DAY, T1810, "## 22:22\n둘째", "", "")
    assert "(오늘 2번째)" in msg


def test_count_blocks는_정확한_모양만_센다():
    text = "# 날짜\n\n## 14:30\n## 1:30\n##  14:30\n## 14:30 \n### 14:30\n## 18:10\n"
    assert retro.count_blocks(text) == 2


# ---------- 저장 실패 ----------

def test_RETRO_DIR이_파일이면_오류_문구가_나오고_죽지_않는다(tmp_path, monkeypatch):
    f = tmp_path / "not_a_dir"
    f.write_text("x")
    monkeypatch.setenv("RETRO_DIR", str(f))
    kind, msg = storage.save_retro(DAY, T1430, "가", "", "")
    assert kind == "error"
    assert msg.startswith("저장하지 못했어요: ")
    assert f.read_text() == "x"


def test_만들_수_없는_경로면_오류_문구(tmp_path, monkeypatch):
    f = tmp_path / "file"
    f.write_text("x")
    monkeypatch.setenv("RETRO_DIR", str(f / "sub"))  # 파일 아래 폴더는 못 만듦
    kind, msg = storage.save_retro(DAY, T1430, "가", "", "")
    assert kind == "error" and msg.startswith("저장하지 못했어요: ")


@pytest.mark.skipif(os.geteuid() == 0, reason="root는 권한 검사를 통과해 시험할 수 없다")
def test_쓰기_권한_없는_폴더면_오류_문구(tmp_path, monkeypatch):
    d = tmp_path / "ro"
    d.mkdir()
    d.chmod(0o500)
    monkeypatch.setenv("RETRO_DIR", str(d))
    try:
        kind, msg = storage.save_retro(DAY, T1430, "가", "", "")
    finally:
        d.chmod(0o700)
    assert kind == "error" and msg.startswith("저장하지 못했어요: ")
    assert list(d.iterdir()) == []


def test_기존_파일이_UTF8이_아니어도_예외로_죽지_않는다(folder):
    folder.mkdir()
    (folder / "2026-11-05.md").write_bytes(b"\xff\xfe\x00bad")
    kind, msg = storage.save_retro(DAY, T1430, "가", "", "")
    assert kind == "error" and msg.startswith("저장하지 못했어요: ")


# ---------- 경로 ----------

def test_상대_경로는_app_py_폴더_기준(monkeypatch):
    monkeypatch.setenv("RETRO_DIR", "some/where")
    monkeypatch.chdir("/")  # 실행 위치가 달라도 같아야 한다
    assert storage.retro_dir() == APP_DIR / "some" / "where"


def test_기본_폴더는_app_py_옆_retros(monkeypatch):
    monkeypatch.delenv("RETRO_DIR", raising=False)
    assert storage.retro_dir() == APP_DIR / "retros"


def test_물결표는_홈_폴더로_펼친다(tmp_path, monkeypatch):
    monkeypatch.setenv("HOME", str(tmp_path))
    monkeypatch.setenv("RETRO_DIR", "~/notes/camp")
    assert storage.retro_dir() == tmp_path / "notes" / "camp"


def test_물결표_경로의_저장_메시지는_camp_슬래시_파일(tmp_path, monkeypatch):
    monkeypatch.setenv("HOME", str(tmp_path))
    monkeypatch.setenv("RETRO_DIR", "~/notes/camp")
    _, msg = storage.save_retro(DAY, T1430, "가", "", "")
    assert msg.startswith("저장했어요: camp/2026-11-05.md")
    assert (tmp_path / "notes" / "camp" / "2026-11-05.md").exists()


# ---------- 자정 넘김 ----------

def test_화면_날짜와_저장_시각이_다른_날이면_화면_날짜_파일에_들어간다(folder):
    screen = date(2026, 11, 4)
    now = datetime(2026, 11, 5, 0, 1)
    kind, msg = storage.save_retro(screen, now, "가", "", "")
    assert kind == "ok" and "2026-11-04.md" in msg
    assert (folder / "2026-11-04.md").read_text(encoding="utf-8") == (
        "# 2026-11-04\n\n## 00:01\n- 배운 것: 가\n"
    )
    assert not (folder / "2026-11-05.md").exists()


# ---------- 순수 함수 ----------

def test_make_block은_다_비면_None():
    assert retro.make_block(T1430, "", " ", "\n") is None


def test_addition_파일_없을_때와_있을_때():
    block = "## 14:30\n- 배운 것: 가\n"
    assert retro.addition(None, DAY, block) == "# 2026-11-05\n\n" + block
    assert retro.addition("# 2026-11-05\n", DAY, block) == "\n" + block


# ---------- 화면 (AppTest) ----------

from streamlit.testing.v1 import AppTest  # noqa: E402


def _app(folder_path, screen_date=DAY):
    at = AppTest.from_file(str(APP_DIR / "app.py"), default_timeout=20)
    at.session_state["screen_date"] = screen_date
    at.run()
    assert not at.exception
    return at


def _fill(at, learned="", stuck="", ask=""):
    at.text_area(key="learned").set_value(learned)
    at.text_area(key="stuck").set_value(stuck)
    at.text_area(key="ask").set_value(ask)


def test_화면_구성_날짜_입력칸_3개_저장_버튼(folder):
    at = _app(folder)
    assert [t.label for t in at.text_area] == ["배운 것", "막힌 것", "물어볼 것"]
    assert at.button[0].label == "저장하기"
    assert at.subheader[0].value.startswith("2026-11-05")  # 제목 맨 앞에 화면 날짜
    assert [t.label for t in at.tabs][:1] == ["✏️ 쓰기"]


def test_화면_성공하면_칸이_비워지고_문구가_보인다(folder):
    at = _app(folder)
    _fill(at, learned="가", stuck="나")
    at.button[0].click().run()
    assert not at.exception
    assert at.success[0].value == "저장했어요: camp/2026-11-05.md (오늘 1번째)"
    assert [t.value for t in at.text_area] == ["", "", ""]
    assert (folder / "2026-11-05.md").exists()


def test_화면_세_칸이_비면_안내가_뜨고_파일은_없다(folder):
    at = _app(folder)
    _fill(at, learned="  ")
    at.button[0].click().run()
    assert at.warning[0].value == "한 칸 이상 적어 주세요"
    assert not folder.exists()


def test_화면_같은_내용을_다시_저장하면_안내만_뜬다(folder):
    at = _app(folder)
    _fill(at, learned="가")
    at.button[0].click().run()
    _fill(at, learned="가")
    at.button[0].click().run()
    assert at.info[0].value == "방금 저장한 내용과 같아요. 새 내용을 적어 주세요"
    assert retro.count_blocks((folder / "2026-11-05.md").read_text(encoding="utf-8")) == 1


def test_화면_저장_실패하면_오류가_뜨고_입력칸은_그대로(tmp_path, monkeypatch):
    f = tmp_path / "file"
    f.write_text("x")
    monkeypatch.setenv("RETRO_DIR", str(f))
    at = _app(f)
    _fill(at, learned="가", stuck="나\n다")
    at.button[0].click().run()
    assert not at.exception
    assert at.error[0].value.startswith("저장하지 못했어요: ")
    assert at.text_area(key="learned").value == "가"
    assert at.text_area(key="stuck").value == "나\n다"


def test_화면_성공_뒤_다시_저장하면_두_번째로_센다(folder):
    at = _app(folder)
    _fill(at, learned="가")
    at.button[0].click().run()
    _fill(at, learned="나")
    at.button[0].click().run()
    assert at.success[0].value.endswith("(오늘 2번째)")


def test_화면_자정_뒤_저장해도_화면_날짜_파일(folder):
    at = _app(folder, screen_date=date(2020, 1, 1))  # 지금과 다른 날을 화면 날짜로 고정
    _fill(at, learned="가")
    at.button[0].click().run()
    assert (folder / "2020-01-01.md").exists()
    assert not (folder / f"{date.today().isoformat()}.md").exists()


def test_화면_RETRO_DIR을_지정하면_진짜_retros는_바뀌지_않는다(folder):
    real = APP_DIR / "retros"
    before = sorted(p.name for p in real.glob("*")) if real.exists() else None
    at = _app(folder)
    _fill(at, learned="가")
    at.button[0].click().run()
    after = sorted(p.name for p in real.glob("*")) if real.exists() else None
    assert before == after
    assert (folder / "2026-11-05.md").exists()
