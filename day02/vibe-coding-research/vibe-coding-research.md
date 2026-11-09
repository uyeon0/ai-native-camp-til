# 바이브코딩 툴 조사 통합본

**조사 기준:** 2026년 10월 15일. 아래 내용은 폴더의 세 조사 문서를 통합하고, 두 리뷰 문서가 공식 페이지로 확인한 정정·보강을 반영한 것이다. 요금은 같은 날 각 제품의 공식 요금 페이지에서 확인했다.

**선정 기준:** 본문은 많이 쓰는 툴 7개만 다룬다. 개발자용 툴(Claude Code, GitHub Copilot, OpenAI Codex, Cursor)은 세 설문의 사용률 기준이고, 앱 빌더(Lovable, Bolt.new, Replit Agent)는 설문 사용률이 없어 매출·사용자 수 기준이다. 두 그룹의 수치는 서로 비교할 수 없다. 나머지 툴은 [기타](#기타)에 남겼다.

**원본 표시:** [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md) · [Claude 리뷰](vibe-coding-research-review-claude.md) · [Codex 리뷰](vibe-coding-research-review-codex.md). 서로 다른 설문의 수치는 합치거나 순위처럼 비교하지 않았다. Stack Overflow 수치는 지난 1년간 사용한 도구에 대한 복수 응답(12,255명), JetBrains 수치는 전문 개발자의 업무 중 사용률, First Page Sage 수치는 주 사용 도구 응답이다. Stack Overflow 수치는 [설문 원문](https://survey.stackoverflow.co/2026/ai/data)과 일치함을 [Claude 리뷰](vibe-coding-research-review-claude.md)에서 확인했다.

## Claude Code

- **형태·기능:** Anthropic의 터미널 중심 코딩 에이전트이며 IDE와 연동된다. Gemini 조사는 코드 작성 전 논리를 검토하는 Plan mode, 반복 작업을 템플릿화하는 Skill, 장시간 작업하는 Auto mode와 PC 작업을 모바일로 이어받는 Dispatch를 강점으로 소개한다. Auto mode는 2026년 3월 24일 research preview로 나왔다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md) · [Claude 리뷰](vibe-coding-research-review-claude.md)
- **요금:** Claude 구독에 포함된다. Pro $20(연 결제 시 $17), Max $100부터, Team Standard $25/인. [공식 요금](https://claude.com/pricing)
- **사용 조사:** JetBrains 업무 사용률 39%로 조사 대상 중 1위. Pragmatic Engineer의 ‘가장 좋아하는 툴’ 응답은 46%로 1위. First Page Sage 주 사용 툴 응답은 29.4%. Codex 조사에 실린 Stack Overflow 사용 응답은 65.5%. 각 수치는 서로 다른 질문의 결과다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md)
- **추천 용도:** 코딩 지식이 있는 사용자의 실무 개발과 복잡한 시스템의 구축·유지보수. [Gemini 조사](vibe-coding-tools-gemini.md)
- **아쉬운 점:** 사용량 한도가 빨리 소진된다는 불만이 2026년 1월과 3월에 크게 나왔고, Anthropic이 3월 말 예상보다 빨리 소진된다고 인정했다. 5월에 5시간 한도를 두 배로 늘렸지만 주간 한도의 정확한 수치는 공개되지 않았다는 지적이 있다. [The Register](https://www.theregister.com/2026/03/31/anthropic_claude_code_limits/) · [DevClass](https://www.devclass.com/ai-ml/2026/04/01/anthropic-admits-claude-code-users-hitting-usage-limits-way-faster-than-expected/5213575) · [GitHub 이슈 #41930](https://github.com/anthropics/claude-code/issues/41930)

## GitHub Copilot

- **형태·기능:** IDE 확장과 GitHub·클라우드 에이전트에 걸친 코딩 지원. Claude 조사에 따르면 ‘coding agent’가 ‘cloud agent’로 개명됐고 VS Code에서 에이전트 세션 병렬 실행을 지원한다. Gemini 조사는 단일 구독에서 Claude·GPT·Gemini 모델을 선택하는 기능을 소개한다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md)
- **사용 조사:** JetBrains 업무 사용률 21%로 2위, First Page Sage 주 사용 툴 응답 22.7%, Codex 조사에 실린 Stack Overflow 사용 응답 58.7%. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md)
- **요금:** Free, Pro $10, Pro+ $39, Max $100. 2026년 6월 1일부터 채팅, 에이전트 모드, 코드 리뷰, 클라우드 에이전트, Copilot CLI가 GitHub AI Credits(1 크레딧 = $0.01)를 차감한다. 코드 자동 완성은 크레딧을 쓰지 않는다. [공식 요금](https://github.com/features/copilot/plans)
- **아쉬운 점:** AI Credits 도입 뒤 작업 비용을 미리 알기 어렵고 에이전트 모드·코드 리뷰에서 크레딧이 빨리 소진된다는 불만이 GitHub 커뮤니티에 여러 건 올라왔다. 에이전트 기능의 깊이는 Cursor에 못 미친다는 리뷰도 있다. [커뮤니티 #198015](https://github.com/orgs/community/discussions/198015) · [커뮤니티 #197557](https://github.com/orgs/community/discussions/197557) · [codemyspec 리뷰](https://codemyspec.com/blog/github-copilot-review-2026)
- **추천 용도:** 코드가 이미 GitHub에 있는 팀 개발, 이슈를 맡겨 브랜치와 PR로 돌려받는 작업, JetBrains·Visual Studio 등 여러 IDE를 쓰는 환경. SSO·감사 로그 같은 기업용 관리 기능도 장점으로 꼽힌다. 3자 리뷰 기준이다. [toolradar](https://toolradar.com/guides/best-ai-coding-agents-for-enterprise) · [capy.ai](https://capy.ai/articles/best-cloud-coding-agents-2026) · [aiagentrank](https://aiagentrank.io/blog/github-copilot-vs-cursor-2026)

## OpenAI Codex

- **형태·기능:** CLI·IDE·앱·클라우드에서 작업하는 코딩 에이전트. Gemini 조사는 ChatGPT 구독 포함과 GitHub·Slack 연동을 서술한다. Codex 데스크톱 앱은 2026년 2월 2일 macOS용으로 나왔고, 7월 9일 ChatGPT 데스크톱 앱 안에서 Codex를 별도 화면으로 제공하는 형태로 통합됐다. CLI는 10월 7일 `rust-v0.161.0`이 릴리스됐다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md) · [Claude 리뷰](vibe-coding-research-review-claude.md) · [Codex 리뷰](vibe-coding-research-review-codex.md)
- **요금:** ChatGPT 요금제에 포함된다. Free $0, Go $8, Plus $20, Pro $100·$200·$500, Business $25/인(연 결제 시 $20, 2인 이상). Plus는 5시간 단위 메시지 한도와 주간 한도가 있고, 한도를 넘으면 ChatGPT 크레딧으로 사용량을 늘린다. API 키로 쓰면 API 요금으로 과금된다. [공식 요금](https://learn.chatgpt.com/docs/pricing)
- **사용·현황:** JetBrains 업무 사용률은 2026년 1월 3%에서 16%로 상승. First Page Sage 주 사용 툴 응답 11.8%, Codex 조사에 실린 Stack Overflow 사용 응답 29.5%. Claude 조사는 6월 주간 개발자 500만 명 돌파를 기록했다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md)
- **아쉬운 점:** 클라우드 작업이 몇 분에서 30분까지 걸리고, 한 파일만 고쳐 달라고 해도 범위를 넓혀 수정하는 경우가 있다는 평가가 있다. 개인 블로그 리뷰 기준이다. [justinmckelvey](https://justinmckelvey.com/blog/openai-codex-review) · [superblocks](https://www.superblocks.com/blog/codex-vs-claude-code)
- **추천 용도:** 클라우드에서 여러 작업을 비동기·병렬로 맡기기, 반복적인 대량 리팩터링, 이미 ChatGPT를 구독하는 사용자. 블로그 비교 글 기준이다. [DataCamp](https://www.datacamp.com/blog/codex-vs-claude-code) · [mem0](https://mem0.ai/library/coding-agents/openai-codex-vs-claude-code-which-ai-coding-agent-wins-in-2026)

## Cursor

- **형태·기능:** VS Code 계열 AI IDE. Gemini 조사는 자체 모델 Composer 2, 프로젝트 전체 문맥을 고려한 여러 파일 수정, UI 요소를 클릭해 관련 코드만 바꾸는 디자인 모드를 소개한다. Claude 조사는 4월 2일 에이전트 중심 Cursor 3 출시와 이후 Cloud Agents 추가를 기록했다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md)
- **사용 조사:** JetBrains 업무 사용률은 1월 18%에서 12%로 하락. First Page Sage 주 사용 툴 응답 13.1%, Codex 조사에 실린 Stack Overflow 사용 응답 25.5%. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md)
- **인수:** SpaceX가 2026년 6월 16일 Cursor 운영사 Anysphere를 600억 달러에 인수한다고 발표했고 8월에 인수를 마쳤다. 완료일은 출처에 따라 8월 14일 또는 15일이다. Composer 2는 2026년 3월 19일 나온 자체 모델로, Cursor는 Moonshot AI의 Kimi K2.5를 기반으로 만들었다고 밝혔다. [Claude 리뷰](vibe-coding-research-review-claude.md)
- **요금:** 2026년 10월 12일 개편됐다. Free, Plus $8(Grok 모델만), Premium $30, Super $100, Ultra $200. Claude·GPT 같은 외부 모델은 구독료와 별도로 API 정가로 과금된다. 기존 $20 Pro는 신규 가입이 막혔다고 보도됐다. [공식 요금](https://cursor.com/pricing) · [Claude 리뷰](vibe-coding-research-review-claude.md)
- **추천 용도:** 코딩 지식이 있는 사용자의 실무 개발과 복잡한 시스템의 구축·유지보수. [Gemini 조사](vibe-coding-tools-gemini.md)

## Lovable

- **형태·강점:** 대화로 웹 앱을 만들고 수정·배포한다. Claude 조사는 인증과 DB를 포함한 풀스택 앱 생성 및 비개발자에게 쉽다는 평가를, Gemini 조사는 React 프론트엔드와 Supabase 백엔드를 단일 프롬프트로 만드는 기능을 소개한다. Gemini 조사에는 초기 GPT Engineer에서 발전했다는 설명과 하루 만에 라이브 앱을 출시할 수 있다는 평가도 있다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md)
- **현황·아쉬운 점:** Codex 조사는 2026년 10월 14일 제품 발표를 확인했다. Claude 조사는 Sacra의 2월 ARR 약 4억 달러 추정치와 보안 문제를 지적한 리뷰를 기록한다. ARR은 업체 확정치가 아닌 제3자 추정치다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md)
- **보안 사례:** Lovable에 호스팅된 앱 하나에서 취약점 16건이 발견돼 1만 8천 명 이상의 데이터가 노출됐다. 별도의 접근 제어(BOLA) 결함은 버그 바운티 신고가 처리되지 않아 48일 동안 열려 있었다. [The Register](https://www.theregister.com/2026/02/27/lovable_app_vulnerabilities) · [Claude 리뷰](vibe-coding-research-review-claude.md)
- **요금:** Free는 하루 빌드 크레딧 5개(월 최대 30개)와 월 Cloud 크레딧 20개. Pro $25부터, Business $50부터이며 크레딧 양에 따라 가격이 올라간다. 빌드 작업은 복잡도에 따라 0.5~1.7 크레딧, 플랜 모드는 메시지당 1 크레딧을 쓰고, 호스팅 트래픽과 앱 내장 AI 기능도 크레딧에서 차감된다. [공식 요금](https://lovable.dev/ko/pricing)
- **추천 용도:** 코딩 지식 없이 빠르게 웹 서비스 MVP를 만드는 기획자·창업자. [Gemini 조사](vibe-coding-tools-gemini.md)

## Bolt.new

- **형태·강점:** StackBlitz의 브라우저 기반 앱 생성 도구. Gemini 조사는 WebContainers 환경, 라이브 미리보기와 빠른 배포를 소개한다. Codex 조사에는 2026년 9월 Visual Edits 출시와 9월 29일 발표가 적혀 있다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md)
- **요금·아쉬운 점:** Free는 월 100만 토큰(하루 30만), Pro $25(월 1,000만 토큰부터), Teams $30/인. Claude 조사는 토큰 소모가 크다는 불만을 기록한다. [공식 요금](https://bolt.new/pricing) · [Claude 조사](vibe-coding-tools-claude.md)
- **현황·추천:** Claude 조사에는 2025년 12월 사용자 700만 명 이상, 2026년 5월 Google Stitch 제휴가 적혀 있다. 빠른 프로토타입, 해커톤·미팅 중 데모 URL 제작, 코딩 지식 없이 MVP 제작에 추천된다. [Claude 조사](vibe-coding-tools-claude.md) · [Gemini 조사](vibe-coding-tools-gemini.md)

## Replit Agent

- **형태·강점:** Replit의 클라우드 개발 환경에서 아이디어를 앱으로 만들고 실행·배포한다. Claude 조사는 복잡한 백엔드에 강하다는 평가를, Gemini 조사는 생성 후 클라우드 IDE에서 코드를 직접 수정하기 쉬워 비개발자와 개발자의 협업에 유리하다고 소개한다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md)
- **현황:** Claude 조사는 2026년 4월 ARR 약 5억 2,500만 달러 보도와 연말 10억 달러 목표를 기록한다. Codex 조사는 9월 Agent 관련 글과 10월 게시물을 확인했다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md)
- **요금:** Core $20(연 결제 시 $18), Pro $100(연 결제 시 $90). 작업량 기반 크레딧을 쓴다. [공식 요금](https://replit.com/pricing) · [Claude 리뷰](vibe-coding-research-review-claude.md)
- **아쉬운 점:** 작업량 기반 과금이라 작업이 끝나야 비용을 알 수 있고, Agent가 망가뜨린 것을 고치는 작업에도 크레딧이 차감된다는 불만이 반복된다. 지출 한도는 기본으로 꺼져 있다. Replit DB와 배포 기능에 묶여 다른 곳으로 옮기기 번거롭다는 평가도 있다. [eesel](https://www.eesel.ai/blog/replit-pricing) · [VibeAnswers](https://vibeanswers.com/replit/agent-charges-more-than-expected/) · [automationatlas](https://automationatlas.io/answers/replit-agent-review-2026/)

## 조사 자료의 해석 범위

- 개발자용 도구의 설문 사용률과 앱 빌더의 공식 업데이트는 측정 대상이 달라 하나의 인기 순위로 묶을 수 없다. 공식 업데이트는 운영 근거이지 사용량 근거가 아니다. [Codex 조사](vibe-coding-tools-codex.md)
- Claude 조사의 매출·사용자 수 상당수는 제3자 추정치다. 제품 성능, 비용 대비 가치, 한국 내 사용률을 평가한 자료로 해석하지 않는다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md)

## 기타

본문 선정에서 빠진 툴이다. Google Antigravity(Stack Overflow 16.0%)는 본문 다음 후보이고, OpenCode·JetBrains AI·Devin Desktop·Kiro는 사용률이 낮으며, Amp·Cline·Kilo Code·v0·Base44는 비교할 만한 사용량 근거가 부족하다. Gemini CLI·Gemini Code Assist·Roo Code·Amazon Q Developer·Aider는 종료되거나 다른 제품으로 전환됐다.

### Google Antigravity

- **형태·기능:** Google의 에이전트 우선 IDE·CLI. Gemini 조사는 2025년 11월 공개, 최대 5개 에이전트 병렬 실행, Gemini 3.1 Pro와 Claude Opus 4.6·GPT-OSS 등 외부 모델 사용을 소개한다. Claude 조사는 2026년 5월 19일 Google I/O에서 2.0과 CLI 발표를 기록했다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md)
- **확인 필요:** ‘최대 5개 에이전트 병렬 실행’은 리뷰 과정에서 출처를 찾지 못했다. 외부 모델 사용은 공식 요금 페이지에 ‘a variety of agent models’로만 적혀 있고, 무료 티어의 Claude Opus 4.6 사용이 2026년 11월 2일까지라는 3자 자료가 있다. [Claude 리뷰](vibe-coding-research-review-claude.md)
- **요금:** Claude 조사의 ‘공개 프리뷰 기간 무료’와 달리 지금은 정식 출시(Generally Available) 상태다. 개인 플랜은 $0이며 Tab 자동 완성과 Command 요청은 무제한, 에이전트 사용에는 주간 한도가 있다. Google AI Pro·Ultra 구독자는 한도가 늘고 AI 크레딧을 받지만 이 페이지에 가격은 없다. 기업용은 Google Cloud를 통해 $30/인부터이며 좌석료 없는 사용량 과금 플랜도 있다. [공식 요금](https://antigravity.google/pricing/)
- **사용 조사·추천:** Codex 조사에 실린 Stack Overflow 사용 응답은 16.0%. Gemini 조사는 코딩 지식이 있는 사용자의 실무 개발에 추천한다. [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md)
- **제품 전환:** Google은 개인용 Gemini CLI·Gemini Code Assist 사용자를 Antigravity로 전환한다고 발표했다. 기업용 Gemini CLI와 Gemini Code Assist는 계속 지원한다고 Codex 조사는 구분한다. [Codex 조사](vibe-coding-tools-codex.md)

### Devin Desktop (구 Windsurf)

- **형태·기능:** Cognition의 IDE·클라우드 에이전트·CLI 환경. 2026년 6월 Windsurf에서 이름을 바꿨으며, Gemini 조사는 자율형 에이전트 Devin의 추론 능력을 데스크톱 IDE에 가져온 점을 강점으로 소개한다. Claude 조사에는 Cascade가 7월 1일 지원 종료되고 Rust로 만든 Devin Local이 대체했다고 적혀 있다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md)
- **사용 조사:** Codex 조사에 실린 Stack Overflow 사용 응답 6.5%의 설문 항목명은 ‘Windsurf’다. Devin Desktop과 별도 제품으로 중복 집계하지 않는다. [Codex 조사](vibe-coding-tools-codex.md)
- **확인 필요:** Cognition의 Windsurf 인수 시점은 Claude 조사의 출처들에서 2025년 7월과 12월로 엇갈린다. Gemini 조사는 2025년 7월이라고 서술한다. [Claude 조사](vibe-coding-tools-claude.md) · [Gemini 조사](vibe-coding-tools-gemini.md)

### Kiro

- **형태·현황:** AWS의 스펙 중심 에이전트 IDE. Claude 조사는 Amazon Q Developer의 후속이며 Code OSS 기반이라고 소개한다. Codex 조사는 Stack Overflow의 IDE 정기 사용 항목 2.8%, 2026년 10월 공식 업데이트 지속을 적었다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md)
- **확인 필요:** 정식 출시일과 가격은 Claude 조사의 출처들에서 엇갈려 확정할 수 없다. [Claude 조사](vibe-coding-tools-claude.md)

