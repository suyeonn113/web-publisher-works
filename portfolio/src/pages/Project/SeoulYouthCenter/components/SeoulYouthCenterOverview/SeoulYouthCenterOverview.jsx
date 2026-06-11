import { getProjectOverviewItems } from "../../../../../utils/projectHelpers";
import "./SeoulYouthCenterOverview.scss";

const SeoulYouthCenterOverview = ({ project }) => {
  if (!project) {
    return <p>Project information was not found.</p>;
  }

  const overviewItems = getProjectOverviewItems(project);

  return (
    <div className="ppt-page-wrap">
      <section
        className="ppt-page seoul-youth-center__overview"
        aria-labelledby="seoul-youth-center-overview-title"
      >
        <header className="seoul-youth-center__overview-header">
          <p className="seoul-youth-center__overview-eyebrow">
            Project Overview
          </p>
          <h2 id="seoul-youth-center-overview-title">프로젝트 개요</h2>
        </header>

        <dl className="seoul-youth-center__overview-list">
          {overviewItems.map(({ label, value }) => (
            <div
              className="seoul-youth-center__overview-item"
              key={label}
            >
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
};

export default SeoulYouthCenterOverview;
