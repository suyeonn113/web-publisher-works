const CONTROL_MODE_LABELS = {
  auto: "자동",
  manual: "수동",
  "manual-fallback": "자동 실패 후 수동",
};

const PreviewGuidePanel = ({ preview, step, controlMode }) => {
  return (
    <aside className="preview-guide-panel">
      <p className="preview-guide-panel__meta">
        제어 방식: {CONTROL_MODE_LABELS[controlMode] ?? preview.mode}
      </p>
      <h2>{step.title}</h2>
      <p>{step.guide}</p>
      <p className="preview-guide-panel__hint">
        {step.interactionHint}
      </p>
    </aside>
  );
};

export default PreviewGuidePanel;
