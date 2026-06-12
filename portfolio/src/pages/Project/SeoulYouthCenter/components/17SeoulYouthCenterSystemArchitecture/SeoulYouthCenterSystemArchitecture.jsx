import "./SeoulYouthCenterSystemArchitecture.scss";

const systemFlow = [
  {
    title: "Frontend",
    description: "HTML, SCSS, JavaScript 기반의 반응형 화면과 사용자 조작 요소",
  },
  {
    title: "PHP Pages",
    description: "프로그램, 게시판, 신청 페이지의 서버 사이드 처리",
  },
  {
    title: "MySQL DB",
    description: "프로그램 정보, 신청 데이터, 게시글 데이터 저장 및 조회",
  },
];

const dataGroups = [
  {
    title: "Programs",
    description: "프로그램명, 모집 상태, 대상, 기간, 분류, 상세 정보",
  },
  {
    title: "Applications",
    description: "신청자 정보, 신청 프로그램, 신청 상태, 신청 일시",
  },
  {
    title: "Boards",
    description: "공지사항, 보도자료, 공유자료, 활동사진 게시글",
  },
  {
    title: "Users / Applicants",
    description: "신청자 식별 정보와 신청 내역 확인에 필요한 기본 정보",
  },
];

const SeoulYouthCenterSystemArchitecture = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__system-architecture"
        aria-labelledby="seoul-youth-center-system-architecture-title"
      >
        <header className="seoul-youth-center__system-architecture-header">
          <p className="seoul-youth-center__system-architecture-eyebrow">
            17. System &amp; Database Architecture
          </p>

          <h2 id="seoul-youth-center-system-architecture-title">
            시스템 및 데이터베이스 구조
          </h2>

          <p className="seoul-youth-center__system-architecture-summary">
            프로그램 탐색과 신청 흐름이 실제 데이터와 연결될 수
            있도록 프론트 화면, PHP 페이지, MySQL 데이터베이스의
            역할을 나누어 구성했습니다.
          </p>
        </header>

        <ol className="seoul-youth-center__system-architecture-flow">
          {systemFlow.map(({ title, description }) => (
            <li key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>

        <div className="seoul-youth-center__system-architecture-layout">
          <section className="seoul-youth-center__system-architecture-data">
            <div className="seoul-youth-center__system-architecture-section-heading">
              <p>Data Groups</p>
              <h3>주요 데이터 구조</h3>
            </div>

            <ul>
              {dataGroups.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
          </section>

          <figure className="seoul-youth-center__system-architecture-erd">
            {/* 이미지 가이드: 실제 ERD 또는 DB 테이블 구조 캡쳐가 있을 경우 사용. Programs, Applications, Boards, Users/Applicants 관계가 보이도록 캡쳐. 파일명은 database-erd.png로 저장 */}
            <img
              src="/images/projects/seoul-youth-center/database-erd.png"
              alt="서울시립청소년센터 데이터베이스 구조"
            />
            <figcaption>Database Structure</figcaption>
          </figure>
        </div>

        <footer className="seoul-youth-center__system-architecture-insight">
          <p>Key Point</p>
          <strong>
            시스템 구조는 화면 구현에 그치지 않고, 프로그램 정보와
            신청 데이터가 저장·조회되는 흐름까지 연결해 실제 서비스
            사용이 가능한 기반으로 설계했습니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterSystemArchitecture;
