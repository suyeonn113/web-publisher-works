import "./SeoulYouthCenterUserFlow.scss";

const primaryFlow = [
  {
    number: "01",
    title: "메인 진입",
    description:
      "첫 화면에서 모집 중인 프로그램, 퀵메뉴, 맞춤 탐색 영역을 확인합니다.",
  },
  {
    number: "02",
    title: "빠른 접근 또는 맞춤 탐색",
    description:
      "퀵메뉴로 원하는 메뉴에 바로 접근하거나, 연령/분야 기준으로 자신에게 맞는 프로그램을 탐색합니다.",
  },
  {
    number: "03",
    title: "프로그램 목록 확인",
    description:
      "모집 상태, 대상, 일정, 분야, 포스터 등 참여 판단에 필요한 정보를 비교합니다.",
  },
  {
    number: "04",
    title: "상세 정보 확인",
    description:
      "프로그램 목적, 운영 기간, 장소, 신청 조건, 준비물 등 세부 정보를 확인합니다.",
  },
  {
    number: "05",
    title: "신청하기",
    description:
      "신청 가능한 프로그램에서 신청 정보를 입력하고 제출합니다.",
  },
  {
    number: "06",
    title: "신청 내역 확인",
    description:
      "신청 완료 후 내역을 확인하고 필요 시 수정 또는 취소합니다.",
  },
];

const supportFlow = [
  {
    title: "공지사항",
    description: "운영 일정, 변경 사항, 필수 안내 확인",
  },
  {
    title: "센터 일정",
    description: "프로그램, 행사, 휴관 정보를 달력으로 확인",
  },
  {
    title: "활동사진",
    description: "실제 활동 결과와 현장 분위기를 확인",
  },
  {
    title: "SNS",
    description: "최신 홍보 콘텐츠와 외부 채널의 활동 흐름 확인",
  },
];

const userFlowPoints = [
  {
    title: "청소년",
    description: "관심 분야와 연령에 맞는 프로그램을 빠르게 찾고 신청으로 이동",
  },
  {
    title: "보호자",
    description: "모집 정보, 일정, 활동사진을 통해 참여 여부를 판단",
  },
  {
    title: "지도자/운영자",
    description: "모집, 공지, 활동사진, SNS 콘텐츠를 통해 활동 홍보와 기록 노출",
  },
];

const flowImprovements = [
  {
    title: "Before",
    description:
      "프로그램을 확인한 뒤 신청 정보가 있는 커뮤니티 게시판을 다시 찾아야 해 참여 흐름이 끊겼습니다.",
  },
  {
    title: "After",
    description:
      "메인에서 프로그램 탐색과 신청 진입점을 함께 제공해, 사용자가 첫 화면에서 참여 행동으로 자연스럽게 이동할 수 있도록 했습니다.",
  },
];

const SeoulYouthCenterUserFlow = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__user-flow"
        aria-labelledby="seoul-youth-center-user-flow-title"
      >
        <header className="seoul-youth-center__user-flow-header">
          <p className="seoul-youth-center__user-flow-eyebrow">
            12. User Flow
          </p>

          <h2 id="seoul-youth-center-user-flow-title">
            사용자 흐름 설계
          </h2>

          <p className="seoul-youth-center__user-flow-summary">
            메인 화면에서 사용자가 가장 자주 찾는 행동을 바로
            시작할 수 있도록, 퀵메뉴와 맞춤 프로그램 탐색을
            중심으로 주요 이용 흐름을 설계했습니다. 프로그램
            탐색부터 상세 확인, 신청, 신청 내역 확인까지 하나의
            흐름으로 연결해 참여 과정의 단절을 줄였습니다.
          </p>
        </header>

        <div className="seoul-youth-center__user-flow-compare">
          {flowImprovements.map(({ title, description }) => (
            <article key={title}>
              <p>{title}</p>
              <strong>{description}</strong>
            </article>
          ))}
        </div>

        <ol className="seoul-youth-center__user-flow-steps">
          {primaryFlow.map(({ number, title, description }) => (
            <li key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="seoul-youth-center__user-flow-support">
          <div className="seoul-youth-center__user-flow-support-heading">
            <p>Support Flow</p>
            <h3>정보 확인 및 신뢰 형성 흐름</h3>
          </div>

          <ul>
            {supportFlow.map(({ title, description }) => (
              <li key={title}>
                <strong>{title}</strong>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="seoul-youth-center__user-flow-users">
          <div className="seoul-youth-center__user-flow-users-heading">
            <p>User Points</p>
            <h3>사용자별 흐름 포인트</h3>
          </div>

          <ul>
            {userFlowPoints.map(({ title, description }) => (
              <li key={title}>
                <strong>{title}</strong>
                <p>{description}</p>
              </li>
            ))}
          </ul>
        </div>

        <footer className="seoul-youth-center__user-flow-insight">
          <p>Key Point</p>
          <strong>
            사용자 흐름의 시작점을 메뉴 내부가 아니라 메인 화면으로
            확장해, 프로그램 탐색·신청·활동 확인이 하나의 참여
            경험으로 이어지도록 설계했습니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterUserFlow;
