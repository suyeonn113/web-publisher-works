import { seoulYouthCenterSections } from "../../sections";
import "./SeoulYouthCenterContents.scss";

const SeoulYouthCenterContents = () => {
  return (
    <div className="ppt-page-wrap">
      <section
        id="contents"
        className="ppt-page syc-page project-section-nav-safe-area seoul-youth-center__contents"
        aria-labelledby="seoul-youth-center-contents-title"
      >
        <header className="seoul-youth-center__contents-header">
          <p className="seoul-youth-center__contents-eyebrow">
            01. Table of Contents
          </p>

          <h2 id="seoul-youth-center-contents-title">
            목차
          </h2>
        </header>

        <ol className="seoul-youth-center__contents-list">
          {seoulYouthCenterSections.map((section) => (
            <li
              className="seoul-youth-center__contents-section"
              key={section.number}
            >
              <div className="seoul-youth-center__contents-section-heading">
                <span className="seoul-youth-center__contents-section-number">
                  {section.number}
                </span>

                <div className="seoul-youth-center__contents-section-title">
                  <h3>{section.englishTitle}</h3>
                  <p>{section.koreanTitle}</p>
                </div>
              </div>

              <ol className="seoul-youth-center__contents-items">
                {section.items.map((item) => (
                  <li key={item.id}>
                    <span className="seoul-youth-center__contents-item-number">
                      {item.number}
                    </span>

                    <span className="seoul-youth-center__contents-item-label">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default SeoulYouthCenterContents;
