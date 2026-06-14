import "./SeoulYouthCenterPositioningSwot.scss";

const positioningPoints = [
  {
    name: "정부24",
    x: 22,
    y: 78,
  },
  {
    name: "청소년몽땅정보통",
    x: 38,
    y: 38,
  },
  {
    name: "청소년시설",
    x: 68,
    y: 48,
  },
  {
    name: "서울시립청소년센터",
    x: 72,
    y: 22,
    isTarget: true,
  },
];

const swotItems = [
  {
    key: "S",
    title: "공공기관 신뢰도",
    description: "서울시 대표 청소년기관으로서 보유한 공공성과 신뢰성",
  },
  {
    key: "W",
    title: "반응형 접근성 부족",
    description: "모바일과 태블릿 환경에서 정보 확인과 조작 흐름이 제한적",
  },
  {
    key: "O",
    title: "모바일 탐색 확대",
    description: "청소년 사용자의 모바일 중심 정보 탐색과 활동 참여 증가",
  },
  {
    key: "T",
    title: "외부 채널 의존",
    description: "SNS와 외부 플랫폼 중심 이용 시 홈페이지 활용도 저하",
  },
];

const keyPositionKeywords = [
  "공공성 유지",
  "탐색 흐름 강화",
  "신청 접근성 개선",
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
            <p>Target Position</p>
            <strong>
              공공성과 접근성을 기반으로, <br />
              프로그램 탐색과 신청 흐름을 강화한 <br />
              사용자 친화형 공공 서비스
            </strong>
            <ul>
              {keyPositionKeywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
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
