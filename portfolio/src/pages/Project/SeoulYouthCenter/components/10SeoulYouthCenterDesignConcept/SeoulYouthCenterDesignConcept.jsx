import "./SeoulYouthCenterDesignConcept.scss";

const conceptItems = [
  {
    number: "01",
    keyword: "Clear",
    title: "핵심 정보가 명확한",
    description:
      "프로그램, 공지, 시설 이용, 신청 방법 등 사용자가 먼저 확인해야 할 정보를 쉽게 이해할 수 있는 구조와 우선순위로 정리합니다.",
  },
  {
    number: "02",
    keyword: "Useful",
    title: "사용자에게 도움이 되는",
    description:
      "청소년, 보호자, 청소년지도자가 각자의 목적에 맞는 정보를 빠르게 확인하고, 프로그램 탐색과 신청에 필요한 판단을 쉽게 할 수 있도록 구성합니다.",
  },
  {
    number: "03",
    keyword: "Easy",
    title: "어떤 기기에서도 쉬운",
    description:
      "모바일, 태블릿, PC 환경에서 정보 탐색과 신청 흐름이 끊기지 않도록 복잡한 화면 구조를 줄이고 사용하기 쉬운 UI를 설계합니다.",
  },
];

const SeoulYouthCenterDesignConcept = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page seoul-youth-center__design-concept"
        aria-labelledby="seoul-youth-center-design-concept-title"
      >
        <header className="seoul-youth-center__design-concept-header">
          <p className="seoul-youth-center__design-concept-eyebrow">
            10. Design Concept
          </p>

          <h2 id="seoul-youth-center-design-concept-title">
            Design Concept
          </h2>

          <p className="seoul-youth-center__design-concept-summary">
            서울시립청소년센터 홈페이지는 공공기관의 신뢰감을
            유지하면서도, 사용자가 필요한 정보를 쉽게 찾고 프로그램
            참여까지 자연스럽게 이어질 수 있도록 설계합니다.
          </p>
        </header>

        {/* 도식 가이드: Clear / Useful / Easy 세 키워드를 같은 비중의 3컬럼 콘셉트 블록으로 표현 */}
        <ol className="seoul-youth-center__design-concept-list">
          {conceptItems.map(
            ({ number, keyword, title, description }) => (
              <li key={number}>
                <span>{number}</span>
                <div>
                  <strong>{keyword}</strong>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ),
          )}
        </ol>

        <footer className="seoul-youth-center__design-concept-core">
          <p>Core Concept</p>
          <strong>
            필요한 정보를 쉽게 찾고, 관심 활동을 빠르게 이해하며,
            신청까지 자연스럽게 이어지는 청소년 활동 참여 경험
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterDesignConcept;
