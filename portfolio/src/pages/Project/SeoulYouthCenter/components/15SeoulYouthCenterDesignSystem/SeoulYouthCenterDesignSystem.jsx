import "./SeoulYouthCenterDesignSystem.scss";

const designSystemItems = [
  {
    title: "Color",
    description: "브랜드 포인트 컬러, 배경 컬러, 상태 컬러 구분",
  },
  {
    title: "Typography",
    description: "제목, 섹션명, 카드 제목, 본문, 보조 정보 위계 정리",
  },
  {
    title: "Buttons & Tags",
    description: "신청, 더 보기, 필터, 접수중/마감/예정 상태 표시",
  },
  {
    title: "Program Card",
    description: "포스터, 모집 상태, 제목, 기간, 대상, 태그를 한 카드 안에 정리",
  },
  {
    title: "Responsive Rule",
    description: "PC는 넓게, 태블릿은 축소, 모바일은 세로 흐름과 하단바 중심",
  },
];

const SeoulYouthCenterDesignSystem = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__design-system"
        aria-labelledby="seoul-youth-center-design-system-title"
      >
        <header className="seoul-youth-center__design-system-header">
          <p className="seoul-youth-center__design-system-eyebrow">
            15. Design System &amp; Style Guide
          </p>

          <h2 id="seoul-youth-center-design-system-title">
            디자인 시스템 및 스타일 가이드
          </h2>

          <p className="seoul-youth-center__design-system-summary">
            반복되는 UI 요소를 일관되게 사용할 수 있도록 컬러,
            타이포그래피, 버튼, 태그, 카드 스타일을 정리했습니다.
            밝고 친근한 분위기를 유지하면서도 프로그램 상태와 신청
            행동이 명확하게 보이도록 구성했습니다.
          </p>
        </header>

        <ol className="seoul-youth-center__design-system-list">
          {designSystemItems.map(({ title, description }, index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <footer className="seoul-youth-center__design-system-insight">
          <p>Key Point</p>
          <strong>
            디자인 시스템은 화면의 분위기를 맞추는 기준이 아니라,
            프로그램 탐색과 신청 흐름이 여러 화면에서 일관되게
            보이도록 만든 사용성 기준입니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterDesignSystem;
