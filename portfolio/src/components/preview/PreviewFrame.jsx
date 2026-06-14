import { useEffect, useRef, useState } from "react";

const getPreviewUrl = (liveUrl, path) => {
  if (!path) {
    return liveUrl;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const basePath = liveUrl.endsWith("/")
    ? liveUrl
    : liveUrl.slice(0, liveUrl.lastIndexOf("/") + 1);
  const relativePath = path.replace(/^\/+/, "");

  return new URL(relativePath, basePath).toString();
};

const getDocumentHeight = (document) => {
  const { body, documentElement } = document;

  return Math.max(
    body?.scrollHeight ?? 0,
    body?.offsetHeight ?? 0,
    documentElement?.clientHeight ?? 0,
    documentElement?.scrollHeight ?? 0,
    documentElement?.offsetHeight ?? 0,
  );
};

const getManualScrollTop = (step, deviceKey) => {
  const scroll = step.scroll?.[deviceKey];

  return typeof scroll === "number" ? scroll : 0;
};

const PreviewFrame = ({
  project,
  previewMode,
  step,
  device,
  deviceKey,
  onControlStatusChange,
  onUnavailable,
}) => {
  const shellRef = useRef(null);
  const iframeRef = useRef(null);
  const measureTimeoutRef = useRef(null);
  const [frameHeight, setFrameHeight] = useState(device.frameHeight);
  const [frameScale, setFrameScale] = useState(1);
  const src = getPreviewUrl(project.liveUrl, step.path);

  useEffect(() => {
    const shell = shellRef.current;

    if (!shell) {
      return undefined;
    }

    const updateFrameScale = () => {
      const { width } = shell.getBoundingClientRect();
      const nextScale = Math.min(1, width / device.width);

      setFrameScale(Number.isFinite(nextScale) ? nextScale : 1);
    };

    updateFrameScale();

    const resizeObserver = new ResizeObserver(updateFrameScale);
    resizeObserver.observe(shell);

    return () => {
      resizeObserver.disconnect();
    };
  }, [device.width]);

  useEffect(() => {
    setFrameHeight(device.frameHeight);
    onControlStatusChange?.({
      mode: previewMode,
      message: null,
    });

    return () => {
      if (measureTimeoutRef.current) {
        window.clearTimeout(measureTimeoutRef.current);
      }
    };
  }, [
    device.frameHeight,
    device.width,
    deviceKey,
    onControlStatusChange,
    previewMode,
    src,
  ]);

  const applyManualControl = (reason) => {
    setFrameHeight(device.frameHeight);

    const iframe = iframeRef.current;
    const manualScrollTop = getManualScrollTop(step, deviceKey);

    try {
      const frameWindow = iframe?.contentWindow;

      if (!frameWindow) {
        throw new Error("iframe window is unavailable");
      }

      frameWindow.scrollTo({
        top: manualScrollTop,
        left: 0,
        behavior: "auto",
      });

      onControlStatusChange?.({
        mode: previewMode === "auto" ? "manual-fallback" : "manual",
        message: reason
          ? "자동 이동이 어려워 수동 위치값을 적용했습니다."
          : null,
      });
    } catch {
      onControlStatusChange?.({
        mode: previewMode === "auto" ? "manual-fallback" : "manual",
        message:
          "수동 위치값을 직접 적용할 수 없습니다. 프레임 안에서 직접 확인해 주세요.",
      });
    }
  };

  const applyAutoControl = () => {
    const iframe = iframeRef.current;
    const frameWindow = iframe?.contentWindow;
    const frameDocument = iframe?.contentDocument ?? frameWindow?.document;

    if (!frameWindow || !frameDocument) {
      throw new Error("iframe document is unavailable");
    }

    const targetElement = step.target
      ? frameDocument.querySelector(step.target)
      : null;

    if (step.target && !targetElement) {
      throw new Error(`target not found: ${step.target}`);
    }

    targetElement?.scrollIntoView({
      block: "center",
      inline: "nearest",
    });

    measureTimeoutRef.current = window.setTimeout(() => {
      const measuredHeight = getDocumentHeight(frameDocument);
      setFrameHeight(Math.max(device.frameHeight, measuredHeight));
      onControlStatusChange?.({
        mode: "auto",
        message: null,
      });
    }, 120);
  };

  const handleLoad = () => {
    if (previewMode !== "auto") {
      applyManualControl();
      return;
    }

    try {
      applyAutoControl();
    } catch {
      applyManualControl(true);
    }
  };

  return (
    <div
      ref={shellRef}
      className="preview-frame-shell"
      style={{
        "--preview-device-width": `${device.width}px`,
        "--preview-frame-height": `${frameHeight}px`,
        "--preview-frame-scale": frameScale,
        "--preview-shell-height": `${frameHeight * frameScale}px`,
      }}
    >
      <iframe
        key={`${src}-${device.width}`}
        ref={iframeRef}
        title={`${project.title} ${step.title} preview`}
        src={src}
        width={device.width}
        height={frameHeight}
        onLoad={handleLoad}
        onError={onUnavailable}
      />
    </div>
  );
};

export default PreviewFrame;
