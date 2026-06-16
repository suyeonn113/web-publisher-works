import "./SeoulYouthCenterResponsiveAccessibility.scss";
import { getPublicAssetPath } from "../../../../../utils/assetPaths";

const responsiveScreens = [
  {
    title: "PC",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/development-main-pc.png",
    ),
    alt: "PC 반응형 구현 화면",
    note: "PC 기준 실제 구현 화면. 메인 또는 프로그램 화면에서 넓은 화면의 카드/목록 병렬 배치가 보이도록 캡쳐",
  },
  {
    title: "Tablet",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/development-main-tablet.png",
    ),
    alt: "태블릿 반응형 구현 화면",
    note: "태블릿 기준 실제 구현 화면. PC의 정보 흐름이 태블릿 폭에서 컬럼 수를 줄여 재배치되는 모습이 보이도록 캡쳐",
  },
  {
    title: "Mobile",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/development-main-mobile.png",
    ),
    alt: "모바일 반응형 구현 화면",
    note: "모바일 기준 실제 구현 화면. 세로형 카드 흐름과 주요 접근 요소가 보이도록 캡쳐",
  },
];

const implementationPoints = [
  {
    title: "반응형 분기점",
    description: "화면 폭에 따라 섹션 배치와 카드 컬럼 수를 조정",
  },
  {
    title: "모바일 하단바",
    description: "모바일에서 주요 메뉴와 신청 흐름에 빠르게 접근하도록 하단바 제공",
  },
  {
    title: "가독성 높은 카드",
    description: "프로그램명, 기간, 상태, 태그가 작은 화면에서도 읽히도록 카드 구조 정리",
  },
  {
    title: "터치 영역 최적화",
    description: "버튼, 필터, 슬라이더 조작 요소를 터치 환경에 맞게 구성",
  },
];

const SeoulYouthCenterResponsiveAccessibility = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__responsive-accessibility"
        aria-labelledby="seoul-youth-center-responsive-accessibility-title"
      >
        <header className="seoul-youth-center__responsive-accessibility-header">
          <p className="seoul-youth-center__responsive-accessibility-eyebrow">
            18. Responsive &amp; Accessibility Implementation
          </p>

          <h2 id="seoul-youth-center-responsive-accessibility-title">
            반응형 및 웹 접근성 구현
          </h2>

          <p className="seoul-youth-center__responsive-accessibility-summary">
            기존 PC 중심 화면을 단순히 축소하지 않고, PC·태블릿·
            모바일 환경에 맞게 콘텐츠 배치와 탐색 방식을 조정했습니다. <br />
            특히 모바일에서는 하단바와 세로형 카드 흐름을 중심으로
            프로그램 탐색과 신청 접근성을 유지했습니다.
          </p>
        </header>

        <div className="seoul-youth-center__responsive-accessibility-layout">
          <section className="seoul-youth-center__responsive-accessibility-screens">
            <div className="seoul-youth-center__responsive-accessibility-section-heading">
              <p>Responsive Screens</p>
              <h3>기기별 구현 화면</h3>
            </div>

            <div className="seoul-youth-center__responsive-accessibility-device-set">
              {responsiveScreens.map(({ title, src, alt, note }) => (
                <figure key={title}>
                  {/* 이미지 가이드: {note}. 파일명은 {src.replace("/images/projects/seoul-youth-center/", "")}로 저장 */}
                  <img src={src} alt={alt} />
                  <figcaption>{title}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <aside className="seoul-youth-center__responsive-accessibility-mobile">
            <img
              src={getPublicAssetPath(
                "images/projects/seoul-youth-center/development-main-mobile-2.png",
              )}
              alt="모바일 하단바 구현 화면"
            />
          </aside>
        </div>

        <ul className="seoul-youth-center__responsive-accessibility-points">
          {implementationPoints.map(({ title, description }) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SeoulYouthCenterResponsiveAccessibility;
