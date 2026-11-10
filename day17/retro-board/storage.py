"""파일 읽기·쓰기만 한다."""

import os
from pathlib import Path

APP_DIR = Path(__file__).resolve().parent


def retro_dir():
    """저장 폴더. RETRO_DIR이 있으면 그것(상대 경로는 app.py 폴더 기준, ~ 펼침), 없으면 retros/."""
    raw = os.environ.get("RETRO_DIR") or "retros"
    path = Path(raw).expanduser()
    if not path.is_absolute():
        path = APP_DIR / path
    return path


def read_text(path: Path):
    """파일 내용. 없으면 None."""
    if not path.exists():
        return None
    return path.read_text(encoding="utf-8")


def append_text(path: Path, text):
    """폴더가 없으면 만들고 파일 끝에 붙인다."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("a", encoding="utf-8") as f:
        f.write(text)


CHECK_DIR = "저장 폴더(RETRO_DIR)를 확인해 주세요"


def error_reason(e: OSError):
    """자주 나오는 저장 실패만 한국어로 바꾼다. 나머지는 원문 그대로."""
    if isinstance(e, PermissionError):
        return f"폴더에 쓸 권한이 없어요. {CHECK_DIR}"
    if isinstance(e, (FileExistsError, NotADirectoryError)):
        return f"폴더 자리에 같은 이름의 파일이 있어요. {CHECK_DIR}"
    if isinstance(e, FileNotFoundError):
        return f"경로를 찾을 수 없어요. {CHECK_DIR}"
    return e.strerror or str(e)


def save_retro(day, now, learned, stuck, ask):
    """회고 한 블록을 저장한다. 결과를 (종류, 문구)로 돌려준다.

    종류: "ok" · "empty" · "duplicate" · "error". 예외는 밖으로 내보내지 않는다.
    """
    import retro

    block = retro.make_block(now, learned, stuck, ask)
    if block is None:
        return "empty", retro.MSG_EMPTY
    folder = retro_dir()
    path = folder / retro.file_name(day)
    try:
        existing = read_text(path)
        if existing is not None and retro.last_block_items(existing) == block.splitlines()[1:]:
            return "duplicate", retro.MSG_DUPLICATE
        append_text(path, retro.addition(existing, day, block))
        n = retro.count_blocks(read_text(path))
    except OSError as e:
        return "error", f"저장하지 못했어요: {error_reason(e)}"
    except UnicodeError:
        return "error", "저장하지 못했어요: 오늘 파일이 UTF-8이 아니어서 읽을 수 없어요. 파일을 직접 확인해 주세요"
    return "ok", f"저장했어요: {folder.name}/{path.name} (오늘 {n}번째)"
