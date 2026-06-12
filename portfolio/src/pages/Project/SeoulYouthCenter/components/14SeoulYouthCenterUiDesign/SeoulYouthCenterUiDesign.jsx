import "./SeoulYouthCenterUiDesign.scss";

const uiDesignFigmaUrl =
  "https://www.figma.com/design/iipzgdotDJzzW46sqkONIq/Responsive-Website-Renewal-Project---%EC%84%9C%EC%9A%B8%EC%8B%9C%EB%A6%BD%EC%B2%AD%EC%86%8C%EB%85%84%EC%84%BC%ED%84%B0-?node-id=465-2034&m=dev&t=o5twbfDtI8g3X7QH-1";

const uiHighlights = [
  {
    title: "Main Visual & Quick Access",
    description:
      "기관의 첫인상을 전달하는 비주얼 영역과 자주 찾는 기능을 모은 퀵메뉴를 함께 배치했습니다.",
  },
  {
    title: "Program Card UI",
    description:
      "모집 상태, 프로그램명, 기간, 대상, 태그를 카드 안에서 빠르게 확인하도록 구성했습니다.",
  },
  {
    title: "Personalized Search",
    description:
      "연령과 분야 기준 필터를 메인에 배치해 사용자가 자신에게 맞는 프로그램을 바로 탐색하도록 했습니다.",
  },
  {
    title: "Activity & Communication",
    description:
      "공지, 활동사진, SNS 콘텐츠를 메인 하단에 배치해 정보 확인과 홍보 흐름이 이어지도록 했습니다.",
  },
];

const responsiveMockups = [
  {
    title: "PC",
    src: "/images/projects/seoul-youth-center/ui-main-pc.png",
    alt: "서울시립청소년센터 메인 PC UI 디자인",
    note: "1440px 기준 메인 최종 UI 전체 프레임. 헤더, 비주얼, 퀵메뉴, 모집 중 프로그램, 맞춤 탐색, 일정, 공지, 활동사진, SNS, 푸터까지 포함",
  },
  {
    title: "Tablet",
    src: "/images/projects/seoul-youth-center/ui-main-tablet.png",
    alt: "서울시립청소년센터 메인 태블릿 UI 디자인",
    note: "태블릿 메인 최종 UI 전체 프레임. PC의 핵심 콘텐츠가 태블릿 화면에서 어떻게 재배치되는지 보이도록 전체 흐름 포함",
  },
  {
    title: "Mobile",
    src: "/images/projects/seoul-youth-center/ui-main-mobile.png",
    alt: "서울시립청소년센터 메인 모바일 UI 디자인",
    note: "모바일 메인 최종 UI 전체 프레임. 하단바, 퀵 접근, 프로그램 탐색, 활동사진/SNS까지 이어지는 세로 흐름 포함",
  },
];

const uiDetailImages = [
  {
    title: "Program Cards",
    src: "/images/projects/seoul-youth-center/ui-program-cards.png",
    alt: "모집 중 프로그램 카드 UI",
    note: "모집 중인 청소년 프로그램 카드 영역 크롭. 포스터, 접수 상태, 제목, 기간, 태그가 한 화면에 보이도록 포함",
  },
  {
    title: "Personalized Search",
    src: "/images/projects/seoul-youth-center/ui-personalized-search.png",
    alt: "나에게 맞는 프로그램 살펴보기 UI",
    note: "연령 기준과 분야 기준 필터, 청소년/평생교육 프로그램 결과 영역이 함께 보이도록 크롭",
  },
  {
    title: "Activity & SNS",
    src: "/images/projects/seoul-youth-center/ui-activity-sns.png",
    alt: "활동사진과 SNS UI",
    note: "활동사진 목록과 SNS 콘텐츠 영역을 함께 크롭. 참여 결과 확인과 외부 홍보 흐름이 보이도록 포함",
  },
];

const SeoulYouthCenterUiDesign = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__ui-design"
        aria-labelledby="seoul-youth-center-ui-design-title"
      >
        <header className="seoul-youth-center__ui-design-header">
          <div>
            <p className="seoul-youth-center__ui-design-eyebrow">
              14. UI Design
            </p>

            <h2 id="seoul-youth-center-ui-design-title">
              UI 디자인
            </h2>

            <p className="seoul-youth-center__ui-design-summary">
              와이어프레임에서 정리한 메인 접근 구조를 바탕으로,
              청소년센터의 밝고 친근한 이미지를 유지하면서 프로그램
              탐색과 신청 행동이 명확하게 드러나는 UI를 디자인했습니다.
              메인 화면에서는 퀵메뉴, 모집 중 프로그램, 맞춤 탐색,
              활동사진, SNS 콘텐츠가 각각의 역할을 가지도록 시각적
              위계를 정리했습니다.
            </p>
          </div>

          <a
            className="seoul-youth-center__ui-design-figma-link"
            href={uiDesignFigmaUrl}
            target="_blank"
            rel="noreferrer"
          >
            View UI Design in Figma
          </a>
        </header>

        <div className="seoul-youth-center__ui-design-layout">
          <section className="seoul-youth-center__ui-design-responsive">
            <div className="seoul-youth-center__ui-design-section-heading">
              <p>Responsive UI Mockups</p>
              <h3>메인 화면 디자인 시안</h3>
            </div>

            <div className="seoul-youth-center__ui-design-device-set">
              {responsiveMockups.map(({ title, src, alt, note }) => (
                <figure key={title}>
                  {/* 이미지 가이드: {note}. 파일명은 {src.replace("/images/projects/seoul-youth-center/", "")}로 저장 */}
                  <img src={src} alt={alt} />
                  <figcaption>{title}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <aside className="seoul-youth-center__ui-design-highlights">
            <div className="seoul-youth-center__ui-design-section-heading">
              <p>UI Points</p>
              <h3>디자인 적용 기준</h3>
            </div>

            <ul>
              {uiHighlights.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="seoul-youth-center__ui-design-details">
          {uiDetailImages.map(({ title, src, alt, note }) => (
            <figure key={title}>
              {/* 이미지 가이드: {note}. 파일명은 {src.replace("/images/projects/seoul-youth-center/", "")}로 저장 */}
              <img src={src} alt={alt} />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>

        <footer className="seoul-youth-center__ui-design-insight">
          <p>Key Point</p>
          <strong>
            UI 디자인 단계에서는 청소년센터의 밝은 분위기를
            유지하면서도, 프로그램 탐색과 신청 CTA가 묻히지 않도록
            정보 위계와 화면 흐름을 정리했습니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterUiDesign;
