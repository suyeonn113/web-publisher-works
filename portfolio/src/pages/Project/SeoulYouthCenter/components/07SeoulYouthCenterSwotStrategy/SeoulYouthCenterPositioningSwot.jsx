import "./SeoulYouthCenterPositioningSwot.scss";

const positioningPoints = [
  {
    name: "정부24",
    x: 18,
    y: 76,
  },
  {
    name: "청소년몽땅정보통",
    x: 36,
    y: 42,
  },
  {
    name: "청소년시설",
    x: 64,
    y: 46,
  },
  {
    name: "서울시립청소년센터",
    x: 72,
    y: 24,
    isTarget: true,
  },
];

const swotItems = [
  {
    key: "S",
    title: "Strength",
    description: "서울시 대표 청소년기관의 공공성과 신뢰도",
  },
  {
    key: "W",
    title: "Weakness",
    description: "반응형 접근성 부족과 정보 구조 미흡",
  },
  {
    key: "O",
    title: "Opportunity",
    description: "청소년의 모바일 중심 정보 탐색 확대",
  },
  {
    key: "T",
    title: "Threat",
    description: "외부 채널 의존 시 홈페이지 활용도 저하",
  },
];

const SeoulYouthCenterPositioningSwot = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__positioning-swot"
        aria-labelledby="seoul-youth-center-positioning-swot-title"
      >
        <header className="seoul-youth-center__positioning-swot-header">
          <p className="seoul-youth-center__positioning-swot-eyebrow">
            07. SWOT &amp; Improvement Strategy
          </p>

          <h2 id="seoul-youth-center-positioning-swot-title">
            포지셔닝 및 SWOT 분석
          </h2>

          <p className="seoul-youth-center__positioning-swot-summary">
            서울시립청소년센터는 공공기관의 신뢰성을 유지하면서
            정보 제공 중심에서 청소년 활동 참여 중심 UX로 이동해야
            합니다.
          </p>
        </header>

        <div className="seoul-youth-center__positioning-swot-layout">
          {/* 도식 가이드: 각 포인트는 나중에 로고 이미지로 교체 가능 */}
          <figure
            className="seoul-youth-center__positioning-swot-map"
            aria-label="포지셔닝 맵 도식 영역"
          >
            <span className="seoul-youth-center__positioning-swot-axis-label is-top">
              참여·경험 중심
            </span>
            <span className="seoul-youth-center__positioning-swot-axis-label is-right">
              사용자 친화성
            </span>
            <span className="seoul-youth-center__positioning-swot-axis-label is-bottom">
              정보 제공 중심
            </span>
            <span className="seoul-youth-center__positioning-swot-axis-label is-left">
              공공성
            </span>

            <span
              className="seoul-youth-center__positioning-swot-axis is-horizontal"
              aria-hidden="true"
            />
            <span
              className="seoul-youth-center__positioning-swot-axis is-vertical"
              aria-hidden="true"
            />

            <ul className="seoul-youth-center__positioning-swot-points">
              {positioningPoints.map(({ name, x, y, isTarget }) => (
                <li
                  className={isTarget ? "is-target" : ""}
                  key={name}
                  style={{
                    "--point-x": `${x}%`,
                    "--point-y": `${y}%`,
                  }}
                >
                  {name}
                </li>
              ))}
            </ul>
          </figure>

          <aside className="seoul-youth-center__positioning-swot-position">
            <p>Key Position</p>
            <strong>
              공공성과 접근성을 기반으로, 프로그램 탐색과 신청 흐름을
              강화한 사용자 친화형 공공 서비스
            </strong>
          </aside>
        </div>

        <ul className="seoul-youth-center__positioning-swot-list">
          {swotItems.map(({ key, title, description }) => (
            <li key={key}>
              <span>{key}</span>
              <div>
                <strong>{title}</strong>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SeoulYouthCenterPositioningSwot;
