import "./SeoulYouthCenterBackground.scss";

const backgroundIntro =
  "서울시립청소년센터는 서울시를 대표하는 청소년 기관임에도 기존 홈페이지가 반응형 환경을 충분히 지원하지 않아 모바일과 태블릿 이용자의 정보 접근성이 낮았습니다.";

const backgroundItems = [
  {
    number: "01",
    title: "대표 기관 역할 대비 낮은 디지털 접근성",
    description:
      "서울시를 대표하는 청소년 기관임에도 모바일과 태블릿 환경에서 정보 확인이 어려워, 다양한 사용자가 홈페이지를 원활하게 이용하기 어려웠습니다.",
    keyword: "Accessibility",
  },
  {
    number: "02",
    title: "프로그램과 혜택 정보 전달력 부족",
    description:
      "활발히 진행되는 프로그램과 청소년에게 필요한 혜택이 충분히 전달되지 못해, 홈페이지가 기관 활동을 알리는 핵심 채널로 기능하는 데 한계가 있었습니다.",
    keyword: "Communication",
  },
  {
    number: "03",
    title: "참여로 이어지기 어려운 이용 흐름",
    description:
      "청소년 관련 기관에서 활동한 경험을 바탕으로 볼 때, 사용자가 정보를 확인한 뒤 실제 활동 참여로 이어지기 위해서는 탐색과 신청 흐름의 연결성이 필요했습니다.",
    keyword: "Participation",
  },
];

const backgroundConclusion = {
  label: "Project Direction",
  description:
    "반응형 웹과 UX/UI 개선을 통해 홈페이지가 청소년 활동 참여를 높이는 핵심 매개체가 되도록 재구성",
};

const SeoulYouthCenterBackground = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__background"
        aria-labelledby="seoul-youth-center-background-title"
      >
        <header className="seoul-youth-center__background-header">
          <p className="seoul-youth-center__background-eyebrow">
            03. Background &amp; Rationale
          </p>

          <h2 id="seoul-youth-center-background-title">
            추진 배경 및 필요성
          </h2>

          <p className="seoul-youth-center__background-intro">
            {backgroundIntro}
          </p>
        </header>

        <ol className="seoul-youth-center__background-list">
          {backgroundItems.map(
            ({ number, title, description, keyword }) => (
              <li
                className="seoul-youth-center__background-item"
                key={number}
              >
                <div className="seoul-youth-center__background-item-heading">
                  <span className="seoul-youth-center__background-number">
                    {number}
                  </span>

                  <span className="seoul-youth-center__background-keyword">
                    {keyword}
                  </span>
                </div>

                <div className="seoul-youth-center__background-copy">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ),
          )}
        </ol>

        <div className="seoul-youth-center__background-conclusion">
          <p>{backgroundConclusion.label}</p>
          <strong>{backgroundConclusion.description}</strong>
        </div>
      </section>
    </div>
  );
};

export default SeoulYouthCenterBackground;
