"""회고 md 문자열을 만드는 순수 함수. 파일은 모른다."""

import re
from datetime import date, datetime

LABELS = ("배운 것", "막힌 것", "물어볼 것")
BLOCK_HEADER = re.compile(r"^## \d{2}:\d{2}$")

MSG_EMPTY = "한 칸 이상 적어 주세요"
MSG_DUPLICATE = "방금 저장한 내용과 같아요. 새 내용을 적어 주세요"


def clean_field(text):
    """칸 내용을 줄 목록으로 정리한다. 줄 끝 공백·빈 줄을 지우고 앞뒤 공백을 지운다."""
    lines = [line.rstrip() for line in (text or "").strip().splitlines()]
    return [line for line in lines if line.strip()]


def item_lines(learned, stuck, ask):
    """세 칸을 '- 항목: 내용' 줄 목록으로 만든다. 비운 칸은 뺀다."""
    out = []
    for label, text in zip(LABELS, (learned, stuck, ask)):
        lines = clean_field(text)
        if not lines:
            continue
        out.append(f"- {label}: {lines[0]}")
        out.extend(f"  {line}" for line in lines[1:])
    return out


def make_block(now: datetime, learned, stuck, ask):
    """'## HH:MM' 블록 문자열(끝에 \\n 1개). 세 칸이 다 비면 None."""
    items = item_lines(learned, stuck, ask)
    if not items:
        return None
    return "\n".join([now.strftime("## %H:%M"), *items]) + "\n"


def last_block_items(content):
    """파일 내용에서 마지막 '## HH:MM' 블록의 항목 줄 목록. 블록이 없으면 None."""
    lines = content.splitlines()
    starts = [i for i, line in enumerate(lines) if BLOCK_HEADER.match(line)]
    if not starts:
        return None
    body = lines[starts[-1] + 1 :]
    while body and not body[-1].strip():
        body.pop()
    return body


def addition(existing, day: date, block):
    """파일 끝에 붙일 문자열. existing은 기존 파일 내용(없으면 None)."""
    if not existing:
        return f"# {day.isoformat()}\n\n{block}"
    prefix = "" if existing.endswith("\n") else "\n"
    return f"{prefix}\n{block}"


def count_blocks(content):
    """'오늘 N번째'의 N: 정확히 '## HH:MM' 모양인 줄 수."""
    return sum(1 for line in (content or "").splitlines() if BLOCK_HEADER.match(line))


def file_name(day: date):
    return f"{day.isoformat()}.md"
