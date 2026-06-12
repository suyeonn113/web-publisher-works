import "./SeoulYouthCenterFutureImprovements.scss";

const improvementItems = [
  {
    title: "관리자 기능 고도화",
    description:
      "프로그램 등록, 신청자 관리, 게시글 관리를 더 효율적으로 운영할 수 있는 관리자 화면 개선",
  },
  {
    title: "신청 알림 기능",
    description:
      "신청 완료, 일정 변경, 모집 마감 등 주요 상태를 문자나 이메일로 안내",
  },
  {
    title: "맞춤 프로그램 추천",
    description:
      "연령, 관심 분야, 신청 이력을 바탕으로 관련 프로그램을 추천",
  },
  {
    title: "활동 기록 아카이브",
    description:
      "활동사진, SNS, 후기 콘텐츠를 프로그램별로 연결해 참여 결과를 더 쉽게 확인",
  },
  {
    title: "접근성 점검 고도화",
    description:
      "색 대비, 키보드 이동, 폼 라벨, 대체 텍스트 등 실제 접근성 체크리스트 기반 개선",
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
            사용자 피드백을 바탕으로 신청 관리, 알림, 프로그램 추천,
            접근성 점검을 고도화할 수 있습니다.
          </p>
        </header>

        <ol className="seoul-youth-center__future-improvements-list">
          {improvementItems.map(({ title, description }, index) => (
            <li key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <footer className="seoul-youth-center__future-improvements-insight">
          <p>Key Point</p>
          <strong>
            향후 개선은 기능을 단순히 추가하는 것보다, 프로그램
            탐색·신청·참여 이후 확인까지 이어지는 서비스 경험을
            더 정교하게 만드는 방향으로 확장할 수 있습니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterFutureImprovements;