### JetBrains AI·Junie

- **형태·현황:** JetBrains IDE의 AI 기능과 코딩 에이전트. Codex 조사에 실린 Stack Overflow 수치는 ‘JetBrains AI’ 항목 12.8%이며 Junie는 따로 집계되지 않았다. Codex 조사는 공식 Junie 베타 종료 발표를 참고 자료로 제시한다. [Codex 조사](vibe-coding-tools-codex.md) · [Claude 리뷰](vibe-coding-research-review-claude.md)

### Amp

- **형태·현황:** CLI 에이전트. Claude 조사는 2025년 12월 Sourcegraph에서 독립 회사로 분리됐다고 기록했다. 에디터 확장 지원 여부는 조사 출처들이 엇갈린다. [Claude 조사](vibe-coding-tools-claude.md)

### OpenCode

- **형태·현황:** 오픈소스 터미널 TUI 코딩 에이전트이며 Kilo Code의 기반. Codex 조사에 실린 Stack Overflow 사용 응답은 13.6%이며 2026년 10월 11일 릴리스를 확인했다. Claude 조사는 2026년 활동 데이터를 찾지 못했다고 적어 조사 범위가 다르다. 오픈소스 에이전트 범주에는 모델 API 비용을 내고 사용한다고 기록돼 있다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md)

