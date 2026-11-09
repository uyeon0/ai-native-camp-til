# 바이브코딩 도구 조사 보완 제안

> 이 리뷰는 통합본의 이전 버전(22개 도구)과 조별 CSV를 대상으로 썼다. 지적 사항은 현재 통합본에 반영됐고, CSV는 이 레포에 없다.

**검토일:** 2026년 10월 15일  
**검토 대상:** [통합 조사](vibe-coding-research.md), 서비스 비교 CSV(`AI서비스조사.csv`)  
**검토 방식:** 두 파일의 구성과 빈칸을 대조하고, 변경 가능성이 큰 제품 상태는 공식 발표·문서로 확인했다. 원본 파일은 수정하지 않았다.

## 총평

통합 조사는 22개 도구의 기능과 현황을 폭넓게 모았고, Stack Overflow·JetBrains·First Page Sage의 서로 다른 질문을 한 순위로 합치지 않은 점이 좋다. 종료 또는 전환된 제품도 별도 항목으로 밝혀두었다. 다만 **현재 많이 쓰는 도구를 고르는 본문**과 **종료·전환 이력**이 섞여 있고, CSV에는 비교 판단에 필요한 출처·기준일이 없다. 다음 항목부터 보완하면 조사 결과를 재사용하기 쉬워진다.

## 먼저 바로잡을 내용

