import "./SeoulYouthCenterImprovementStrategy.scss";

const strategyItems = [
  {
    number: "01",
    title: "Rebuild Information Structure",
    description:
      "주요 서비스와 프로그램 정보를 사용자가 예측 가능한 구조로 재정리합니다.",
  },
  {
    number: "02",
    title: "Strengthen Responsive UX",
    description:
      "모바일과 태블릿에서도 탐색, 필터, 신청 CTA가 자연스럽게 작동하도록 설계합니다.",
  },
  {
    number: "03",
    title: "Prioritize Program Discovery",
    description:
      "모집 상태, 대상, 활동 기간 등 판단 정보를 카드와 필터 중심으로 제공합니다.",
  },
  {
    number: "04",
    title: "Connect Participation Flow",
    description:
      "프로그램 목록, 상세, 신청, 신청 확인까지 하나의 흐름으로 연결합니다.",
  },
];

const SeoulYouthCenterImprovementStrategy = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page seoul-youth-center__improvement-strategy"
        aria-labelledby="seoul-youth-center-improvement-strategy-title"
      >
        <header className="seoul-youth-center__improvement-strategy-header">
          <p className="seoul-youth-center__improvement-strategy-eyebrow">
            07. SWOT &amp; Improvement Strategy
          </p>

          <h2 id="seoul-youth-center-improvement-strategy-title">
            Improvement Strategy
          </h2>

          <p className="seoul-youth-center__improvement-strategy-summary">
            분석과 벤치마킹에서 도출한 핵심 과제를 정보 구조,
            반응형 접근성, 프로그램 탐색, 참여 흐름의 네 가지
            전략으로 구체화했습니다.
          </p>
        </header>

        <div className="seoul-youth-center__improvement-strategy-layout">
          <ol className="seoul-youth-center__improvement-strategy-list">
            {strategyItems.map(
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

          {/* 도식 가이드: 정보 구조 → 반응형 UX → 프로그램 탐색 → 신청 흐름으로 이어지는 간단한 전략 플로우 다이어그램 배치 */}
          <figure
            className="seoul-youth-center__improvement-strategy-diagram"
            aria-label="개선 전략 흐름 도식 영역"
          />
        </div>

        <footer className="seoul-youth-center__improvement-strategy-direction">
          <p>Final Direction</p>
          <strong>
            기관 소개 중심 홈페이지에서 청소년 활동 참여를 돕는
            서비스형 플랫폼으로 전환합니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterImprovementStrategy;
