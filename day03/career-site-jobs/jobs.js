// 커리어 길잡이 — 가상 채용 공고 20개. 회사 이름도 모두 지어낸 것입니다.
// <script src="jobs.js"></script> 로 불러 쓰면 window.JOBS 에 들어 있어요.
// role: 개발 / 디자인 / PO / 마케팅    level: 신입 / 경력 1~3년    aiPreferred: AI 활용 우대 여부
window.JOBS = [
  { id: "J01", company: "클래스로", title: "프론트엔드 개발자 (예약·결제 화면)", role: "개발", level: "경력 1~3년", location: "서울 성수", aiPreferred: true, deadline: "2026-10-31", tags: ["React", "테스트"] },
  { id: "J02", company: "누리핏", title: "주니어 백엔드 개발자", role: "개발", level: "신입", location: "서울 강남", aiPreferred: false, deadline: "2026-11-15", tags: ["API", "DB"] },
  { id: "J03", company: "온담케어", title: "웹 개발자 (사내 도구 자동화)", role: "개발", level: "신입", location: "경기 판교", aiPreferred: true, deadline: "2026-11-07", tags: ["자동화", "Python"] },
  { id: "J04", company: "바람로지스", title: "데이터 개발자 (물류 대시보드)", role: "개발", level: "경력 1~3년", location: "부산", aiPreferred: true, deadline: "2026-11-20", tags: ["대시보드", "SQL"] },
  { id: "J05", company: "도토리랩", title: "모바일 앱 개발자", role: "개발", level: "신입", location: "원격", aiPreferred: false, deadline: "2026-12-01", tags: ["앱", "Flutter"] },
  { id: "J06", company: "클래스로", title: "프로덕트 디자이너 (디자인 시스템)", role: "디자인", level: "경력 1~3년", location: "서울 성수", aiPreferred: true, deadline: "2026-11-03", tags: ["디자인 시스템", "Figma"] },
  { id: "J07", company: "새싹커머스", title: "UX/UI 디자이너", role: "디자인", level: "신입", location: "서울 마포", aiPreferred: false, deadline: "2026-11-12", tags: ["사용성 테스트", "모바일"] },
  { id: "J08", company: "푸른책방", title: "웹 디자이너 (이벤트 페이지)", role: "디자인", level: "신입", location: "서울 종로", aiPreferred: true, deadline: "2026-10-28", tags: ["랜딩", "배너"] },
  { id: "J09", company: "누리핏", title: "BX 디자이너", role: "디자인", level: "경력 1~3년", location: "서울 강남", aiPreferred: false, deadline: "2026-11-25", tags: ["브랜딩"] },
  { id: "J10", company: "온담케어", title: "서비스 디자이너 (돌봄 앱)", role: "디자인", level: "신입", location: "경기 판교", aiPreferred: true, deadline: "2026-11-18", tags: ["리서치", "UX"] },
  { id: "J11", company: "도토리랩", title: "주니어 PO (결제 서비스)", role: "PO", level: "신입", location: "원격", aiPreferred: true, deadline: "2026-11-05", tags: ["PRD", "지표"] },
  { id: "J12", company: "바람로지스", title: "PM (화주용 견적 서비스)", role: "PO", level: "경력 1~3년", location: "부산", aiPreferred: true, deadline: "2026-11-22", tags: ["B2B", "무역"] },
  { id: "J13", company: "새싹커머스", title: "PO (주문·배송 경험)", role: "PO", level: "경력 1~3년", location: "서울 마포", aiPreferred: false, deadline: "2026-12-05", tags: ["커머스", "데이터"] },
  { id: "J14", company: "클래스로", title: "주니어 PM (예약 전환율 개선)", role: "PO", level: "신입", location: "서울 성수", aiPreferred: true, deadline: "2026-10-30", tags: ["A/B 테스트", "VOC"] },
  { id: "J15", company: "푸른책방", title: "서비스 기획자", role: "PO", level: "신입", location: "서울 종로", aiPreferred: false, deadline: "2026-11-28", tags: ["기획서", "와이어프레임"] },
  { id: "J16", company: "클래스로", title: "퍼포먼스 마케터", role: "마케팅", level: "경력 1~3년", location: "서울 성수", aiPreferred: true, deadline: "2026-11-02", tags: ["광고", "리포트 자동화"] },
  { id: "J17", company: "누리핏", title: "콘텐츠 마케터 (SNS)", role: "마케팅", level: "신입", location: "서울 강남", aiPreferred: true, deadline: "2026-11-10", tags: ["인스타그램", "카피"] },
  { id: "J18", company: "새싹커머스", title: "CRM 마케터", role: "마케팅", level: "경력 1~3년", location: "서울 마포", aiPreferred: false, deadline: "2026-11-30", tags: ["메시지", "세그먼트"] },
  { id: "J19", company: "도토리랩", title: "그로스 마케터", role: "마케팅", level: "신입", location: "원격", aiPreferred: true, deadline: "2026-11-14", tags: ["지표", "실험"] },
  { id: "J20", company: "온담케어", title: "브랜드 마케터", role: "마케팅", level: "신입", location: "경기 판교", aiPreferred: false, deadline: "2026-12-10", tags: ["브랜드", "캠페인"] }
];