| 우선순위 | 위치 | 보완 제안 | 확인 근거 |
| --- | --- | --- | --- |
| 높음 | 통합 조사·CSV의 Amazon Q Developer | “2027년 4월 30일 지원 종료”의 대상을 **Amazon Q Developer IDE 플러그인과 유료 구독**으로 명시한다. AWS Management Console, AWS 문서·모바일 앱, Slack·Teams 등에서 제공되는 Q Developer까지 전부 종료되는 것은 아니다. 신규 Q Developer 계정·구독 생성은 2026년 5월 15일부터 중단됐지만 기존 유료 구독에는 사용자를 추가할 수 있다. | [AWS 공식 발표](https://aws.amazon.com/blogs/devops/amazon-q-developer-end-of-support-announcement/), [AWS 설명서](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-developer-ide-end-of-support.html) |
| 높음 | 통합 조사의 Codex 설명 | “2026년 7월 9일 데스크톱 앱의 ChatGPT 앱 통합”은 무엇이 통합됐는지 불분명하다. 현재 공식 도움말의 표현인 **“ChatGPT 데스크톱 앱에서 Codex를 별도 화면으로 제공”**으로 정리하고, 7월 9일의 근거가 앱 디렉터리의 플러그인 디렉터리 이전을 뜻하는지 원문을 다시 확인한다. | [Codex 이용 안내](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan), [ChatGPT Work와 Codex 안내](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex), [앱 디렉터리 변경 안내](https://help.openai.com/en/articles/11487775-apps-in-chatgpt) |
| 중간 | 통합 조사의 Roo Code | 현재 목록에서 제외한 판단은 타당하다. 근거를 “유지보수 부재”보다 명확한 **2026년 5월 15일 확장·클라우드·라우터 종료 및 저장소 아카이브**로 적는다. | [Roo Code 종료 공지](https://github.com/RooCodeInc/Roo-Code-Docs/blob/main/docs/sunset.md), [저장소](https://github.com/RooCodeInc/Roo-Code) |
| 중간 | 통합 조사·CSV의 Gemini CLI 및 Gemini Code Assist | “개인용 전환, 기업용 지원 지속” 구분은 유지한다. 제품 상태 열을 만든다면 **개인용 전환 / 기업용 계속 지원**으로 표시해 전체 종료로 오해하지 않게 한다. | [Google 공식 발표](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/) |

## 조사 내용에 추가할 것

### 1. Base44를 앱 생성 도구 비교에 포함

통합 조사와 CSV의 Base44 항목은 소유 회사와 매출 추정치 중심이다. 2026년 9월 Base44는 기존 코드베이스를 연결해 여러 직군이 변경 사항을 풀 리퀘스트로 돌려보내는 **Base Code**를 발표했고, 8월에는 Branches와 Security Center를 발표했다. 따라서 Lovable·Bolt.new·Replit Agent·v0 옆에 **현재 운영 중인 앱 생성 도구**로 놓고 기능과 대상 사용자를 비교할 근거가 있다. 다만 공식 업데이트만으로 이들 사이의 사용량 순위를 매기지는 않는다. [Base44 공식 발표 목록](https://base44.com/blog/explore/categories/announcements)

### 2. 도구를 사용 흐름에 따라 나누기

현재 문서는 도구별 설명을 연속으로 배치한다. 앞부분에 다음 세 묶음의 짧은 안내를 두면 독자가 자신에게 필요한 목록을 빠르게 찾을 수 있다.

| 사용 흐름 | 해당 도구 예시 | 비교할 질문 |
| --- | --- | --- |
| 기존 저장소에서 개발 | Claude Code, Codex, Cursor, Copilot, Antigravity, OpenCode, JetBrains AI·Junie, Devin Desktop, Kiro | 기존 코드 이해, 테스트 실행, 변경 검토, 팀 협업 |
| 자연어로 새 앱 제작 | Lovable, Bolt.new, Replit Agent, v0, Base44 | 인증·DB·배포, 생성 코드 접근, GitHub 연결, 수정 방식 |
| 전환 또는 종료 이력 | Gemini CLI·Code Assist 개인용, Amazon Q Developer IDE 플러그인, Roo Code, Aider(재확인 필요) | 신규 가입 가능 여부, 지원 종료 범위, 대체 제품 |

이는 제품의 우열 순위가 아니라 **비교 대상을 고르는 분류**다. 특히 Devin Desktop은 Windsurf의 새 이름이므로 별도 제품으로 세지 않는다. [Cognition 공식 발표](https://cognition.com/blog/introducing-devin-desktop)

### 3. “많이 사용된다”의 근거를 한눈에 제시

도구별 본문 앞에 **조사명·질문·표본·조사 기간·수치**를 모은 작은 표를 둔다. 예를 들어 Stack Overflow의 Claude Code 65.5%는 코딩 에이전트·도우미 응답자 12,255명의 **지난 1년 사용 경험, 복수 응답**이고, JetBrains의 39%는 전문 개발자의 **2026년 5~7월 업무 중 사용률**이다. 둘의 수치를 이어 붙여 추세로 읽을 수 없다. 앱 빌더에는 같은 방식의 비교 가능한 사용률을 확보하지 못했다고 명시한다. [Stack Overflow 2026 설문](https://survey.stackoverflow.co/2026/ai/data), [JetBrains 2026 조사와 방법론](https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/)

### 4. 추천 용도의 판단 근거를 붙이기

“복잡한 백엔드에 강함”, “비개발자에게 쉬움”, “토큰 소모가 큼” 같은 문장은 현재 통합 조사에서 원본 에이전트의 평가·리뷰 요약으로 제시된다. 최종 비교표에서는 **공식 기능**, **사용자 평가**, **직접 테스트 결과**를 구분하면 좋다. 추천 용도에는 해당 기능 또는 관찰 근거와 평가 시점을 함께 적는다. 특히 성능·비용에 대한 단정은 동일한 과제로 직접 시험하기 전까지 평가 의견으로 표시한다.

## CSV 보완 제안

CSV에는 22개 제품 행이 있다. 현재 **주소 18개, 요금 16개, 장점 7개, 아쉬운 점 11개, 추천 용도 15개**가 비어 있다. 원본을 무작정 채우기보다 아래 순서로 정리하는 편이 좋다.

1. **상태와 제품명:** `현재 사용 가능 / 이름 변경 / 일부 채널 종료 예정 / 종료 / 추가 확인`을 구분한다. `현재 이름`과 `이전 이름`을 별도 열로 두면 Windsurf·Devin Desktop처럼 중복 집계를 막을 수 있다.
2. **근거의 출처:** `공식 URL`, `최근 확인일`, `사용량 근거`, `사용량 지표의 뜻`, `평가 출처`를 추가한다. 현재 주소 열은 4개만 채워져 있으며, 그 4개도 대부분 제품 첫 화면이다. 기능·요금·종료 근거에는 해당 내용을 직접 설명하는 페이지가 필요하다.
3. **요금의 범위:** 단순히 “무료” 또는 “구독 포함”이라고 쓰기보다 무료 범위, 유료 구독 여부, 사용량 과금 여부와 **확인일**을 함께 기록한다. 요금과 한도는 자주 바뀌므로 미확인 칸은 추정으로 메우지 않는다. Codex도 ChatGPT 요금제에 포함되지만 클라우드 기능의 이용 자격은 요금제와 설정에 따라 다르다. [OpenAI 공식 안내](https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan)
4. **추천 용도의 일관성:** 현재 22개 중 15개가 비어 있다. 각 도구에 같은 질문을 적용한다. 예: `기존 저장소 수정`, `새 웹 앱 생성`, `팀 협업`, `UI 제작`, `배포까지 완결` 중 실제로 근거가 확인된 용도만 적는다.
5. **종료 제품 분리:** Roo Code 등은 역사·전환 참고자료로 남기되, 현재 사용 도구를 고르는 CSV 보기에서는 상태로 필터링할 수 있게 한다.

### 직접 비교를 한다면

같은 작은 과제 하나를 정해 각 도구에서 **첫 실행까지 걸린 시간, 요청 횟수·사용량, 수정 성공 여부, 생성 코드 접근, GitHub 내보내기, 배포, 인증·DB 설정, 테스트·검토 편의성**을 기록한다. 이는 새 실험 제안이며, 현재 조사 문서가 이미 검증한 성능 결과는 아니다. 도구 특성상 기존 저장소용 에이전트와 브라우저 앱 빌더는 같은 점수표로 순위를 매기기보다 과제를 따로 설계해야 한다.

## 우선 적용 순서

1. Amazon Q Developer의 지원 종료 범위를 고치고 Codex의 앱 통합 표현을 확인한다.
2. CSV에 상태·공식 근거 URL·확인일을 추가하고, 종료 제품을 현행 도구 보기에서 분리한다.
3. Base44를 앱 생성 도구 비교에 포함하고, 비교 가능한 사용량 자료가 없는 영역을 표시한다.
4. 추천·장단점 문장을 근거 유형에 따라 구분한다. 가격과 사용 한도는 해당 시점의 공식 페이지를 확인한 뒤 채운다.
