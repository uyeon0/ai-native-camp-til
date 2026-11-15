"""회차 내용 파일(content.js)을 템플릿에 넣어 HTML 한 장으로 만든다.

결과 파일 이름은 회차 폴더 번호와 content.js의 range 값으로 정한다.

사용법:
    python3 build.py sessions/02/content.js   # range: "ch03" → sessions/02/jump-to-python-02-ch03.html
    python3 build.py sessions/02/content.js -o out.html
"""
import argparse
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
TEMPLATE = HERE / "template.html"
MARK = "/*CONTENT*/"


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("content", type=pathlib.Path)
    ap.add_argument("-o", "--out", type=pathlib.Path)
    args = ap.parse_args()

    tpl = TEMPLATE.read_text(encoding="utf-8")
    if tpl.count(MARK) != 1:
        sys.exit(f"템플릿에 {MARK} 자리가 정확히 한 번 있어야 한다.")
    content = args.content.read_text(encoding="utf-8")
    if "</script" in content.lower():
        sys.exit("content.js 안에 </script 가 있으면 페이지가 깨진다. <\\/script 로 바꿔 쓴다.")

    out = args.out
    if out is None:
        m = re.search(r'^\s*range:\s*"([a-z0-9-]+)"', content, re.M)
        if not m:
            sys.exit('content.js에 range: "ch01-02" 같은 값이 있어야 결과 파일 이름을 정할 수 있다.')
        session = args.content.resolve().parent.name
        out = args.content.with_name(f"jump-to-python-{session}-{m.group(1)}.html")
    out.write_text(tpl.replace(MARK, content), encoding="utf-8")
    print(f"만듦: {out}")


if __name__ == "__main__":
    main()
