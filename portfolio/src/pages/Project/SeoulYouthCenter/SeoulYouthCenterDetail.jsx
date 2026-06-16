import { Link } from "react-router-dom";
import { getProjectBySlug } from "../../../data/projects";
import useResponsiveSectionScrollRestore from "../../../hooks/useResponsiveSectionScrollRestore";
import ProjectSectionNav from "../../../components/project-detail/ProjectSectionNav/ProjectSectionNav";
import ArrowIcon from "../../../components/icons/ArrowIcon";

import { seoulYouthCenterSections } from "./sections";

import SeoulYouthCenterCover from "./components/00SeoulYouthCenterCover/SeoulYouthCenterCover";
import SeoulYouthCenterContents from "./components/01SeoulYouthCenterContents/SeoulYouthCenterContents";
import SeoulYouthCenterOverview from "./components/02SeoulYouthCenterOverview/SeoulYouthCenterOverview";
import SeoulYouthCenterBackground from "./components/03SeoulYouthCenterBackground/SeoulYouthCenterBackground";
import SeoulYouthCenterGoals from "./components/04SeoulYouthCenterGoals/SeoulYouthCenterGoals";
import SeoulYouthCenterSiteAnalysisInformationFlow from "./components/05SeoulYouthCenterSiteAnalysis/SeoulYouthCenterSiteAnalysisInformationFlow";
import SeoulYouthCenterSiteAnalysisResponsive from "./components/05SeoulYouthCenterSiteAnalysis/SeoulYouthCenterSiteAnalysisResponsive";
import SeoulYouthCenterResearchBenchmarking from "./components/06SeoulYouthCenterResearchBenchmarking/SeoulYouthCenterResearchBenchmarking";
import SeoulYouthCenterBenchmarkingBoard from "./components/06SeoulYouthCenterResearchBenchmarking/SeoulYouthCenterBenchmarkingBoard";
import SeoulYouthCenterImprovementStrategy from "./components/07SeoulYouthCenterSwotStrategy/SeoulYouthCenterImprovementStrategy";
import SeoulYouthCenterPositioningSwot from "./components/07SeoulYouthCenterSwotStrategy/SeoulYouthCenterPositioningSwot";
import SeoulYouthCenterUserAnalysis from "./components/08SeoulYouthCenterUserAnalysis/SeoulYouthCenterUserAnalysis";
import SeoulYouthCenterUserJourney from "./components/09SeoulYouthCenterUserJourney/SeoulYouthCenterUserJourney";
import SeoulYouthCenterDesignConcept from "./components/10SeoulYouthCenterDesignConcept/SeoulYouthCenterDesignConcept";
import SeoulYouthCenterInformationArchitecture from "./components/11SeoulYouthCenterInformationArchitecture/SeoulYouthCenterInformationArchitecture";
import SeoulYouthCenterInformationArchitectureStructure from "./components/11SeoulYouthCenterInformationArchitecture/SeoulYouthCenterInformationArchitectureStructure";
import SeoulYouthCenterUserFlow from "./components/12SeoulYouthCenterUserFlow/SeoulYouthCenterUserFlow";
import SeoulYouthCenterWireframes from "./components/13SeoulYouthCenterWireframes/SeoulYouthCenterWireframes";
import SeoulYouthCenterResponsiveWireframes from "./components/13SeoulYouthCenterWireframes/SeoulYouthCenterResponsiveWireframes";
import SeoulYouthCenterSectionResponsiveWireframes from "./components/13SeoulYouthCenterWireframes/SeoulYouthCenterSectionResponsiveWireframes";
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

  useResponsiveSectionScrollRestore(seoulYouthCenterSections);

  if (!project) {
    return <p>Project information was not found.</p>;
  }

  return (
    <main className="project-detail project-detail--ppt seoul-youth-center">
      <ProjectSectionNav
        project={project}
        sections={seoulYouthCenterSections}
      />

      <SeoulYouthCenterCover project={project} />
      <SeoulYouthCenterContents />

      <div
        id="overview"
        className="project-section-group"
      >
        <SeoulYouthCenterOverview project={project} />
      </div>

      <div
        id="background"
        className="project-section-group"
      >
        <SeoulYouthCenterBackground />
      </div>

      <div
        id="goals"
        className="project-section-group"
      >
        <SeoulYouthCenterGoals />
      </div>

      <div
        id="site-analysis"
        className="project-section-group"
      >
        <SeoulYouthCenterSiteAnalysisResponsive />
        <SeoulYouthCenterSiteAnalysisInformationFlow />
      </div>

      <div
        id="research-benchmarking"
        className="project-section-group"
      >
        <SeoulYouthCenterResearchBenchmarking />
        <SeoulYouthCenterBenchmarkingBoard />
      </div>

      <div
        id="swot-strategy"
        className="project-section-group"
      >
        <SeoulYouthCenterPositioningSwot />
        <SeoulYouthCenterImprovementStrategy />
      </div>

      <div
        id="user-analysis"
        className="project-section-group"
      >
        <SeoulYouthCenterUserAnalysis />
      </div>

      <div
        id="user-journey"
        className="project-section-group"
      >
        <SeoulYouthCenterUserJourney />
      </div>

      <div
        id="design-concept"
        className="project-section-group"
      >
        <SeoulYouthCenterDesignConcept />
      </div>

      <div
        id="information-architecture"
        className="project-section-group"
      >
        <SeoulYouthCenterInformationArchitecture />
        <SeoulYouthCenterInformationArchitectureStructure />
      </div>

      <div
        id="user-flow"
        className="project-section-group"
      >
        <SeoulYouthCenterUserFlow />
      </div>

      <div
        id="wireframes"
        className="project-section-group"
      >
        <SeoulYouthCenterWireframes />
        <SeoulYouthCenterResponsiveWireframes />
        <SeoulYouthCenterSectionResponsiveWireframes />
      </div>

      <div
        id="ui-design"
        className="project-section-group"
      >
        <SeoulYouthCenterUiDesign />
      </div>

      <div
        id="design-system"
        className="project-section-group"
      >
        <SeoulYouthCenterDesignSystem />
      </div>

      <div
        id="development-overview"
        className="project-section-group"
      >
        <SeoulYouthCenterDevelopmentOverview project={project} />
      </div>

      <div
        id="system-architecture"
        className="project-section-group"
      >
        <SeoulYouthCenterSystemArchitecture />
      </div>

      <div
        id="responsive-accessibility"
        className="project-section-group"
      >
        <SeoulYouthCenterResponsiveAccessibility />
      </div>

      <div
        id="project-schedule"
        className="project-section-group"
      >
        <SeoulYouthCenterProjectSchedule />
      </div>

      <div
        id="results-impact"
        className="project-section-group"
      >
        <SeoulYouthCenterResultsImpact />
      </div>

      <div
        id="future-improvements"
        className="project-section-group"
      >
        <SeoulYouthCenterFutureImprovements />
      </div>

      <div className="seoul-youth-center__preview-outro no-print">
        <Link
          className="seoul-youth-center__preview-cta seoul-youth-center__preview-cta--outro hover-lift"
          to={`/projects/${project.slug}/preview`}
        >
          <span>Responsive Preview</span>
          <ArrowIcon direction="right" />
        </Link>
      </div>
    </main>
  );
};

export default SeoulYouthCenterDetail;
