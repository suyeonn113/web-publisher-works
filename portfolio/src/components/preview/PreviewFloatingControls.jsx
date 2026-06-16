const BeforeScreenIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M11.1 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.589 3.588A2.4 2.4 0 0 1 20 8v3.25" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    <path d="m21 22-2.88-2.88" />
    <circle cx="16" cy="17" r="3" />
  </svg>
);

const PinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 17v5" />
    <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
  </svg>
);

const PinOffIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M12 17v5" />
    <path d="M15 9.34V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H7.89" />
    <path d="m2 2 20 20" />
    <path d="M9 9v1.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h11" />
  </svg>
);

const PreviewFloatingControls = ({
  isPageScrollLocked,
  onTogglePageScrollLock,
  beforeScreens = [],
  onOpenBeforeScreen,
}) => {
  const lockLabel = isPageScrollLocked
    ? "Unlock page scroll"
    : "Lock page scroll";

  const hasBeforeScreens = beforeScreens.length > 0;

  return (
    <div className="preview-floating-controls no-print">
      {hasBeforeScreens && (
        <button
          type="button"
          className="preview-floating-controls__button preview-floating-controls__button--before"
          aria-label="이전 화면 보기"
          title="이전 화면 보기"
          onClick={onOpenBeforeScreen}
        >
          <BeforeScreenIcon />
          <span className="preview-floating-controls__label">
            이전 화면 보기
          </span>
        </button>
      )}

      <button
        type="button"
        className={[
          "preview-floating-controls__button",
          "preview-floating-controls__button--lock",
          isPageScrollLocked ? "is-active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label={lockLabel}
        aria-pressed={isPageScrollLocked}
        title={lockLabel}
        onClick={onTogglePageScrollLock}
      >
        {isPageScrollLocked ? <PinOffIcon /> : <PinIcon />}
      </button>
    </div>
  );
};

export default PreviewFloatingControls;