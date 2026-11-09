# 바이브코딩 툴 현황 조사 (2026년 10월 기준)

2026년 10월 15일에 웹 검색으로 조사했다. 지금 널리 쓰이고 업데이트가 이어지는 툴만 목록에 넣었다. 지원이 끝났거나 개발이 사실상 멈춘 툴은 마지막 절에 따로 적었다.

자료 대부분은 업체 공식 발표가 아니라 리뷰·비교 사이트와 제3자 추정치다. 같은 설문 수치도 출처마다 다르게 인용되므로 수치는 대략적인 참고값으로 본다.

## 개발자용 에이전트·IDE

| 툴 | 형태 | 2026년 현황 |
|---|---|---|
| Claude Code (Anthropic) | 터미널 CLI, IDE 연동 | JetBrains 설문(2026년 5~7월, 1.5만 명 이상)에서 업무 사용률 39%로 1위. Pragmatic Engineer 설문에서 "가장 좋아하는 툴" 1위(46%) |
| OpenAI Codex | CLI, 클라우드 에이전트, 앱 | JetBrains 설문 사용률이 1월 3%에서 16%로 상승. 6월에 주간 개발자 500만 명 돌파. 데스크톱 앱은 7월 9일 ChatGPT 앱으로 통합. CLI는 10월 7일 rust-v0.161.0 릴리스 |
| Cursor (Anysphere) | AI IDE (VS Code 계열) | 4월 2일 에이전트 중심 UI인 Cursor 3 출시, 이후 Cloud Agents 추가. JetBrains 설문 사용률은 1월 18%에서 12%로 하락 |
| GitHub Copilot | IDE 확장, 클라우드 에이전트 | JetBrains 설문 사용률 21%로 2위. "coding agent"를 "cloud agent"로 개명. VS Code에서 에이전트 세션 병렬 실행 지원 |
| Google Antigravity (2.0, CLI) | 에이전트 IDE, CLI | 5월 19일 Google I/O에서 2.0과 Antigravity CLI 발표. 공개 프리뷰 기간 무료 |
| Devin Desktop (구 Windsurf, Cognition) | IDE, 클라우드 에이전트, CLI | 6월에 Windsurf에서 Devin Desktop으로 개명. 기존 에이전트 Cascade는 7월 1일 지원 종료, Rust로 새로 만든 Devin Local이 대체 |
| Kiro (AWS) | 스펙 중심 에이전트 IDE | Amazon Q Developer의 후속. Code OSS 기반 |
| Amp | CLI 에이전트 | 2025년 12월 Sourcegraph에서 독립 회사로 분리 |

설문마다 측정 대상이 다르다. JetBrains는 업무 사용률을, First Page Sage(2026년 8~9월, 2,350명)는 주 사용 툴을 물었다. First Page Sage 결과는 Claude Code 29.4%, GitHub Copilot 22.7%, Cursor 13.1%, Codex 11.8%다. 여러 출처에서 가장 일관되게 인용된 것은 JetBrains 수치다. Stack Overflow 2026 설문에서 Claude Code가 65.5%라는 수치도 돌지만, Stack Overflow 원문에서는 확인하지 못했다.

## 비개발자용 앱 빌더

| 툴 | 특징 | 2026년 현황 |
|---|---|---|
| Lovable | 설명만으로 인증·DB를 포함한 풀스택 앱 생성. 비개발자에게 가장 쉽다는 평 | Sacra 추정 ARR 약 4억 달러(2월). 보안 문제를 지적한 리뷰 있음 |
| Replit (Agent) | 브라우저에서 개발부터 배포까지 처리. 복잡한 백엔드에 강하다는 평 | 4월 기준 ARR 약 5억 2,500만 달러로 보도. 연말 10억 달러 목표 |
| Bolt.new (StackBlitz) | 브라우저 기반 빠른 프로토타이핑 | 사용자 700만 명 이상(2025년 12월). 토큰 소모가 크다는 불만이 많음. 5월에 Google Stitch와 제휴 |
| v0 (Vercel) | 프론트엔드, React/Next.js UI 생성 특화 | 풀스택 지원은 Lovable, Replit보다 늦게 추가됨 |
| Base44 (Wix) | 노코드 앱 빌더 | Wix가 2025년 6월 약 8,000만 달러에 인수. Sacra 추정 ARR 약 2억 달러, 사용자 약 1,000만 명(8월) |

ARR과 사용자 수는 대부분 Sacra 같은 제3자 추정치다. Base44는 Wix가 2025년 4분기 실적 발표에서 ARR 약 1억 달러라고 직접 밝혔다.

## 오픈소스 에이전트

모델 API 비용만 내면 쓸 수 있다.

| 툴 | 형태 | 2026년 현황 |
|---|---|---|
| Cline | VS Code 확장 | Apache 2.0. 계속 개발 중 |
| Kilo Code | VS Code 확장 | Roo Code 포크로 시작해 OpenCode 서버 기반으로 다시 만듦. 4월 2일 정식 출시. 시드 투자 800만 달러 |
| OpenCode | 터미널 TUI | Kilo Code의 기반. 2026년 활동 데이터는 찾지 못함 |

## 목록에서 뺀 툴

