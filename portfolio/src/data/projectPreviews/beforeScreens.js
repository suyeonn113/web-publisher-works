import { getPublicAssetPath } from "../../utils/assetPaths";

export const projectBeforeScreens = {
  fragfarm: [
    {
      id: "main",
      label: "메인",
      title: "프래그팜 기존 메인 화면",
      src: getPublicAssetPath("images/projects/fragfarm/before-main.png"),
      alt: "프래그팜 기존 메인 화면",
      description:
        "리뉴얼 전 메인 화면을 기준으로 상품 탐색 구조와 정보 우선순위를 비교합니다.",
    },
  ],

  "seoul-youth-center": [
    {
      id: "main",
      label: "메인",
      title: "시립서울청소년센터 기존 메인 화면",
      src: getPublicAssetPath(
        "images/projects/seoul-youth-center/before-main.png",
      ),
      alt: "시립서울청소년센터 기존 메인 화면",
      description:
        "기존 메인 화면을 기준으로 프로그램 탐색과 신청 경로가 어떻게 분리되어 있었는지 비교합니다.",
    },
    {
      id: "program",
      label: "프로그램",
      title: "시립서울청소년센터 기존 프로그램 화면",
      src: getPublicAssetPath(
        "images/projects/seoul-youth-center/before-program.png",
      ),
      alt: "시립서울청소년센터 기존 프로그램 화면",
      description:
        "기존 프로그램 탐색 화면을 기준으로 목록 확인과 신청 진입 흐름을 비교합니다.",
    },
  ],
};

export const getProjectBeforeScreens = (projectId) =>
  projectBeforeScreens[projectId] ?? [];