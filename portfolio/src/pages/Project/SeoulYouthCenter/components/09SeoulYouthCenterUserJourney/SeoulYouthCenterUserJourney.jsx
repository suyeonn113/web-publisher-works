import "./SeoulYouthCenterUserJourney.scss";

const journeySteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "메인 화면 또는 프로그램 목록에서 관심 있는 활동을 발견합니다.",
  },
  {
    number: "02",
    title: "Compare",
    description:
      "모집 상태, 대상, 일정, 장소, 비용 등 참여 판단에 필요한 정보를 확인합니다.",
  },
  {
    number: "03",
    title: "Apply",
    description:
      "상세 페이지에서 신청 가능 여부를 확인하고 신청 정보를 입력합니다.",
  },
  {
    number: "04",
    title: "Manage",
    description:
      "신청 내역을 확인하고 필요 시 정보를 수정하거나 취소합니다.",
  },
];

const keyScenarios = [
  {
    title: "청소년",
    description:
      "모바일에서 관심 프로그램을 찾고 모집 상태를 확인한 뒤 신청으로 이동합니다.",
  },
  {
    title: "보호자",
    description:
      "자녀에게 맞는 프로그램의 일정과 비용을 비교하고 신청 가능 여부를 확인합니다.",
  },
  {
    title: "청소년지도자",
    description:
      "프로그램 정보를 안내하고 신청 현황을 확인해 운영 자료로 활용합니다.",
  },
];

const SeoulYouthCenterUserJourney = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__user-journey"
        aria-labelledby="seoul-youth-center-user-journey-title"
      >
        <header className="seoul-youth-center__user-journey-header">
          <p className="seoul-youth-center__user-journey-eyebrow">
            09. User Journey &amp; Key Scenarios
          </p>

          <h2 id="seoul-youth-center-user-journey-title">
            핵심 서비스 여정
          </h2>

          <p className="seoul-youth-center__user-journey-summary">
            사용자 분석을 바탕으로 홈페이지에서 가장 중요한 흐름을
            프로그램 발견, 정보 확인, 신청, 신청 확인의 네 단계로
            정리했습니다.
          </p>
        </header>

        {/* 도식 가이드: Discover → Compare → Apply → Manage 흐름을 가로 화살표 또는 단계형 타임라인으로 표현 */}
        <ol className="seoul-youth-center__user-journey-steps">
          {journeySteps.map(({ number, title, description }) => (
            <li key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="seoul-youth-center__user-journey-scenarios">
          <div className="seoul-youth-center__user-journey-scenarios-heading">
            <p>Key Scenarios</p>
            <h3>사용자별 핵심 이용 상황</h3>
          </div>

          <ul>
            {keyScenarios.map(({ title, description }) => (
              <li key={title}>
                <strong>{title}</strong>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>

        <footer className="seoul-youth-center__user-journey-insight">
          <p>Key Scenario</p>
          <strong>
            홈페이지의 핵심 흐름은 단순 정보 열람이 아니라 프로그램
            탐색에서 신청 확인까지 끊기지 않는 참여 경험을 제공하는
            것입니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterUserJourney;
