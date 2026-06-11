import { getProjectBySlug } from "../../../data/projects";
import SeoulYouthCenterCover from "./components/SeoulYouthCenterCover/SeoulYouthCenterCover";
import SeoulYouthCenterContents from "./components/SeoulYouthCenterContents/SeoulYouthCenterContents";
import SeoulYouthCenterOverview from "./components/SeoulYouthCenterOverview/SeoulYouthCenterOverview";
import "./SeoulYouthCenterDetail.scss";

const SeoulYouthCenterDetail = () => {
  const project = getProjectBySlug("seoul-youth-center");

  if (!project) {
    return <p>Project information was not found.</p>;
  }

  return (
    <main className="seoul-youth-center">
      <SeoulYouthCenterCover project={project} />
      <SeoulYouthCenterContents />
      <SeoulYouthCenterOverview project={project} />
    </main>
  );
};

export default SeoulYouthCenterDetail;
