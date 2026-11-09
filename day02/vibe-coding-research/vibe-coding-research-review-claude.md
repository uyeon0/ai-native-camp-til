# 바이브코딩 조사 보완 제안

> 이 리뷰는 통합본의 이전 버전(22개 도구)과 조별 CSV를 대상으로 썼다. 지적 사항은 현재 통합본에 반영됐고, CSV는 이 레포에 없다.

`vibe-coding-research.md`(통합본)와 `AI서비스조사.csv`를 검토하고, 2026년 10월 15일에 웹 검색과 공식 페이지 확인으로 보완할 내용을 정리했다. 이 문서는 원본을 고치지 않고 제안만 담는다.

## 요약

- 통합본에서 "확인 필요"로 남긴 Stack Overflow 2026 수치는 원문에서 확인했다. 통합본 서두의 단서 문장은 지워도 된다.
- Cursor의 2026년 변화가 통합본에 빠져 있다. SpaceX가 Cursor를 인수했고, 10월 12일 요금 체계가 바뀌었다.
- CSV의 요금 칸은 22행 중 6행만 차 있고, 주소 칸은 4행만 차 있다. 공식 요금 페이지에서 확인한 값을 아래 표에 정리했다.
- CSV에 운영 중인 툴과 종료·전환된 툴이 구분 없이 섞여 있다. 상태 칸을 추가하는 것을 제안한다.
- 추가 후보로 Google AI Studio(Build 모드)와 Figma Make를, 제외 목록 추가 대상으로 Firebase Studio를 찾았다.
- 보안 사고와 사용량 과금 전환은 툴을 고를 때 영향이 크지만 세 조사 모두 다루지 않았다.

## 1. 바로잡거나 보강할 내용

### Stack Overflow 2026 수치는 원문과 일치한다