### Cline

- **형태·현황:** Apache 2.0의 VS Code 확장으로, Claude 조사 시점에 개발이 이어지고 있다. 해당 문서의 오픈소스 에이전트 범주에는 모델 API 비용을 내고 사용한다고 기록돼 있다. [Claude 조사](vibe-coding-tools-claude.md)

### Kilo Code

- **형태·현황:** VS Code 확장. Roo Code 포크로 시작해 OpenCode 서버 기반으로 재구축했으며, 2026년 4월 2일 정식 출시하고 시드 투자 800만 달러를 받았다고 Claude 조사는 기록했다. 해당 문서의 오픈소스 에이전트 범주에는 모델 API 비용을 내고 사용한다고 적혀 있다. [Claude 조사](vibe-coding-tools-claude.md)

### v0 (Vercel)

- **형태·강점:** 프롬프트로 React/Next.js UI와 앱을 생성하고 미리 본다. Gemini 조사는 고품질 UI 컴포넌트를 빠르게 만드는 데 특화됐다고 소개한다. Claude 조사는 풀스택 지원이 Lovable·Replit보다 늦게 추가됐다고 적었다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md)
- **현황:** Codex 조사는 2026년 8월 새 v0 API와 9월 기능 업데이트를 확인했다. Gemini 조사는 노코드 웹 빌더 쪽으로 기능을 넓히고 있다고 적었다. [Codex 조사](vibe-coding-tools-codex.md) · [Gemini 조사](vibe-coding-tools-gemini.md)
- **요금:** Free(하루 7메시지), Plus $30/인, Business $100/인. [공식 요금](https://v0.app/pricing)

### Base44

- **형태·현황:** Wix의 노코드 앱 빌더. Claude 조사는 Wix가 2025년 6월 약 8,000만 달러에 인수했다고 기록한다. Sacra의 2026년 8월 추정치는 ARR 약 2억 달러와 사용자 약 1,000만 명이며, 같은 문서에는 Wix가 2025년 4분기 실적 발표에서 ARR 약 1억 달러를 직접 밝혔다고 구분돼 있다. 두 ARR 수치는 시점과 출처가 다르다. [Claude 조사](vibe-coding-tools-claude.md)
- **기능:** 2026년 8월 Branches와 Security Center를, 9월 기존 코드베이스를 연결해 여러 직군이 변경 사항을 풀 리퀘스트로 돌려보내는 Base Code를 발표했다. Lovable·Bolt.new·Replit Agent·v0와 함께 현재 운영 중인 앱 생성 도구로 비교할 수 있다. [Base44 공식 발표](https://base44.com/blog/explore/categories/announcements) · [Codex 리뷰](vibe-coding-research-review-codex.md)
- **보안 사례:** 보안 업체 RedAccess는 2026년 5월 Lovable, Replit, Netlify, Base44 등으로 만든 공개 자산 약 38만 개 중 약 5,000개가 의료 기록·재무 문서 같은 민감 정보를 노출했다고 밝혔다. 여러 플랫폼이 공개를 기본값으로 둔 것을 원인으로 꼽았다. [HKU DPO](https://dpo.hku.hk/news/thousands-of-ai-%E2%80%98vibe-coding%E2%80%99-apps-may-expose-sensitive-medical%2C-business-data) · [Claude 리뷰](vibe-coding-research-review-claude.md)
- **요금:** Free(월 25 메시지 크레딧), 연 결제 기준 Starter $16, Builder $40, Pro $80, Elite $160. [공식 요금](https://base44.com/pricing)

### Gemini CLI

- **전환 상태:** Claude 조사는 2026년 6월 18일 개인 사용자(무료·AI Pro·Ultra) 대상 서비스가 종료되고 Antigravity CLI로 이전했으며, 기업 라이선스·유료 API 키 사용자는 계속 이용할 수 있다고 기록했다. Codex 조사도 개인 사용자 전환과 기업용 지원 지속을 구분한다. 전체 제품이 종료됐다고 표현하지 않는다. [Claude 조사](vibe-coding-tools-claude.md) · [Codex 조사](vibe-coding-tools-codex.md)

### Gemini Code Assist

- **전환 상태:** Codex 조사에 따르면 Google은 개인 사용자를 Antigravity로 전환하고 기업용 Gemini Code Assist는 계속 지원한다고 발표했다. [Codex 조사](vibe-coding-tools-codex.md)

### Roo Code

- **제외 이유:** 2026년 5월 15일 확장·클라우드·라우터 서비스가 종료되고 저장소가 아카이브됐다. 설치본은 동작하지만 보안 패치와 새 모델 지원이 없다. Kilo Code는 Roo Code 포크로 시작했다. [Claude 조사](vibe-coding-tools-claude.md) · [Roo Code 종료 공지](https://github.com/RooCodeInc/Roo-Code-Docs/blob/main/docs/sunset.md) · [Codex 리뷰](vibe-coding-research-review-codex.md)

### Amazon Q Developer

- **제외 이유:** 2026년 5월 15일부터 신규 Q Developer 계정·구독 생성이 중단됐고, 2027년 4월 30일 **IDE 플러그인과 유료 구독**의 지원이 끝나며 Kiro가 대체한다. 기존 유료 구독에는 사용자를 추가할 수 있다. AWS Management Console, AWS 문서·모바일 앱, Slack·Teams 등에서 제공되는 Q Developer는 종료 대상이 아니다. [Claude 조사](vibe-coding-tools-claude.md) · [AWS 공식 발표](https://aws.amazon.com/blogs/devops/amazon-q-developer-end-of-support-announcement/) · [Codex 리뷰](vibe-coding-research-review-codex.md)

### Aider

- **제외 이유·확인 필요:** Claude 조사는 마지막 기능 릴리스가 2025년 8월 `v0.86.0`, 마지막 커밋이 2026년 5월 22일이라고 적었다. 유지보수 모드라는 평가는 출처 하나에 기댄 것이므로 GitHub 릴리스 기록 재확인이 필요하다고 명시했다. [Claude 조사](vibe-coding-tools-claude.md)
