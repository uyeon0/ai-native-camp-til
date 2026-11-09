// 조별 AI 서비스 조사 중 내가 맡은 바이브 코딩 분야
const SERVICES = [
  {
    "name": "Claude Code",
    "category": "바이브 코딩",
    "summary": "터미널 중심 코딩 에이전트",
    "url": "https://claude.com",
    "price": "무료+유료",
    "pros": "Plan mode, Skill, Auto mode, Dispatch 제공",
    "cons": "사용량 한도가 빨리 소진된다는 불만이 반복됨",
    "useCases": "코딩 지식이 있는 사용자의 실무 개발·복잡한 시스템 구축과 유지보수",
    "reviews": [
      {
        "text": "코드 작업이 가장 깔끔함."
      }
    ]
  },
  {
    "name": "GitHub Copilot",
    "category": "바이브 코딩",
    "summary": "IDE와 GitHub에 걸친 코딩 지원·클라우드 에이전트",
    "url": "https://github.com/features/copilot",
    "price": "무료+유료",
    "pros": "- VS Code 에이전트 세션 병렬 실행이 가능함\n- Claude·GPT·Gemini 모델을 선택해서 사용할 수 있음",
    "cons": "에이전트 모드에서 크레딧이 빨리 소진된다는 불만",
    "useCases": "GitHub 기반 팀 개발, 이슈를 맡겨 PR로 받는 작업",
    "reviews": []
  },
  {
    "name": "OpenAI Codex",
    "category": "바이브 코딩",
    "summary": "CLI·IDE·앱·클라우드에서 작업하는 코딩 에이전트",
    "url": "https://chatgpt.com/codex",
    "price": "무료+유료",
    "pros": "GitHub·Slack 연동",
    "cons": "요청 범위를 넘어 수정하는 경우가 있다는 평가",
    "useCases": "반복적인 대량 리팩터링, ChatGPT 구독자",
    "reviews": [
      {
        "text": "비교적 꼼꼼하게 작업을 하지만 시간이 오래 걸리고 요청 범위를 넘어서 수정하는 경우가 종종 있음"
      }
    ]
  },
  {
    "name": "Lovable",
    "category": "바이브 코딩",
    "summary": "대화로 인증·DB를 포함한 풀스택 웹 앱 생성·수정·배포",
    "url": "https://lovable.dev",
    "price": "무료+유료",
    "pros": "비개발자도 React·Supabase 앱을 빠르게 제작",
    "cons": "보안 관련 취약점 이슈가 있었던 적이 있음",
    "useCases": "코딩 지식 없이 웹 서비스 MVP 제작",
    "reviews": [
      {
        "text": "claude code, codex와 비교했을 때 시간이 오래 걸림"
      }
    ]
  },
  {
    "name": "Bolt.new",
    "category": "바이브 코딩",
    "summary": "브라우저에서 앱을 생성하고 미리보며 수정할 수 있음",
    "url": "https://bolt.new",
    "price": "무료+유료",
    "pros": "빠른 미리보기와 배포",
    "cons": "토큰 소모가 크다는 불만",
    "useCases": "빠른 프로토타입·해커톤 데모·웹 서비스 MVP 제작",
    "reviews": [
      {
        "text": "뽀모도로 타이머 하나를 만들었더니 하루 토큰이 모두 소진됨. 실제로 토큰 소모가 큰 것 같음"
      }
    ]
  },
  {
    "name": "Replit Agent",
    "category": "바이브 코딩",
    "summary": "브라우저 클라우드 IDE에서 앱 제작·실행·배포",
    "url": "https://replit.com",
    "price": "무료+유료",
    "pros": "- 복잡한 백엔드에 강하다는 평가가 있음\n- 생성 뒤 코드 직접 수정이 편리함",
    "cons": "Replit DB·배포에 묶여 다른 곳으로 옮기기 번거로움",
    "useCases": "비개발자와 개발자의 협업에 좋음",
    "reviews": []
  }
];