[Stack Overflow 2026 설문 원문](https://survey.stackoverflow.co/2026/ai/data)에서 "지난 1년간 다음 코딩 에이전트·도우미를 사용했는가" 문항(n=12,255)을 확인했다. Claude Code 65.5%(8,030명), GitHub Copilot 58.7%, OpenAI Codex 29.5%, Cursor 25.5%, Google Antigravity 16.0%, Open Code 13.6%, JetBrains AI 12.8%, Windsurf 6.5%로 Codex 조사의 수치와 같다.

통합본 서두의 "Claude 조사는 해당 원문을 확인하지 못했다"는 문장은 이제 필요 없다. 다만 설문의 항목명은 "JetBrains AI"이고 Junie는 따로 집계되지 않았다. 통합본 JetBrains 절의 "Stack Overflow 사용 응답 12.8%"는 "JetBrains AI 항목 12.8%"로 고치는 것이 정확하다.

### Cursor: SpaceX 인수와 10월 요금 개편

통합본 Cursor 절에 다음 두 가지를 추가할 것을 제안한다.

- 인수: SpaceX가 2026년 6월 16일 Cursor 운영사 Anysphere를 600억 달러에 인수한다고 발표했고, 8월에 인수를 마쳤다. 완료일은 출처마다 8월 14일 또는 15일로 다르다. xAI는 그보다 앞서 SpaceX에 합병됐다. ([CNBC](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html), [Wikipedia](https://en.wikipedia.org/wiki/Cursor_(company)))
- 요금: 10월 12일 Grok, Cursor, X Premium을 묶은 "X Subscription"이 나왔다. [Cursor 공식 요금 페이지](https://cursor.com/pricing)에서 Free, Plus $8, Premium $30, Super $100, Ultra $200을 확인했다. Plus는 Grok 모델만 쓸 수 있고, Claude나 GPT 같은 외부 모델은 구독료와 별도로 API 정가로 과금된다. 기존 $20 Cursor Pro는 신규 가입이 막혔다고 보도됐다. ([24/7 Wall St.](https://247wallst.com/investing/2026/10/13/spacex-just-rolled-grok-cursor-and-x-into-one-subscription-the-top-tier-is-200-a-month/))

Gemini 조사의 Composer 2는 2026년 3월 19일에 나온 Cursor 자체 모델이다. Cursor는 Moonshot AI의 Kimi K2.5를 기반으로 만들었다고 인정했다. 5월에 Composer 2.5가 나왔다는 집계 사이트 기록이 있지만 공식 발표로는 확인하지 않았다. ([VentureBeat](https://venturebeat.com/technology/cursors-new-coding-model-composer-2-is-here-it-beats-claude-opus-4-6-but), [The Decoder](https://the-decoder.com/?p=33391))

### OpenAI Codex: 앱 시점 정리

통합본은 "앱 통합과 데스크톱 앱 제공에 관한 두 서술은 시점 차이를 확인해야 한다"고 적었다. 확인한 순서는 다음과 같다. Codex 데스크톱 앱이 2026년 2월 2일 macOS용으로 나왔고, 7월 9일 ChatGPT 앱에 통합됐다. Gemini 조사의 "2025년 말 개편"은 구체적인 사건을 가리키지 않아 빼거나 출처를 붙이는 것이 좋다.

### GitHub Copilot: "API 기반 구조 개편"의 실체

Gemini 조사의 "API 기반으로 구조를 개편"이라는 서술에는 출처가 없다. 공식 요금 페이지에서 확인한 변화는 과금 방식이다. 2026년 6월 1일부터 채팅, 에이전트 모드, 코드 리뷰, 클라우드 에이전트, Copilot CLI가 GitHub AI Credits(1 크레딧 = $0.01)를 쓴다. 코드 자동 완성은 크레딧을 쓰지 않는다. ([GitHub Copilot 요금](https://github.com/features/copilot/plans))

### Google Antigravity: 시한이 있는 정보

Gemini 조사의 "Claude Opus 4.6 사용 가능"은 무료 티어 기준으로 2026년 11월 2일까지라는 출처가 있다. 곧 틀린 정보가 될 수 있으므로 날짜를 함께 적는 것이 좋다. "최대 5개 에이전트 병렬 실행"은 이번 검색에서 출처를 찾지 못했다. ([preuve.ai 리뷰](https://preuve.ai/blog/antigravity-review))

### Claude Code: 기능 출시 시점

Gemini 조사가 소개한 Auto mode는 2026년 3월 24일 research preview로 나왔다. 8월 9일에 기본값으로 바뀌었다는 기록은 단일 출처라 확인이 필요하다. Dispatch는 휴대폰이나 Telegram, Discord 같은 채널에서 Claude Code에 작업을 지시하는 기능이다. ([MindStudio](https://www.mindstudio.ai/blog/claude-code-q1-2026-update-roundup), [Dealroom](https://app.dealroom.co/news/note/anthropic-makes-claude-code-s-auto-mode-the-default))

## 2. CSV 보완

### 칸 추가 제안

| 추가할 칸 | 이유 | 값 예시 |
|---|---|---|
| 분류 | 개발자용 툴과 앱 빌더가 한 표에 섞여 있어 "추천 용도"만으로는 구분이 어렵다 | 개발자용 / 앱 빌더 / 오픈소스 |
| 상태 | Roo Code, Gemini CLI, Amazon Q Developer, Aider가 운영 중인 툴과 같은 형식으로 들어가 있다 | 운영 / 개인용 전환 / 지원 종료 예정 / 아카이브 |
| 확인일 | 요금과 상태가 몇 주 단위로 바뀐다. Cursor는 조사 사흘 전에 요금이 바뀌었다 | 2026-10-15 |

### 요금

공식 요금 페이지를 직접 열어 확인한 값과 3자 자료에 기댄 값을 구분했다. 모두 USD, 월 결제 기준이다.

| 서비스 | 요금 | 근거 |
|---|---|---|
| Claude Code | Claude 구독에 포함. Pro $20(연 결제 시 $17), Max $100부터, Team Standard $25/인 | [공식](https://claude.com/pricing) |
| GitHub Copilot | Free, Pro $10, Pro+ $39, Max $100. 사용량은 AI Credits로 차감 | [공식](https://github.com/features/copilot/plans) |
| Cursor | Free, Plus $8(Grok 모델만), Premium $30, Super $100, Ultra $200. 외부 모델은 API 정가로 별도 과금 | [공식](https://cursor.com/pricing) |
| OpenAI Codex | ChatGPT 구독에 포함. Free(제한), Go $8, Plus $20, Pro $100·$200 | 3자 자료 ([Jet Admin](https://www.jetadmin.io/blog/codex-pricing-current-costs-usage-limits-and-realistic-budgets-2026/)). OpenAI 공식 페이지 미확인 |
| Google Antigravity | 무료(주간 한도), Google AI Pro $19.99, Ultra $99.99·$199.99 | 3자 자료 ([CloudZero](https://www.cloudzero.com/blog/google-antigravity-pricing/)) |
| Lovable | Free(하루 5크레딧, 월 최대 30), Pro $25, Business $50 | Free는 [공식](https://lovable.dev/pricing). 유료 가격은 공식 페이지에서 읽히지 않아 3자 자료 ([eesel](https://eesel.ai/blog/lovable-pricing)) |
| Bolt.new | Free(월 100만 토큰, 하루 30만), Pro $25(월 1,000만 토큰부터), Teams $30/인 | [공식](https://bolt.new/pricing) |
| Replit | Core $20(연 결제 시 $18), Pro $100(연 결제 시 $90) | [공식](https://replit.com/pricing) |
| v0 | Free(하루 7메시지), Plus $30/인, Business $100/인 | [공식](https://v0.app/pricing) |
| Base44 | Free(월 25 메시지 크레딧), 연 결제 기준 Starter $16, Builder $40, Pro $80, Elite $160 | [공식](https://base44.com/pricing) |

CSV의 Bolt.new 요금 "무료 토큰 할당량 있음"은 "Free 월 100만 토큰, Pro $25"처럼 구체적인 값으로 바꿀 수 있다.

### 주소

CSV에서 비어 있는 주소 중 이번에 공식 페이지를 직접 연 것은 Cursor(`https://cursor.com`), GitHub Copilot(`https://github.com/features/copilot`), Base44(`https://base44.com`), Claude(`https://claude.com`)다. Kiro(`https://kiro.dev`), Kilo Code(`https://kilo.ai`), OpenCode(`https://opencode.ai`)는 원본 조사가 인용한 출처의 도메인이다. 나머지는 이번에 확인하지 않았다.

### 비어 있는 행

JetBrains AI·Junie, Base44, Kiro는 장점, 아쉬운 점, 추천 용도가 거의 비어 있다. Base44는 위 요금과 함께 "Wix 인수, 노코드 앱 빌더"를, 아쉬운 점에는 아래 보안 절의 RedAccess 조사를 근거로 "공개 기본 설정에 따른 데이터 노출 사례"를 넣을 수 있다.

## 3. 추가를 제안하는 툴

| 툴 | 분류 | 추가 근거 | 확인 수준 |
|---|---|---|---|
| Google AI Studio (Build 모드) | 앱 빌더 | Firebase Studio의 후속. 프롬프트로 백엔드와 인증을 포함한 풀스택 앱을 만들고, 2026년 5월부터 Android 네이티브 앱도 만든다. 쓸 만한 무료 티어가 있다는 평이 많다 | 3자 자료 여러 건이 일치 |
| Figma Make | 앱 빌더 (디자이너용) | Figma 안에서 디자인 시스템을 이어받아 동작하는 앱을 만든다. 기획·디자인 직군 대상 조사라면 넣을 만하다 | 3자 자료 |
| Trae | 개발자용 IDE | ByteDance의 무료 AI IDE | 3자 자료. 최근 업데이트는 미확인 |
| Emergent, Rork, Anything | 앱 빌더 | 여러 2026년 목록에 등장한다. Rork는 네이티브 모바일 앱 전용이다 | 사용량 근거 없음. 후보로만 기록 |

제외 목록에는 Firebase Studio를 추가하는 것을 제안한다. Google이 2026년 3월 19일 종료를 발표했고, 6월 22일부터 신규 가입과 새 워크스페이스 생성을 막았으며, 2027년 3월 22일 서비스를 끝낸다. Firestore, Firebase Authentication, Hosting 같은 Firebase 백엔드는 계속 운영된다. 이 일정은 3자 자료 여러 건이 일치하지만 Google 공식 발표는 직접 확인하지 않았다. ([People Matters](https://sea.peoplemattersglobal.com/news/ai-and-emerging-tech/google-to-shut-down-firebase-studio-shift-focus-to-ai-tools-48901), [Wikipedia](https://en.wikipedia.org/wiki/Firebase_Studio))

## 4. 추가를 제안하는 관점

### 보안

앱 빌더를 비개발자에게 추천한다면 보안 사례를 함께 적는 것이 좋다.

- Lovable에 호스팅된 앱 하나에서 취약점 16건이 발견됐고 1만 8천 명 이상의 데이터가 노출됐다. 별도의 접근 제어(BOLA) 결함은 버그 바운티 신고가 처리되지 않아 48일 동안 열려 있었다. ([The Register](https://www.theregister.com/2026/02/27/lovable_app_vulnerabilities), [The Next Web](https://thenextweb.com/news/lovable-vibe-coding-security-crisis-exposed))
- 보안 업체 RedAccess는 2026년 5월 Lovable, Replit, Netlify, Base44 등으로 만든 공개 자산 약 38만 개를 찾았고, 그중 약 5,000개가 의료 기록이나 재무 문서 같은 민감 정보를 노출했다고 밝혔다. 여러 플랫폼이 공개를 기본값으로 둔 것을 원인으로 꼽았다. ([HKU DPO](https://dpo.hku.hk/news/thousands-of-ai-%E2%80%98vibe-coding%E2%80%99-apps-may-expose-sensitive-medical%2C-business-data))

흔한 결함은 인증 없는 API, 행 단위 보안(RLS)이 꺼진 DB 쿼리, 클라이언트 코드에 박힌 API 키다. 취약 앱 비율은 조사마다 방법이 달라 수치를 인용하기보다 패턴을 적는 편이 안전하다.

### 정가와 실제 비용의 차이

2026년에 대부분의 툴이 사용량 기반 과금으로 옮겨 갔다. Copilot은 6월부터 AI Credits를 쓰고, Codex는 4월부터 크레딧·토큰 소비로 계산된다고 보도됐다. Cursor는 외부 모델을 API 정가로 받고, Bolt는 토큰, Replit은 작업량 기반 크레딧을 쓴다. 그래서 표의 월 요금은 시작 가격일 뿐이다. 에이전트를 매일 쓰면 개발자 한 명당 월 $60~200 정도 든다는 추정이 있다. ([daily.dev](https://daily.dev/blog/ai-coding-tools-cost-cursor-vs-copilot-vs-claude-code-pricing/)) CSV 요금 칸에 "사용량 추가 과금 있음" 여부를 함께 적는 것을 제안한다.

### 국내 현황

세 조사 모두 "한국 내 사용률은 평가하지 않았다"고 적었다. 이번 검색에서도 국내 개발자를 대상으로 한 2026년 바이브코딩 툴 사용 설문은 찾지 못했다. 참고할 만한 국내 자료로는 크몽의 발표가 있다. 바이브코딩으로 만든 결과물을 전문 개발자에게 맡기는 후속 개발 문의가 2026년 1분기에 직전 분기보다 2배 이상, 2분기에 다시 약 200% 늘었고, 배포·출시 문의가 가장 많았다. ([테크월드](https://www.epnc.co.kr/news/articleView.html?idxno=407590)) 앱 빌더로 시작한 프로젝트가 배포 단계에서 막힌다는 근거로 쓸 수 있다.

## 확인하지 못한 것

- Codex와 Antigravity의 요금은 3자 자료에만 기댔다. OpenAI와 Google의 공식 요금 페이지를 열어 확인해야 한다.
- Lovable의 유료 요금은 공식 페이지에서 가격이 읽히지 않았다.
- Cursor 인수 완료일(8월 14일 또는 15일)이 출처마다 다르다.
- Trae, Emergent, Rork, Anything의 사용 규모와 최근 업데이트 여부는 확인하지 않았다.
