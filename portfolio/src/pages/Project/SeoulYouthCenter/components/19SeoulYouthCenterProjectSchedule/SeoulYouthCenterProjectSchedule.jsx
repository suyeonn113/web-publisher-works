import "./SeoulYouthCenterProjectSchedule.scss";

const scheduleSteps = [
  {
    period: "Week 1",
    title: "Planning & Research",
    description: "기존 사이트 분석, 사용자 상황 정리, 벤치마킹 기준 수립",
  },
  {
    period: "Week 2",
    title: "IA & User Flow",
    description: "메뉴 구조 재정리, 메인 접근 구조, 프로그램 신청 흐름 설계",
  },
  {
    period: "Week 3",
    title: "Wireframe & UI Design",
    description: "PC·태블릿·모바일 와이어프레임과 최종 UI 시안 제작",
  },
  {
    period: "Week 4",
    title: "Publishing",
    description: "반응형 레이아웃, 메인 섹션, 카드 UI, 모바일 내비게이션 구현",
  },
  {
    period: "Week 5",
    title: "PHP/MySQL Integration",
    description: "프로그램, 신청, 게시판 데이터 흐름 연결",
  },
  {
    period: "Week 6",
    title: "Testing & Refinement",
    description: "디바이스별 화면 확인, 신청 흐름 점검, 콘텐츠 정리",
  },
];

const SeoulYouthCenterProjectSchedule = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__project-schedule"
        aria-labelledby="seoul-youth-center-project-schedule-title"
      >
        <header className="seoul-youth-center__project-schedule-header">
          <p className="seoul-youth-center__project-schedule-eyebrow">
            19. Project Schedule
          </p>

          <h2 id="seoul-youth-center-project-schedule-title">
            프로젝트 일정
          </h2>

          <p className="seoul-youth-center__project-schedule-summary">
            프로젝트는 분석과 설계, 디자인, 퍼블리싱, 데이터 연동,
            테스트의 흐름으로 진행했습니다. 단순 화면 제작이 아니라
            프로그램 탐색과 신청 흐름이 실제 구현까지 이어지도록
            단계별로 검토했습니다.
          </p>
        </header>

        <ol className="seoul-youth-center__project-schedule-timeline">
          {scheduleSteps.map(({ period, title, description }) => (
            <li key={title}>
              <span>{period}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <footer className="seoul-youth-center__project-schedule-insight">
          <p>Key Point</p>
          <strong>
            일정은 산출물 제작 순서에 맞춰 진행하되, 각 단계에서
            프로그램 참여 흐름이 유지되는지를 반복적으로 확인했습니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterProjectSchedule;
