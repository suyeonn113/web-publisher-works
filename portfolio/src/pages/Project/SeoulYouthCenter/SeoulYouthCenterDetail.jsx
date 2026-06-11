import { getProjectBySlug } from "../../../data/projects";
import SeoulYouthCenterCover from "./components/00SeoulYouthCenterCover/SeoulYouthCenterCover";
import SeoulYouthCenterContents from "./components/01SeoulYouthCenterContents/SeoulYouthCenterContents";
import SeoulYouthCenterOverview from "./components/02SeoulYouthCenterOverview/SeoulYouthCenterOverview";
import SeoulYouthCenterBackground from "./components/03SeoulYouthCenterBackground/SeoulYouthCenterBackground";
import SeoulYouthCenterGoals from "./components/04SeoulYouthCenterGoals/SeoulYouthCenterGoals";
import SeoulYouthCenterSiteAnalysisInformationFlow from "./components/05SeoulYouthCenterSiteAnalysis/SeoulYouthCenterSiteAnalysisInformationFlow";
import SeoulYouthCenterSiteAnalysisResponsive from "./components/05SeoulYouthCenterSiteAnalysis/SeoulYouthCenterSiteAnalysisResponsive";
import SeoulYouthCenterResearchBenchmarking from "./components/06SeoulYouthCenterResearchBenchmarking/SeoulYouthCenterResearchBenchmarking";
import SeoulYouthCenterImprovementStrategy from "./components/07SeoulYouthCenterSwotStrategy/SeoulYouthCenterImprovementStrategy";
import SeoulYouthCenterPositioningSwot from "./components/07SeoulYouthCenterSwotStrategy/SeoulYouthCenterPositioningSwot";
import SeoulYouthCenterUserAnalysis from "./components/08SeoulYouthCenterUserAnalysis/SeoulYouthCenterUserAnalysis";
import SeoulYouthCenterUserJourney from "./components/09SeoulYouthCenterUserJourney/SeoulYouthCenterUserJourney";
import SeoulYouthCenterDesignConcept from "./components/10SeoulYouthCenterDesignConcept/SeoulYouthCenterDesignConcept";
import SeoulYouthCenterInformationArchitecture from "./components/11SeoulYouthCenterInformationArchitecture/SeoulYouthCenterInformationArchitecture";
import SeoulYouthCenterUserFlow from "./components/12SeoulYouthCenterUserFlow/SeoulYouthCenterUserFlow";
import SeoulYouthCenterWireframes from "./components/13SeoulYouthCenterWireframes/SeoulYouthCenterWireframes";
import SeoulYouthCenterUiDesign from "./components/14SeoulYouthCenterUiDesign/SeoulYouthCenterUiDesign";
import SeoulYouthCenterDesignSystem from "./components/15SeoulYouthCenterDesignSystem/SeoulYouthCenterDesignSystem";
import SeoulYouthCenterDevelopmentOverview from "./components/16SeoulYouthCenterDevelopmentOverview/SeoulYouthCenterDevelopmentOverview";
import SeoulYouthCenterSystemArchitecture from "./components/17SeoulYouthCenterSystemArchitecture/SeoulYouthCenterSystemArchitecture";
import SeoulYouthCenterResponsiveAccessibility from "./components/18SeoulYouthCenterResponsiveAccessibility/SeoulYouthCenterResponsiveAccessibility";
import SeoulYouthCenterProjectSchedule from "./components/19SeoulYouthCenterProjectSchedule/SeoulYouthCenterProjectSchedule";
import SeoulYouthCenterResultsImpact from "./components/20SeoulYouthCenterResultsImpact/SeoulYouthCenterResultsImpact";
import SeoulYouthCenterFutureImprovements from "./components/21SeoulYouthCenterFutureImprovements/SeoulYouthCenterFutureImprovements";

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
      <SeoulYouthCenterBackground />
      <SeoulYouthCenterGoals />
      <SeoulYouthCenterSiteAnalysisResponsive />
      <SeoulYouthCenterSiteAnalysisInformationFlow />
      <SeoulYouthCenterResearchBenchmarking />
      <SeoulYouthCenterPositioningSwot />
      <SeoulYouthCenterImprovementStrategy />
      <SeoulYouthCenterUserAnalysis />
      <SeoulYouthCenterUserJourney />
      <SeoulYouthCenterDesignConcept />
      <SeoulYouthCenterInformationArchitecture />
      <SeoulYouthCenterUserFlow />
      <SeoulYouthCenterWireframes />
      <SeoulYouthCenterUiDesign />
      <SeoulYouthCenterDesignSystem />
      <SeoulYouthCenterDevelopmentOverview />
      <SeoulYouthCenterSystemArchitecture />
      <SeoulYouthCenterResponsiveAccessibility />
      <SeoulYouthCenterProjectSchedule />
      <SeoulYouthCenterResultsImpact />
      <SeoulYouthCenterFutureImprovements />
    </main>
  );
};

export default SeoulYouthCenterDetail;
