import "./SeoulYouthCenterGoals.scss";

const goalItems = [
  {
    number: "01",
    title: "정보 구조 재정비",
    description:
      "청소년 프로그램, 센터 이용 정보, 주요 소식을 사용자가 빠르게 찾을 수 있도록 메뉴 체계와 콘텐츠 우선순위를 재정비합니다.",
    keyword: "Structure",
  },
  {
    number: "02",
    title: "반응형 접근성 강화",
    description:
      "PC뿐 아니라 모바일과 태블릿에서도 동일하게 정보를 확인하고 조작할 수 있도록 기기별 화면 구조와 인터랙션을 최적화합니다.",
    keyword: "Responsive",
  },
  {
    number: "03",
    title: "사용자 경험 개선",
    description:
      "정보 탐색부터 활동 참여까지 자연스럽게 이어질 수 있도록 시각적 위계, 탐색 경로, 주요 행동 버튼을 명확하게 설계합니다.",
    keyword: "UX/UI",
  },
  {
    number: "04",
    title: "프로그램 참여 흐름 구축",
    description:
      "프로그램 탐색, 상세 정보 확인, 신청, 신청 내역 확인과 수정까지 하나의 홈페이지 안에서 이어지는 통합 이용 흐름을 구축합니다.",
    keyword: "Participation",
  },
];

const SeoulYouthCenterGoals = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__goals"
        aria-labelledby="seoul-youth-center-goals-title"
      >
        <header className="seoul-youth-center__goals-header">
          <p className="seoul-youth-center__goals-eyebrow">
            04. Project Goals
          </p>

          <h2 id="seoul-youth-center-goals-title">
            프로젝트 목표
          </h2>

          <p className="seoul-youth-center__goals-intro">
            서울시립청소년센터 홈페이지의 정보 구조와 반응형
            UX/UI를 개선하여, <br /> 청소년 사용자가 모바일과 태블릿
            환경에서도 필요한 정보를 직관적으로 탐색하고 활동에
            참여할 수 있도록 합니다.
          </p>
        </header>

        <ol className="seoul-youth-center__goals-list">
          {goalItems.map(
            ({ number, title, description, keyword }) => (
              <li
                className="seoul-youth-center__goals-item"
                key={number}
              >
                <div className="seoul-youth-center__goals-meta">
                  <span className="seoul-youth-center__goals-number">
                    {number}
                  </span>

                  <span className="seoul-youth-center__goals-keyword">
                    {keyword}
                  </span>
                </div>

                <div className="seoul-youth-center__goals-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ),
          )}
        </ol>

        <div className="seoul-youth-center__goals-statement">
          <p>Core Goal</p>

          <strong>
            홈페이지가 단순한 정보 나열을 넘어
            청소년 활동 참여를 촉진하는 핵심 접점으로 기능하도록 개선
          </strong>
        </div>
      </section>
    </div>
  );
};

export default SeoulYouthCenterGoals;