| 툴 | 이유 |
|---|---|
| Roo Code | 2026년 5월 15일 저장소 아카이브. 설치본은 동작하지만 보안 패치와 새 모델 지원이 없음 |
| Gemini CLI | 6월 18일 개인 사용자(무료, AI Pro, Ultra) 대상 서비스 종료. Antigravity CLI로 이전. 기업 라이선스와 유료 API 키 사용자만 계속 사용 가능 |
| Windsurf | Devin Desktop으로 개명해서 그 이름으로 목록에 넣음 |
| Amazon Q Developer | 5월 15일부터 신규 가입 중단, 2027년 4월 30일 지원 종료. Kiro가 대체 |
| Aider | 커밋은 이어지지만(마지막 2026년 5월 22일) 마지막 기능 릴리스가 2025년 8월 v0.86.0. 유지보수 모드로 보는 리뷰가 있음. 이 판단은 출처 하나에 기댄 것이라 GitHub 릴리스 기록으로 다시 확인해야 함 |

## 확인하지 못한 것

- Kiro의 정식 출시일과 가격: 출처마다 2026년 3월 GA, 5월 7일 해외 출시 등으로 다르다.
- Amp의 지원 플랫폼: 에디터 확장을 지원한다는 출처와 CLI만 있다는 출처(2026년 6월)가 엇갈린다.
- Cognition의 Windsurf 인수 시점: 2025년 7월 14일과 2025년 12월로 엇갈린다. 7월 쪽이 더 자세한 출처지만 1차 자료로 확인하지 않았다.

## 출처

- 종합 순위: [Zapier](https://zapier.com/blog/best-vibe-coding-tools/), [TechRadar](https://techradar.com/pro/best-vibe-coding-tools), [Superblocks](https://www.superblocks.com/blog/best-enterprise-vibe-coding-tools), [Morph](https://www.morphllm.com/best-vibe-coding-tools), [MakerKit](https://makerkit.dev/blog/saas/best-vibe-coding-tools), [DreamHost](https://www.dreamhost.com/blog/vibe-coding-tools/), [Replit](https://replit.com/discover/best-vibe-coding-tools)
- 개발자 설문: [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/ai-tooling-2026), [First Page Sage](https://firstpagesage.com/seo-blog/ai-coding-assistant-market-share), [Tech Insider](https://tech-insider.org/claude-code-vs-codex-vs-github-copilot-2026/), [Zylos](https://zylos.ai/research/2026-06-25-agentic-coding-tools-q2-2026-landscape/)
- 앱 빌더 비교: [Technically](https://technically.dev/posts/vibe-coding-tool-comparison), [Altar.io](https://altar.io/lovable-vs-bolt-vs-v0-vs-replit-vs-base44/)
- Codex: [Havoptic Codex CLI 2026년 10월](https://www.havoptic.com/releases/openai-codex/2026/10), [Codex CLI at One Year](https://codex.danielvaughan.com/2026/04/15/codex-cli-at-one-year-from-research-preview-to-3-million-users/)
- Cursor: [Cursor 3](https://medium.com/@tentenco/cursor-3-ships-an-agent-first-interface-heres-what-it-actually-changes-1f2bf8f383e2), [Havoptic Cursor 2026년 8월](https://www.havoptic.com/releases/cursor/2026/8)
- GitHub Copilot: [Visual Studio 4월 업데이트](https://github.blog/changelog/2026-04-30-github-copilot-in-visual-studio-april-update), [VS Code v1.109](https://github.blog/changelog/2026-02-04-github-copilot-in-visual-studio-code-v1-109-january-release/)
- Antigravity, Gemini CLI: [TechCrunch](https://techcrunch.com/2026/05/19/google-launches-antigravity-2-0-with-an-updated-desktop-app-and-cli-tool-at-io-2026/), [GitHub Discussion #27274](https://github.com/google-gemini/gemini-cli/discussions/27274), [The Register](https://www.theregister.com/ai-ml/2026/05/20/bye-bye-gemini-cli-google-nudges-devs-toward-antigravity/5243605)
- Devin Desktop: [Wikipedia Cognition AI](https://en.wikipedia.org/wiki/Cognition_AI), [Digital Applied](https://www.digitalapplied.com/blog/windsurf-becomes-devin-desktop-ide-migration-2026)
- Kiro: [Kiro 리뷰](https://www.gilricardo.com/blog/kiro-review-spec-driven-agentic-ide), [Q Developer에서 Kiro로](https://medium.com/@dguisinger/q-developer-to-kiro-what-to-expect-when-you-make-the-switch-20955bbea737)
- Amp: [Tessl](https://tessl.io/blog/sourcegraph-spins-out-ai-coding-agent-amp-as-a-standalone-company/), [LLM Reference](https://www.llmreference.com/agents/amp)
- 오픈소스: [The AI Agent Index](https://theaiagentindex.com/compare/roo-code-vs-kilo-code), [Kilo](https://kilo.ai/kilo-code/vs/roo-code), [rywalker Aider](https://rywalker.com/research/aider)
- Bolt.new: [ai.engineer](https://ai.engineer/orgs/bolt-new-stackblitz), [Neuronfeed](https://neuronfeed.com/reviews/bolt-new-review)
- 매출 추정: [Sacra Lovable](https://www.sacra.com/c/lovable), [Sacra Replit](https://sacra.com/research/replit-passes-500m-year/), [Sacra Base44](https://sacra.com/c/base44/), [MarketBeat Wix 4분기](https://www.marketbeat.com/instant-alerts/wixcom-q4-earnings-call-highlights-2026-03-04/?.tsrc=rss)
