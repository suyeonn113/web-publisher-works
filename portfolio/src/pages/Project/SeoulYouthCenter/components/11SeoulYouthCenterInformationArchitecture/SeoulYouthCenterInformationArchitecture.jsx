import "./SeoulYouthCenterInformationArchitecture.scss";

const structureIssues = [
  {
    title: "신청 진입점의 위치 불명확",
    description:
      "프로그램을 신청하려는 사용자가 자연스럽게 청소년 프로그램 메뉴를 확인하게 되지만, 실제 모집 안내와 신청 포스터는 커뮤니티 게시판 안에 배치되어 있었습니다.",
  },
  {
    title: "게시판 중심의 정보 혼재",
    description:
      "공지, 모집 안내, 활동 사진, 보도자료처럼 성격이 다른 정보가 커뮤니티에 함께 묶여 있어 사용자가 정보의 목적을 예측하기 어려웠습니다.",
  },
  {
    title: "메인 화면의 역할 부족",
    description:
      "첫 화면이 프로그램 탐색이나 신청 행동으로 바로 이어지기보다, 여러 정보가 분산되어 노출되는 안내형 구조에 가까웠습니다.",
  },
];

const structureImprovements = [
  {
    title: "목적별 메뉴 재분류",
    description:
      "청소년센터 안내, 청소년 프로그램, 평생교육 프로그램, 동그라미 학교, 이용 안내, 소식처럼 방문 목적과 콘텐츠 성격에 따라 메뉴를 재정리했습니다.",
  },
  {
    title: "메인 신청 접근성 강화",
    description:
      "퀵메뉴와 모집 중인 프로그램 영역을 통해 사용자가 첫 화면에서 신청 가능한 프로그램을 바로 확인할 수 있도록 구성했습니다.",
  },
  {
    title: "맞춤 프로그램 탐색",
    description:
      "연령과 분야 기준으로 프로그램을 탐색할 수 있는 구조를 메인에 배치해, 사용자가 자신에게 맞는 활동을 빠르게 찾을 수 있도록 했습니다.",
  },
  {
    title: "활동·홍보 콘텐츠 연결",
    description:
      "활동사진, 공지, SNS 콘텐츠를 메인 흐름 안에 배치해 프로그램 참여 전후에 필요한 정보 확인과 홍보 흐름이 이어지도록 했습니다.",
  },
];

const navigationStructure = [
  {
    title: "청소년센터 안내",
    description: "소개, 시설개요 및 안내, 찾아오시는 길",
  },
  {
    title: "청소년 프로그램",
    description:
      "활동신청, 참여활동, 수련활동, 봉사활동, 지역연계활동, 학교연계활동, 진로체험활동, 문화예술활동, 미래융합활동, 국제교류활동, 장애청소년활동, 특성화활동, 동그라미학교, 방과후아카데미",
  },
  {
    title: "평생교육 프로그램",
    description: "접수안내, 교육강좌",
  },
  {
    title: "동그라미 학교",
    description: "기관 핵심 특화사업",
  },
  {
    title: "이용 안내",
    description: "문화공간, 종합체력실, 시설대관, 기관방문",
  },
  {
    title: "소식",
    description: "공지사항, 프로그램 활동사진, 보도자료, 서울시정, 공유자료",
  },
];

const mainAccessStructure = [
  {
    title: "퀵메뉴",
    description:
      "청소년 프로그램, 평생교육 프로그램, 청소년공간대관, 종합체력실, 시설대관, 문의하기",
  },
  {
    title: "모집 중인 청소년 프로그램",
    description: "신청 가능한 프로그램을 메인 상단에서 바로 노출",
  },
  {
    title: "나에게 맞는 프로그램 살펴보기",
    description: "연령/분야 기준 프로그램 탐색",
  },
  {
    title: "센터 일정",
    description: "프로그램, 행사, 휴관 등 일정 확인",
  },
  {
    title: "공지/보도자료/서울시정",
    description: "공식 안내와 기관 소식 확인",
  },
  {
    title: "활동사진",
    description: "프로그램 활동 결과와 현장 분위기 확인",
  },
  {
    title: "SNS",
    description: "외부 홍보 채널과 최신 콘텐츠 연결",
  },
];

const architectureGroups = [
  {
    title: "Global Navigation",
    description: "사용자 목적과 프로그램 성격 기준으로 전체 메뉴를 재정리",
    items: [
      "청소년센터 안내",
      "청소년 프로그램",
      "평생교육 프로그램",
      "동그라미 학교",
      "이용 안내",
      "소식",
    ],
  },
  {
    title: "Main Access",
    description: "첫 화면에서 탐색, 신청, 활동 확인, 홍보 콘텐츠로 바로 진입",
    items: [
      "퀵메뉴",
      "모집 중인 프로그램",
      "맞춤 프로그램 탐색",
      "센터 일정",
      "공지/보도자료",
      "활동사진",
      "SNS",
    ],
  },
];

const SeoulYouthCenterInformationArchitecture = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__information-architecture"
        aria-labelledby="seoul-youth-center-information-architecture-title"
      >
        <header className="seoul-youth-center__information-architecture-header">
          <p className="seoul-youth-center__information-architecture-eyebrow">
            11. Information Architecture
          </p>

          <h2 id="seoul-youth-center-information-architecture-title">
            정보 구조 설계
          </h2>

          <p className="seoul-youth-center__information-architecture-summary">
            기존 사이트는 프로그램 모집과 신청 정보가 커뮤니티
            게시판 안에 섞여 있어, 사용자가 프로그램을 탐색한 뒤
            참여로 이어지는 흐름을 파악하기 어려웠습니다.
            리뉴얼에서는 메뉴 구조를 사용자 목적과 프로그램 성격
            기준으로 재정리하고, 메인 화면에서 신청 정보·활동사진·
            공지·SNS 콘텐츠를 함께 확인할 수 있도록 접근 구조를
            설계했습니다.
          </p>
        </header>

        <div className="seoul-youth-center__information-architecture-compare">
          <article className="seoul-youth-center__information-architecture-panel">
            <p>Before</p>
            <h3>프로그램 신청 경로가 커뮤니티에 매몰됨</h3>
            <ul>
              {structureIssues.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="seoul-youth-center__information-architecture-panel">
            <p>After</p>
            <h3>메뉴 구조와 메인 접근 구조를 함께 재설계</h3>
            <ul>
              {structureImprovements.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <div className="seoul-youth-center__information-architecture-detail">
          <section>
            <h3>IA Structure</h3>
            <ul>
              {navigationStructure.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Main Access Structure</h3>
            <ul>
              {mainAccessStructure.map(({ title, description }) => (
                <li key={title}>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div
          className="seoul-youth-center__information-architecture-map"
          aria-label="정보 구조 설계 요약 도식"
        >
          {architectureGroups.map(({ title, description, items }) => (
            <article
              className="seoul-youth-center__information-architecture-group"
              key={title}
            >
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>

              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <footer className="seoul-youth-center__information-architecture-insight">
          <p>Key Point</p>
          <strong>
            정보 구조를 메뉴 단위로만 정리하지 않고, 메인 화면에서
            프로그램 탐색·신청·활동 확인·소식 전달이 함께
            이루어지도록 설계해 홈페이지를 참여 중심의 서비스
            진입점으로 전환했습니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterInformationArchitecture;
