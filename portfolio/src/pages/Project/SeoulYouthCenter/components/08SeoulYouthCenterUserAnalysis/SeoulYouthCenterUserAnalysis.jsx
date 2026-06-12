import "./SeoulYouthCenterUserAnalysis.scss";

const userTypes = [
  {
    number: "01",
    type: "Teen User",
    label: "청소년 사용자",
    situation:
      "친구의 공유나 학교 선생님의 추천으로 프로그램을 알게 되고, 모바일로 관심 있는 활동과 신청 가능 여부를 확인합니다.",
    needs: [
      "연령과 관심사에 맞는 프로그램 탐색",
      "모집 상태와 신청 가능 여부 확인",
    ],
    painPoints: [
      "모바일에서 정보가 작게 보이거나 신청 경로가 명확하지 않으면 쉽게 이탈합니다.",
    ],
  },
  {
    number: "02",
    type: "Parent User",
    label: "보호자",
    situation:
      "자녀가 참여할 수 있는 주말·방학 프로그램을 찾고, 대상 연령과 일정, 장소, 비용, 기관 신뢰도를 확인한 뒤 신청 여부를 결정합니다.",
    needs: [
      "대상, 일정, 장소, 비용 등 의사결정 정보 확인",
      "안전성과 기관 신뢰도, 문의 경로 확인",
    ],
    painPoints: [
      "프로그램 정보가 흩어져 있거나 모집 상태가 늦게 보이면 비교와 판단이 어려워집니다.",
    ],
  },
  {
    number: "03",
    type: "Youth Worker",
    label: "청소년지도자",
    situation:
      "프로그램을 안내하거나 참여자를 모집하기 위해 홈페이지에 등록된 정보, 신청 현황, 공지 전달 흐름을 확인합니다.",
    needs: [
      "프로그램 정보의 명확한 노출과 관리",
      "신청자 확인 및 운영 자료 축적",
    ],
    painPoints: [
      "홍보와 신청 정보가 여러 채널에 분산되면 안내와 운영 관리가 비효율적으로 이어집니다.",
    ],
  },
];

const SeoulYouthCenterUserAnalysis = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__user-analysis"
        aria-labelledby="seoul-youth-center-user-analysis-title"
      >
        <header className="seoul-youth-center__user-analysis-header">
          <p className="seoul-youth-center__user-analysis-eyebrow">
            08. User Analysis
          </p>

          <h2 id="seoul-youth-center-user-analysis-title">
            사용자 유형 및 이용 상황
          </h2>

          <p className="seoul-youth-center__user-analysis-summary">
            사용자 유형을 고정된 인물로 설정하기보다, 실제 이용
            맥락과 필요한 정보를 기준으로 주요 사용자 상황을
            정리했습니다.
          </p>
        </header>

        <div className="seoul-youth-center__user-analysis-grid">
          {userTypes.map(
            ({
              number,
              type,
              label,
              situation,
              needs,
              painPoints,
            }) => (
              <article
                className="seoul-youth-center__user-analysis-card"
                key={number}
              >
                <div className="seoul-youth-center__user-analysis-card-heading">
                  <span>{number}</span>
                  <div>
                    <h3>{type}</h3>
                    <p>{label}</p>
                  </div>
                </div>

                <p className="seoul-youth-center__user-analysis-situation">
                  {situation}
                </p>

                <div className="seoul-youth-center__user-analysis-detail">
                  <div>
                    <strong>Needs</strong>
                    <ul>
                      {needs.map((need) => (
                        <li key={need}>{need}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong>Pain Points</strong>
                    <ul>
                      {painPoints.map((painPoint) => (
                        <li key={painPoint}>{painPoint}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>

        <footer className="seoul-youth-center__user-analysis-insight">
          <p>Key Insight</p>
          <strong>
            청소년은 빠른 탐색을, 보호자는 신뢰할 수 있는 판단
            정보를, 청소년지도자는 효율적인 안내와 운영 관리를
            필요로 합니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterUserAnalysis;
