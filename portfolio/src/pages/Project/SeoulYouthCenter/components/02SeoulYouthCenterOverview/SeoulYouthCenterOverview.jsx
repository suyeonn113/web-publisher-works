import { getProjectOverviewItems } from "../../../../../utils/projectHelpers";
import "./SeoulYouthCenterOverview.scss";

const SeoulYouthCenterOverview = ({ project }) => {
  if (!project) {
    return <p>Project information was not found.</p>;
  }

  const overviewItems = getProjectOverviewItems(project);
  const summaryItems = overviewItems.slice(0, 4);
  const detailItems = overviewItems.slice(4);

  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__overview"
        aria-labelledby="seoul-youth-center-overview-title"
      >
        <header className="seoul-youth-center__overview-header">
          <p className="seoul-youth-center__overview-eyebrow">
            02. Project Overview
          </p>
          <h2 id="seoul-youth-center-overview-title">프로젝트 개요</h2>
        </header>

        <div className="seoul-youth-center__overview-body">
          <dl className="seoul-youth-center__overview-summary">
            {summaryItems.map(({ label, value }) => (
              <div
                className="seoul-youth-center__overview-summary-item"
                key={label}
              >
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <dl className="seoul-youth-center__overview-list">
            {detailItems.map(({ label, value }) => (
              <div
                className="seoul-youth-center__overview-item"
                key={label}
              >
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
};

export default SeoulYouthCenterOverview;
