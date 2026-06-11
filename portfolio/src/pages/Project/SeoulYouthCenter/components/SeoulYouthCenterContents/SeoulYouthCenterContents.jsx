import "./SeoulYouthCenterContents.scss";

const contentsSections = [
  {
    number: "01",
    englishTitle: "Overview",
    koreanTitle: "프로젝트 정의",
    items: [
      { number: "02", label: "프로젝트 개요" },
      { number: "03", label: "추진 배경" },
      { number: "04", label: "프로젝트 목표" },
    ],
  },
  {
    number: "02",
    englishTitle: "Research",
    koreanTitle: "분석 및 전략",
    items: [
      { number: "05", label: "기존 사이트 분석" },
      { number: "06", label: "사례 조사 및 벤치마킹" },
      { number: "07", label: "SWOT 및 개선 전략" },
    ],
  },
  {
    number: "03",
    englishTitle: "UX Planning",
    koreanTitle: "사용자 경험 설계",
    items: [
      { number: "08", label: "사용자 분석" },
      { number: "09", label: "사용자 여정" },
      { number: "10", label: "디자인 콘셉트" },
      { number: "11", label: "정보 구조" },
      { number: "12", label: "사용자 흐름" },
    ],
  },
  {
    number: "04",
    englishTitle: "Design & Development",
    koreanTitle: "디자인 및 구현",
    items: [
      { number: "13", label: "와이어프레임" },
      { number: "14", label: "UI 디자인" },
      { number: "15", label: "디자인 시스템" },
      { number: "16", label: "개발 개요" },
      { number: "17", label: "시스템 및 DB 구조" },
      { number: "18", label: "반응형 및 접근성" },
    ],
  },
  {
    number: "05",
    englishTitle: "Outcome",
    koreanTitle: "프로젝트 결과",
    items: [
      { number: "19", label: "프로젝트 일정" },
      { number: "20", label: "결과 및 기대 효과" },
      { number: "21", label: "향후 개선 방향" },
    ],
  },
];

export default function SeoulYouthCenterContents() {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page seoul-youth-center__contents"
        aria-labelledby="seoul-youth-center-contents-title"
      >
        <header className="seoul-youth-center__contents-header">
          <p className="seoul-youth-center__contents-eyebrow">
            Contents
          </p>
          <h2 id="seoul-youth-center-contents-title">목차</h2>
        </header>

        <ol className="seoul-youth-center__contents-list">
          {contentsSections.map((section) => (
            <li
              className="seoul-youth-center__contents-section"
              key={section.number}
            >
              <div className="seoul-youth-center__contents-section-heading">
                <span className="seoul-youth-center__contents-section-number">
                  {section.number}
                </span>

                <div>
                  <h3>{section.englishTitle}</h3>
                  <p>{section.koreanTitle}</p>
                </div>
              </div>

              <ol className="seoul-youth-center__contents-items">
                {section.items.map((item) => (
                  <li key={item.number}>
                    <span>{item.number}</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
