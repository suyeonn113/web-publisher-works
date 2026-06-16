import { useEffect, useState } from "react";

const PreviewBeforeSiteModal = ({ screens = [], isOpen, onClose }) => {
  const [activeScreenId, setActiveScreenId] = useState("");

  const activeScreen =
    screens.find((screen) => screen.id === activeScreenId) ?? screens[0];

  useEffect(() => {
    if (isOpen) {
      setActiveScreenId(screens[0]?.id ?? "");
    }
  }, [isOpen, screens]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !activeScreen) {
    return null;
  }

  return (
    <div
      className="preview-before-site-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-before-site-modal-title"
      onClick={onClose}
    >
      <div
        className="preview-before-site-modal__window"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="preview-before-site-modal__bar">
          <div className="preview-before-site-modal__traffic" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className="preview-before-site-modal__tabs">
            {screens.map((screen) => {
              const isActive = screen.id === activeScreen.id;

              return (
                <button
                  type="button"
                  className={isActive ? "is-active" : ""}
                  aria-pressed={isActive}
                  onClick={() => setActiveScreenId(screen.id)}
                  key={screen.id}
                >
                  {screen.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="preview-before-site-modal__close"
            onClick={onClose}
            aria-label="이전 화면 닫기"
          >
            닫기
          </button>
        </header>

        <figure className="preview-before-site-modal__figure">
          <img src={activeScreen.src} alt={activeScreen.alt} />

          <figcaption>
            <strong id="preview-before-site-modal-title">
              {activeScreen.title}
            </strong>
            <span>{activeScreen.description}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
};

export default PreviewBeforeSiteModal;