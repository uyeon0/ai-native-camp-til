---
date: 2026-10-20
---

# Day 05 — Git으로 같이 일하기

## 수업

Git과 GitHub로 협업하는 법을 배웠다. 오후에는 스쿼드가 GitHub 레포 하나를 함께 쓰면서 각자 브랜치를 만들고 PR로 합쳤다.

## 만든 것

스쿼드 레포: [team6_pjt_day5](https://github.com/stealth9195/team6_pjt_day5)

원데이 클래스 예약 사이트를 직군별로 나눠 만들기 시작했지만, 사이트를 끝까지 완성하지는 못했다. 나는 개발 담당으로 PR 세 개를 올렸다.

| PR | 내용 |
|---|---|
| [#6](https://github.com/stealth9195/team6_pjt_day5/pull/6) | 모든 페이지가 함께 쓰는 틀(`frame.html`), 공통 스타일(`style.css`), 머리글·바닥글 스크립트(`layout.js`) |
| [#7](https://github.com/stealth9195/team6_pjt_day5/pull/7) | 클래스 목록 페이지. 카테고리 필터와 카드 목록 |
| [#11](https://github.com/stealth9195/team6_pjt_day5/pull/11) | 회사 소개 페이지의 오시는 길·문의 영역을 더미 데이터로 채우기 |

## AI와 일한 방식

수업에서는 각자 Git 스킬을 만들어 커밋·PR에 쓰게 했는데, 나는 미리 만들어 둔 [kocommit](https://github.com/yoouyeon/claude-plugin/tree/main/plugins/kocommit) 스킬을 썼다. 변경사항을 논리 단위로 나누고 한국어 Conventional Commits 메시지로 커밋하는 스킬이다. 레포에 커밋 규칙이 따로 있으면 그 규칙을 먼저 따르기 때문에, 스쿼드가 정한 `[개발] 파일: 내용` 형식도 그대로 맞출 수 있었다.

## 느낀 점

사이트를 마무리하지 못한 이유는 세 가지였다.

- GitHub로 협업하는 데 익숙하지 않은 팀원이 있었다.
- 바닐라 HTML로 여러 명이 동시에 작업할 때 충돌을 피하면서 효율적으로 나누는 방법을 잘 몰랐다.
- AI 토큰이 부족했다.
