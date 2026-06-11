import "./SeoulYouthCenterSiteAnalysisInformationFlow.scss";

const informationFlowFindings = [
  {
    number: "01",
    title: "Structure",
    description:
      "메뉴와 콘텐츠 분류 기준이 명확하지 않아 사용자가 원하는 정보를 예측하기 어렵습니다.",
  },
  {
    number: "02",
    title: "Priority",
    description:
      "상시 정보와 시의성 콘텐츠가 섞여 핵심 프로그램과 혜택의 주목도가 낮아집니다.",
  },
  {
    number: "03",
    title: "Conversion",
    description:
      "프로그램 탐색 이후 상세 확인과 신청으로 이어지는 행동 경로가 충분히 강조되지 않습니다.",
  },
];

const SeoulYouthCenterSiteAnalysisInformationFlow = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page seoul-youth-center__site-analysis-information-flow"
        aria-labelledby="seoul-youth-center-site-analysis-information-flow-title"
      >
        <header className="seoul-youth-center__site-analysis-information-flow-header">
          <p className="seoul-youth-center__site-analysis-information-flow-eyebrow">
            05. Existing Site Analysis
          </p>

          <h2 id="seoul-youth-center-site-analysis-information-flow-title">
            Information Flow
          </h2>

          <p className="seoul-youth-center__site-analysis-information-flow-summary">
            프로그램, 공지, 배너, SNS 콘텐츠가 한 화면에 혼재되어
            핵심 정보의 우선순위가 약해지고 활동 참여로 이어지는
            흐름이 분산되었습니다.
          </p>
        </header>

        <div className="seoul-youth-center__site-analysis-information-flow-layout">
          {/* Capture guide: desktop main page showing banner, notices, SNS, and quick links competing in one view. */}
          <figure
            className="seoul-youth-center__site-analysis-information-flow-media"
            aria-label="기존 홈페이지 데스크톱 화면 캡쳐 영역"
          />

          <div className="seoul-youth-center__site-analysis-information-flow-copy">
            <ol className="seoul-youth-center__site-analysis-information-flow-list">
              {informationFlowFindings.map(
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

        <footer className="seoul-youth-center__site-analysis-information-flow-finding">
          <p>Key Finding</p>
          <strong>
            정보 구조와 참여 흐름을 함께 정리해야 홈페이지가 단순
            안내 채널을 넘어 청소년 활동 참여의 시작점이 될 수
            있습니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterSiteAnalysisInformationFlow;
