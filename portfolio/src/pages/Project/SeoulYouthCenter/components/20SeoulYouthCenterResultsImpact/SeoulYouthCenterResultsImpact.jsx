import "./SeoulYouthCenterResultsImpact.scss";
import { getPublicAssetPath } from "../../../../../utils/assetPaths";

const resultComparison = [
  {
    title: "Before",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/result-before-community.png",
    ),
    alt: "기존 커뮤니티 프로그램 모집안내 화면",
    note: "기존 사이트의 커뮤니티 > 프로그램 모집안내 화면 캡쳐. 신청 정보가 게시판 안에 묻혀 있던 맥락이 보이도록 메뉴와 목록을 함께 포함",
  },
  {
    title: "After",
    src: getPublicAssetPath(
      "images/projects/seoul-youth-center/result-after-main-program.png",
    ),
    alt: "리뉴얼 메인 모집 중 프로그램 영역",
    note: "리뉴얼 메인 화면의 모집 중인 청소년 프로그램 영역 캡쳐. 신청 가능한 프로그램이 메인에서 바로 보이는 구조가 드러나도록 포함",
  },
];

const impactItems = [
  {
    title: "신청 접근성 강화",
    description:
      "메인과 프로그램 흐름 안에서 신청 정보를 바로 확인할 수 있도록 개선",
  },
  {
    title: "프로그램 탐색 효율 개선",
    description:
      "모집 상태, 대상, 기간, 분야 정보를 카드와 필터 중심으로 정리",
  },
  {
    title: "활동사진/SNS 홍보 흐름 강화",
    description:
      "참여 결과와 외부 홍보 콘텐츠를 메인에서 함께 확인하도록 구성",
  },
  {
    title: "반응형 이용 경험 개선",
    description:
      "PC·태블릿·모바일에서 같은 참여 흐름이 유지되도록 화면 재구성",
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
            이동시켰습니다.
            <br />
            사용자는 첫 화면에서 프로그램을 발견하고, 신청 가능한
            정보를 더 직관적으로 확인할 수 있습니다.
          </p>
        </header>

        <div className="seoul-youth-center__results-impact-layout">
          <div className="seoul-youth-center__results-impact-comparison">
            {resultComparison.map(({ title, src, alt, note }) => (
              <figure key={title}>
                {/* 이미지 가이드: {note}. 파일명은 {src.replace("/images/projects/seoul-youth-center/", "")}로 저장 */}
                <img src={src} alt={alt} />
                <figcaption>{title}</figcaption>
              </figure>
            ))}
          </div>

          <aside className="seoul-youth-center__results-impact-summary-card">
            <p>Core Result</p>
            <strong>
              프로그램 신청 정보가 게시판 안에 머무르지 않고,
              메인 탐색 흐름 안에서 바로 발견되는 구조로 개선
            </strong>
          </aside>
        </div>

        <ul className="seoul-youth-center__results-impact-list">
          {impactItems.map(({ title, description }) => (
            <li key={title}>
              <strong>{title}</strong>
              <p>{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default SeoulYouthCenterResultsImpact;