import "./SeoulYouthCenterResearchBenchmarking.scss";

const researchCriteria = [
  {
    number: "01",
    title: "Responsive Access",
    description:
      "모바일과 태블릿에서도 화면과 기능이 안정적으로 제공되는가",
  },
  {
    number: "02",
    title: "Navigation Structure",
    description:
      "사용자가 원하는 메뉴와 정보를 예측 가능한 위치에서 찾을 수 있는가",
  },
  {
    number: "03",
    title: "Information Discovery",
    description:
      "프로그램, 공지, 혜택 등 주요 정보를 직관적으로 탐색할 수 있는가",
  },
  {
    number: "04",
    title: "Accessibility",
    description:
      "색 대비, 터치 영역, 텍스트 크기, 키보드 이동 등 접근성 기준을 고려하고 있는가",
  },
];

const benchmarkTargets = [
  {
    title: "Public Portal",
    items: "정부24, 서울특별시교육청, 서울시평생학습포털",
  },
  {
    title: "Youth Portal",
    items: "서울시청소년몽땅정보통",
  },
  {
    title: "Youth Facility",
    items: "과천청소년수련관, 마포청소년문화의집",
  },
];

const SeoulYouthCenterResearchBenchmarking = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page seoul-youth-center__research-benchmarking"
        aria-labelledby="seoul-youth-center-research-benchmarking-title"
      >
        <header className="seoul-youth-center__research-benchmarking-header">
          <p className="seoul-youth-center__research-benchmarking-eyebrow">
            06. Research &amp; Benchmarking
          </p>

          <h2 id="seoul-youth-center-research-benchmarking-title">
            Research &amp; Benchmarking
          </h2>

          <p className="seoul-youth-center__research-benchmarking-summary">
            기존 사이트 분석에서 도출한 문제를 기준으로 공공 포털과
            청소년 기관 웹사이트의 UX 구조를 비교했습니다.
          </p>
        </header>

        <div className="seoul-youth-center__research-benchmarking-layout">
          <div className="seoul-youth-center__research-benchmarking-criteria">
            <h3>Research Criteria</h3>

            <ol>
              {researchCriteria.map(
                ({ number, title, description }) => (
                  <li key={number}>
                    <span>{number}</span>
                    <div>
                      <strong>{title}</strong>
                      <p>{description}</p>
                    </div>
                  </li>
                ),
              )}
            </ol>
          </div>

          <div className="seoul-youth-center__research-benchmarking-targets">
            <h3>Benchmarking Targets</h3>

            <ul>
              {benchmarkTargets.map(({ title, items }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{items}</p>
                </li>
              ))}
            </ul>

            {/* 캡쳐 가이드: 정부24, 서울시교육청, 서울시청소년몽땅정보통, 청소년시설 사이트의 대표 화면을 작은 캡쳐 3~4개로 모아 배치 */}
            <figure
              className="seoul-youth-center__research-benchmarking-media"
              aria-label="벤치마킹 대상 사이트 캡쳐 영역"
            />
          </div>
        </div>

        <footer className="seoul-youth-center__research-benchmarking-insight">
          <p>Key Insight</p>
          <strong>
            공공기관의 신뢰성과 접근성 기준을 바탕으로, 청소년 활동
            탐색과 참여 흐름만 서울시립청소년센터에 맞게 강화합니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterResearchBenchmarking;
