
export const projects = [
  {
    // 기본 정보
    id: "seoul-youth-center",
    slug: "seoul-youth-center",
    title: "시립서울청소년센터",
    englishTitle: "Seoul Youth Center",
    projectName: "시립서울청소년센터 웹사이트 리뉴얼",
    summary: "청소년 프로그램 참여를 잇는 통합 허브",

    // 분류
    detailType: "case-study",
    workType: "personal",
    siteType: "public-website",

    // 프로젝트 정보
    period: {
      start: "2026-03",
      end: "2026-04",
    },

    contribution: 100,

    target: [
      "청소년",
      "보호자",
      "청소년 프로그램 이용자",
    ],

    objective:
      "청소년이 자신에게 맞는 프로그램을 쉽게 탐색하고 신청까지 이어갈 수 있는 통합 허브 구축",

    scope: [
      "메인 페이지",
      "프로그램 탐색 및 상세",
      "프로그램 신청",
      "게시판",
      "반응형 내비게이션",
    ],

    // 링크
    liveUrl:
      "https://suyeonn.dothome.co.kr/seoul-youth-center/index.php",
    githubUrl:
      "https://github.com/suyeonn113/web-publisher-portfolio/tree/main/seoul-youth-center",

    // 노출 설정
    featured: true,
    visible: true,
    order: 1,

    // 복수 정보
    platforms: ["responsive"],

    responsibilities: [
      "planning",
      "ui-design",
      "publishing",
      "frontend",
    ],

    tech: [
      "figma",
      "html",
      "scss",
      "javascript",
      "php",
      "mysql",
    ],

    tags: [
      "planning",
      "accessibility",
      "responsive",
    ],
  },
];

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);