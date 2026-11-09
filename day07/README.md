---
date: 2026-10-22
---

# Day 07 — 하루 3번 오는 서비스

## 수업

오전에는 파이썬으로 키가 필요한 오픈 API를 차례로 부르고, API 키를 `.env`에 숨기는 법을 배웠다. 오후에는 스쿼드가 아침·점심·저녁에 다시 올 이유가 있는 서비스를 만들어 GitHub Pages로 공개했다.

## 만든 것

스쿼드 레포: [apptech](https://github.com/devCguild/apptech) · [배포 주소](https://devcguild.github.io/apptech/)

적립금을 모으는 앱테크 서비스다. 앱인토스처럼 공통 입구(홈·전체 앱·내 기록)가 있고, 팀원마다 미니앱을 하나씩 만들어 붙였다.

나는 **[포켓몬 실루엣 퀴즈](https://devcguild.github.io/apptech/#/apps/pokemon)** 미니앱을 맡았다. 포켓몬 실루엣을 보고 이름을 맞히면 포인트를 준다. 데이터와 이미지는 [PokeAPI](https://pokeapi.co/)에서 받고, 실루엣은 이미지에 CSS 필터를 걸어 만들었다.

| PR | 내용 |
|---|---|
| [#7](https://github.com/devCguild/apptech/pull/7) | 포켓몬 실루엣 퀴즈 미니앱 추가 |
| [#13](https://github.com/devCguild/apptech/pull/13) | 미니앱을 자기 폴더 하나로 입구에 붙이는 방식으로 옮기기 |

## AI와 일한 방식

- **기획 문서를 코드 옆에 두고 함께 고쳤다.** 미니앱 폴더에 [`PLAN.md`](https://github.com/devCguild/apptech/blob/main/src/apps/pokemon/PLAN.md)를 두고, 화면을 바꿀 때마다 기획 문서에도 반영했다.
- **충돌을 줄이는 구조에 맞춰 옮겼다.** 처음에는 미니앱을 추가할 때마다 공용 목록 파일을 고쳐야 해서 PR끼리 충돌이 났다. 팀원이 미니앱이 자기 폴더의 `app.config.js` 하나로 입구에 붙는 구조를 제안해 팀 `CLAUDE.md` 규칙으로 정했고, 포켓몬 퀴즈를 그 방식으로 옮겼다.
