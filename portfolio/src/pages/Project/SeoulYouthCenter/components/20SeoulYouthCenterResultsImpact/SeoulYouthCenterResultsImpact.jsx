import "./SeoulYouthCenterResultsImpact.scss";

const resultComparison = [
  {
    title: "Before",
    src: "/images/projects/seoul-youth-center/result-before-community.png",
    alt: "기존 커뮤니티 프로그램 모집안내 화면",
    note: "기존 사이트의 커뮤니티 > 프로그램 모집안내 화면 캡쳐. 신청 정보가 게시판 안에 묻혀 있던 맥락이 보이도록 메뉴와 목록을 함께 포함",
  },
  {
    title: "After",
    src: "/images/projects/seoul-youth-center/result-after-main-program.png",
    alt: "리뉴얼 메인 모집 중 프로그램 영역",
    note: "리뉴얼 메인 화면의 모집 중인 청소년 프로그램 영역 캡쳐. 신청 가능한 프로그램이 메인에서 바로 보이는 구조가 드러나도록 포함",
  },
];

const resultFlow = [
  {
    title: "Main",
    src: "/images/projects/seoul-youth-center/result-flow-main.png",
    alt: "메인 프로그램 진입 영역",
    note: "메인에서 프로그램으로 진입하는 영역 캡쳐. 퀵메뉴 또는 모집 중 프로그램 영역이 보이도록 크롭",
  },
  {
    title: "Detail",
    src: "/images/projects/seoul-youth-center/result-flow-detail.png",
    alt: "프로그램 상세와 신청 CTA",
    note: "프로그램 상세 화면에서 신청 CTA가 보이는 영역 캡쳐. 상세 정보 확인 후 신청으로 이어지는 구조가 보이도록 크롭",
  },
  {
    title: "Apply",
    src: "/images/projects/seoul-youth-center/result-flow-apply.png",
    alt: "프로그램 신청 폼",
    note: "신청 폼 화면 캡쳐. 입력 항목과 제출 흐름이 보이도록 상단부터 주요 입력 영역까지 포함",
  },
];

const impactItems = [
  {
    title: "신청 접근성 강화",
    description: "메인과 프로그램 흐름 안에서 신청 정보를 바로 확인할 수 있도록 개선",
  },
  {
    title: "프로그램 탐색 효율 개선",
    description: "모집 상태, 대상, 기간, 분야 정보를 카드와 필터 중심으로 정리",
  },
  {
    title: "활동사진/SNS 홍보 흐름 강화",
    description: "참여 결과와 외부 홍보 콘텐츠를 메인에서 함께 확인하도록 구성",
  },
  {
    title: "반응형 이용 경험 개선",
    description: "PC·태블릿·모바일에서 같은 참여 흐름이 유지되도록 화면 재구성",
  },
];

const SeoulYouthCenterResultsImpact = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__results-impact"
        aria-labelledby="seoul-youth-center-results-impact-title"
      >
        <header className="seoul-youth-center__results-impact-header">
          <p className="seoul-youth-center__results-impact-eyebrow">
            20. Results &amp; Expected Impact
          </p>

          <h2 id="seoul-youth-center-results-impact-title">
            결과 및 기대 효과
          </h2>

          <p className="seoul-youth-center__results-impact-summary">
            리뉴얼을 통해 기존 커뮤니티 게시판에 묻혀 있던 모집과
            신청 정보를 메인 화면과 프로그램 탐색 흐름 안으로
            이동시켰습니다. 사용자는 첫 화면에서 프로그램을 발견하고,
            상세 확인과 신청으로 이어지는 흐름을 더 직관적으로
            이용할 수 있습니다.
          </p>
        </header>

        <div className="seoul-youth-center__results-impact-comparison">
          {resultComparison.map(({ title, src, alt, note }) => (
            <figure key={title}>
              {/* 이미지 가이드: {note}. 파일명은 {src.replace("/images/projects/seoul-youth-center/", "")}로 저장 */}
              <img src={src} alt={alt} />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>

        <div className="seoul-youth-center__results-impact-flow">
          {resultFlow.map(({ title, src, alt, note }) => (
            <figure key={title}>
              {/* 이미지 가이드: {note}. 파일명은 {src.replace("/images/projects/seoul-youth-center/", "")}로 저장 */}
              <img src={src} alt={alt} />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>

        <ul className="seoul-youth-center__results-impact-list">
          {impactItems.map(({ title, description }) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>
          ))}
        </ul>

        <footer className="seoul-youth-center__results-impact-insight">
          <p>Key Point</p>
          <strong>
            결과적으로 홈페이지의 역할을 단순 정보 안내에서
            프로그램 탐색, 신청, 활동 확인, 홍보가 연결되는
            참여 중심 접점으로 확장했습니다.
          </strong>
        </footer>
      </section>
    </div>
  );
};

export default SeoulYouthCenterResultsImpact;
