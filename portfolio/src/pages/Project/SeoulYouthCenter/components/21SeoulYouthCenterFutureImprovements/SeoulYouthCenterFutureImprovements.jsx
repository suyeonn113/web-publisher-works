import "./SeoulYouthCenterFutureImprovements.scss";

const roadmapItems = [
  {
    number: "01",
    category: "Operation",
    title: "운영 고도화",
    description:
      "프로그램 등록, 신청자 관리, 게시글 관리를 관리자 화면에서 통합 관리할 수 있도록 확장합니다.",
    items: ["관리자 화면 개선", "신청자 관리 효율화", "게시글 운영 구조 정리"],
  },
  {
    number: "02",
    category: "Experience",
    title: "참여 경험 확장",
    description:
      "신청 알림, 맞춤 프로그램 추천, 활동 기록 아카이브를 통해 참여 전후의 경험을 연결합니다.",
    items: ["신청 알림 기능", "맞춤 프로그램 추천", "활동 기록 아카이브"],
  },
  {
    number: "03",
    category: "Quality",
    title: "품질 개선",
    description:
      "접근성 체크리스트와 실제 사용자 피드백을 바탕으로 화면과 신청 흐름을 지속적으로 보완합니다.",
    items: ["접근성 점검 고도화", "사용자 피드백 반영", "기기별 사용성 테스트"],
  },
];

const SeoulYouthCenterFutureImprovements = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__future-improvements"
        aria-labelledby="seoul-youth-center-future-improvements-title"
      >
        <header className="seoul-youth-center__future-improvements-header">
          <p className="seoul-youth-center__future-improvements-eyebrow">
            21. Future Improvements
          </p>

          <h2 id="seoul-youth-center-future-improvements-title">
            향후 개선 방향
          </h2>

          <p className="seoul-youth-center__future-improvements-summary">
            이번 리뉴얼에서는 프로그램 탐색과 신청 흐름을 중심으로
            홈페이지 구조를 개선했습니다. 이후에는 실제 운영 데이터와
            사용자 피드백을 바탕으로 운영 효율, 참여 경험, 서비스
            품질을 단계적으로 확장할 수 있습니다.
          </p>
        </header>

        <ol className="seoul-youth-center__future-improvements-roadmap">
          {roadmapItems.map(({ number, category, title, description, items }) => (
            <li key={title}>
              <div className="seoul-youth-center__future-improvements-card-header">
                <span>{number}</span>

                <div>
                  <p>{category}</p>
                  <h3>{title}</h3>
                </div>
              </div>

              <p className="seoul-youth-center__future-improvements-card-description">
                {description}
              </p>

              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <aside className="seoul-youth-center__future-improvements-next">
          <p>Next Step</p>
          <strong>
            탐색과 신청 구조를 기반으로, 운영 관리와 개인화 기능까지
            확장 가능한 청소년 참여 플랫폼으로 고도화
          </strong>
        </aside>
      </section>
    </div>
  );
};

export default SeoulYouthCenterFutureImprovements;
