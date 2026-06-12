import "./SeoulYouthCenterWireframes.scss";

const wireframeHighlights = [
  {
    title: "Main Structure",
    description:
      "퀵메뉴, 모집 중 프로그램, 맞춤 탐색, 일정, 공지, 활동사진, SNS의 배치 우선순위를 정리했습니다.",
  },
  {
    title: "Program Discovery",
    description:
      "모집 상태, 대상, 일정, 분야를 비교할 수 있는 프로그램 카드와 탐색 구조를 설계했습니다.",
  },
  {
    title: "Responsive Flow",
    description:
      "PC의 정보 흐름을 태블릿과 모바일 화면에 맞게 재배치하고, 모바일에서는 하단바와 세로 흐름을 중심으로 접근성을 유지했습니다.",
  },
  {
    title: "Component Planning",
    description:
      "필터, 버튼, 프로그램 카드, 일정, 게시판, SNS 카드 등 반복 UI를 공통 요소로 정리했습니다.",
  },
];

const responsiveWireframes = [
  {
    title: "PC",
    src: "/images/projects/seoul-youth-center/wireframe-main-pc.png",
    alt: "서울시립청소년센터 메인 PC 와이어프레임",
    note: "1440px 기준 메인 전체 프레임. 헤더, 비주얼, 퀵메뉴, 모집 중 프로그램, 맞춤 탐색, 일정, 공지, 활동사진, SNS, 푸터까지 포함",
  },
  {
    title: "Tablet",
    src: "/images/projects/seoul-youth-center/wireframe-main-tablet.png",
    alt: "서울시립청소년센터 메인 태블릿 와이어프레임",
    note: "태블릿 메인 전체 프레임. PC의 주요 정보 흐름이 태블릿 폭에서 어떻게 재배치되는지 보이도록 상단부터 SNS 영역까지 포함",
  },
  {
    title: "Mobile",
    src: "/images/projects/seoul-youth-center/wireframe-main-mobile.png",
    alt: "서울시립청소년센터 메인 모바일 와이어프레임",
    note: "모바일 메인 전체 프레임. 모바일 하단바, 퀵 접근, 프로그램 탐색, 공지/활동사진/SNS로 이어지는 세로 흐름이 보이도록 포함",
  },
];

const supportingWireframes = [
  {
    title: "Program Flow",
    src: "/images/projects/seoul-youth-center/wireframe-program-flow.png",
    alt: "프로그램 목록과 신청 흐름 와이어프레임",
    note: "프로그램 목록, 필터, 카드, 상세 정보, 신청 CTA가 한 흐름으로 보이도록 목록/상세/신청 화면을 묶어 크롭",
  },
  {
    title: "Common Components",
    src: "/images/projects/seoul-youth-center/wireframe-components.png",
    alt: "공통 컴포넌트 와이어프레임",
    note: "필터, 버튼, 프로그램 카드, 일정, 게시판, SNS 카드 등 반복 컴포넌트 묶음만 보이도록 크롭",
  },
];

const SeoulYouthCenterWireframes = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page seoul-youth-center__wireframes"
        aria-labelledby="seoul-youth-center-wireframes-title"
      >
        <header className="seoul-youth-center__wireframes-header">
          <p className="seoul-youth-center__wireframes-eyebrow">
            13. Wireframes
          </p>

          <h2 id="seoul-youth-center-wireframes-title">
            와이어프레임
          </h2>

          <p className="seoul-youth-center__wireframes-summary">
            정보 구조와 사용자 흐름을 바탕으로, 메인 화면과
            프로그램 탐색·신청 흐름을 중심으로 PC·태블릿·모바일
            와이어프레임을 설계했습니다. 이 단계에서는 시각 디자인보다
            콘텐츠 우선순위, 신청 진입점, 기기별 정보 흐름을 먼저
            검토했습니다.
          </p>
        </header>

        <div className="seoul-youth-center__wireframes-layout">
          <section className="seoul-youth-center__wireframes-responsive">
            <div className="seoul-youth-center__wireframes-section-heading">
              <p>Responsive Wireframe Set</p>
              <h3>메인 화면 반응형 구조</h3>
            </div>

            <div className="seoul-youth-center__wireframes-device-set">
              {responsiveWireframes.map(({ title, src, alt, note }) => (
                <figure key={title}>
                  {/* 이미지 가이드: {note}. 파일명은 {src.replace("/images/projects/seoul-youth-center/", "")}로 저장 */}
                  <img src={src} alt={alt} />
                  <figcaption>{title}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <aside className="seoul-youth-center__wireframes-highlights">
            <div className="seoul-youth-center__wireframes-section-heading">
              <p>Planning Points</p>
              <h3>와이어프레임 검토 기준</h3>
            </div>

            <ul>
              {wireframeHighlights.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="seoul-youth-center__wireframes-supporting">
          {supportingWireframes.map(({ title, src, alt, note }) => (
            <figure key={title}>
              {/* 이미지 가이드: {note}. 파일명은 {src.replace("/images/projects/seoul-youth-center/", "")}로 저장 */}
              <img src={src} alt={alt} />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>

        <footer className="seoul-youth-center__wireframes-insight">
          <p>Key Point</p>
          <strong>
            와이어프레임 단계에서 메인 화면의 정보 우선순위와
            반응형 흐름을 먼저 검증해, 사용자가 어떤 기기에서도
            프로그램을 찾고 신청으로 이동할 수 있는 구조를
            설계했습니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterWireframes;
