export const daisoMallPreview = {
  projectId: "daisomall",
  githubUrl:
    "https://github.com/suyeonn113/web-publisher-portfolio/tree/main/daisomall",
  defaultDevice: "mobile",
  visibleDevices: ["mobile", "tablet", "desktop"],
  devices: {
    mobile: {
      width: 390,
      frameHeight: 720,
    },
    tablet: {
      width: 768,
      frameHeight: 720,
    },
    desktop: {
      width: 1440,
      frameHeight: 900,
      maxShellHeight: 720,
    },
    wide: {
      width: 1920,
      frameHeight: 1080,
      maxShellHeight: 720,
    },
  },
  reviewSteps: [
    {
      id: "main",
      title: "메인 화면",
      path: "/",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["메인 배너", "카테고리/서비스 바로가기", "추천 상품 섹션"],
    },
    {
      id: "search",
      title: "검색",
      path: "/search",
      scroll: {
        mobile: 0,
        tablet: 0,
        desktop: 0,
      },
      features: ["검색 홈", "키워드/추천 상품", "검색 결과 정렬"],
    },
  ],
};
