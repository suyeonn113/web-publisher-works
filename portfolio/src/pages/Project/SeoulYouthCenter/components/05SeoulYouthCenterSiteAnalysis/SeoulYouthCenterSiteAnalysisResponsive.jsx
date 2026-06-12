import "./SeoulYouthCenterSiteAnalysisResponsive.scss";

const responsiveFindings = [
  {
    number: "01",
    title: "Layout",
    description:
      "PC 중심의 고정형 화면 구조로 작은 화면에서 콘텐츠가 과밀하게 노출됩니다.",
  },
  {
    number: "02",
    title: "Readability",
    description:
      "텍스트와 버튼 크기가 작아 프로그램 정보 확인과 터치 조작이 어렵습니다.",
  },
  {
    number: "03",
    title: "Access",
    description:
      "주요 메뉴와 신청 경로가 작은 화면에서 직관적으로 드러나지 않습니다.",
  },
];

const SeoulYouthCenterSiteAnalysisResponsive = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__site-analysis-responsive"
        aria-labelledby="seoul-youth-center-site-analysis-responsive-title"
      >
        <header className="seoul-youth-center__site-analysis-responsive-header">
          <p className="seoul-youth-center__site-analysis-responsive-eyebrow">
            05. Existing Site Analysis
          </p>

          <h2 id="seoul-youth-center-site-analysis-responsive-title">
            반응형 격차 분석
          </h2>

          <p className="seoul-youth-center__site-analysis-responsive-summary">
            기존 홈페이지는 PC 화면을 축소해 보여주는 방식에 가까워
            모바일과 태블릿 환경에서 정보 확인과 조작 부담이
            컸습니다.
          </p>
        </header>

        <div className="seoul-youth-center__site-analysis-responsive-layout">
          <figure
            className="seoul-youth-center__site-analysis-responsive-media"
            aria-label="기존 홈페이지 모바일 화면 캡쳐 영역"
          >
            {/* 이미지 가이드: 기존 사이트를 모바일 또는 태블릿 폭에서 확인한 화면 캡쳐. PC 화면이 축소되어 보이거나 텍스트/버튼이 작아지는 문제가 드러나도록 세로형 9:16 비율 권장. 파일명은 existing-responsive-gap-mobile.png로 저장 */}
            <img
              src="/images/projects/seoul-youth-center/existing-responsive-gap-mobile.png"
              alt="기존 홈페이지 모바일 화면에서 반응형 접근성이 부족한 모습"
            />
          </figure>

          <div className="seoul-youth-center__site-analysis-responsive-copy">
            <ol className="seoul-youth-center__site-analysis-responsive-list">
              {responsiveFindings.map(
                ({ number, title, description }) => (
                  <li key={number}>
                    <span>{number}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>

        <footer className="seoul-youth-center__site-analysis-responsive-finding">
          <p>Key Finding</p>
          <strong>
            반응형 접근성 개선은 청소년 사용자가 홈페이지를 통해
            정보를 얻고 활동 참여로 이동하기 위한 첫 번째 조건입니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterSiteAnalysisResponsive;
