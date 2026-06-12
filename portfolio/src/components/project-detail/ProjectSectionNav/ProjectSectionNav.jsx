import {
  useEffect,
  useMemo,
  useState,
} from "react";

import "./ProjectSectionNav.scss";

const ProjectSectionNav = ({
  project,
  sections = [],
}) => {
  const navigationItems = useMemo(
    () =>
      sections.flatMap((section) =>
        section.items.filter(
          (item) => item.showInNav !== false,
        ),
      ),
    [sections],
  );

  const [activeSectionId, setActiveSectionId] = useState(
    navigationItems[0]?.id ?? "",
  );

  const [isOpen, setIsOpen] = useState(false);

  const activeItem = navigationItems.find(
    (item) => item.id === activeSectionId,
  );

  useEffect(() => {
    const sectionElements = navigationItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sectionElements.length) {
      return undefined;
    }

    const hashSectionId = decodeURIComponent(
      window.location.hash.replace("#", ""),
    );

    const hasHashSection = navigationItems.some(
      (item) => item.id === hashSectionId,
    );

    if (hasHashSection) {
      setActiveSectionId(hashSectionId);
    }

    let animationFrameId = null;

    const updateActiveSection = () => {
      if (window.scrollY <= 1) {
        setActiveSectionId(sectionElements[0]?.id ?? "");
        return;
      }

      const activationLine = window.innerHeight * 0.25;

      const nextActiveSection =
        sectionElements.reduce(
          (currentSectionId, sectionElement) => {
            if (
              sectionElement.getBoundingClientRect().top <=
              activationLine
            ) {
              return sectionElement.id;
            }

            return currentSectionId;
          },
          sectionElements[0]?.id ?? "",
        );

      if (nextActiveSection) {
        setActiveSectionId(nextActiveSection);
      }
    };

    const handleScroll = () => {
      if (animationFrameId) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(
        () => {
          updateActiveSection();
          animationFrameId = null;
        },
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    const handleHashChange = () => {
      const nextSectionId = decodeURIComponent(
        window.location.hash.replace("#", ""),
      );

      const hasSection = navigationItems.some(
        (item) => item.id === nextSectionId,
      );

      if (hasSection) {
        setActiveSectionId(nextSectionId);
      }
    };

    window.addEventListener(
      "hashchange",
      handleHashChange,
    );

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }

      window.removeEventListener(
        "hashchange",
        handleHashChange,
      );
    };
  }, [navigationItems]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [isOpen]);

  const handleSectionClick = (event, sectionId) => {
    event.preventDefault();

    const targetElement =
      document.getElementById(sectionId);

    if (!targetElement) {
      return;
    }

    setIsOpen(false);

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(
      null,
      "",
      `#${sectionId}`,
    );
  };

  const handleScrollToTop = () => {
    setIsOpen(false);
    setActiveSectionId(navigationItems[0]?.id ?? "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.history.replaceState(
      null,
      "",
      window.location.pathname,
    );
  };

  if (!navigationItems.length) {
    return null;
  }

  return (
    <aside
      className={[
        "project-section-nav",
        isOpen ? "is-open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={`${project?.title ?? "프로젝트"} 목차`}
    >
      <button
        type="button"
        className="project-section-nav__toggle"
        aria-expanded={isOpen}
        aria-controls="project-section-nav-panel"
        onClick={() => {
          setIsOpen((currentState) => !currentState);
        }}
      >
        <span className="project-section-nav__toggle-heading">
          Contents
        </span>

        <span className="project-section-nav__toggle-current">
          <span>
            {activeItem?.number ?? "01"}
          </span>

          <span>
            {activeItem?.label ?? "목차"}
          </span>
        </span>
      </button>

      <nav
        id="project-section-nav-panel"
        className="project-section-nav__panel"
        aria-label="프로젝트 상세 목차"
      >
        <header className="project-section-nav__header">
          <p className="project-section-nav__eyebrow">
            Project Index
          </p>

          {project?.title ? (
            <button
              type="button"
              className="project-section-nav__project-title"
              onClick={handleScrollToTop}
            >
              {project.title}
            </button>
          ) : null}
        </header>

        <ol className="project-section-nav__groups">
          {sections.map((section) => {
            const visibleItems =
              section.items.filter(
                (item) =>
                  item.showInNav !== false,
              );

            if (!visibleItems.length) {
              return null;
            }

            return (
              <li
                className="project-section-nav__group"
                key={section.number}
              >
                <div className="project-section-nav__group-heading">
                  <span className="project-section-nav__group-number">
                    {section.number}
                  </span>

                  <span className="project-section-nav__group-title">
                    {section.englishTitle}
                  </span>
                </div>

                <ol className="project-section-nav__items">
                  {visibleItems.map((item) => {
                    const isActive =
                      item.id === activeSectionId;

                    return (
                      <li
                        className="project-section-nav__item"
                        key={item.id}
                      >
                        <a
                          className={[
                            "project-section-nav__link",
                            isActive
                              ? "is-active"
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          href={`#${item.id}`}
                          aria-current={
                            isActive
                              ? "location"
                              : undefined
                          }
                          onClick={(event) => {
                            handleSectionClick(
                              event,
                              item.id,
                            );
                          }}
                        >
                          <span className="project-section-nav__item-number">
                            {item.number}
                          </span>

                          <span className="project-section-nav__item-label">
                            {item.label}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
};

export default ProjectSectionNav;
