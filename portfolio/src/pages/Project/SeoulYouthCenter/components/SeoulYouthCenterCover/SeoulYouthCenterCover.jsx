import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { prepareProjectDetail } from "../../../../../utils/projectHelpers";
import "./SeoulYouthCenterCover.scss";

const coverImages = {
  main: "/images/projects/seoul-youth-center/main-desktop.png",
};

const previewDevices = [
  {
    key: "desktop",
    label: "PC preview",
    width: 1440,
    height: 810,

    // 로컬에서 iframe 내부 접근이 불가능할 때 사용하는 임시 높이
    pageHeight: 4900,
    scrollbarGutter: 18,

    Icon: () => (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="3" y="5" width="18" height="12" rx="1.5" />
        <path d="M9 21h6" />
        <path d="M12 17v4" />
      </svg>
    ),
  },
  {
    key: "tablet",
    label: "Tablet preview",
    width: 834,
    height: 1112,
    pageHeight: 4650,
    scrollbarGutter: 14,

    Icon: () => (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  {
    key: "mobile",
    label: "Mobile preview",
    width: 390,
    height: 844,
    pageHeight: 4750,
    scrollbarGutter: 10,

    Icon: () => (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <rect x="8" y="2.5" width="8" height="19" rx="2" />
        <path d="M11 18.5h2" />
      </svg>
    ),
  },
];

const clamp = (value, min, max) =>
  Math.min(max, Math.max(min, value));

const SeoulYouthCenterCover = ({ project }) => {
  const iframeRef = useRef(null);
  const previewFrameRef = useRef(null);
  const previewTrackRef = useRef(null);

  const iframeResizeObserverRef = useRef(null);
  const iframeScrollCleanupRef = useRef(null);
  const iframeLoadedRef = useRef(false);

  const pointerAnimationFrameRef = useRef(null);
  const pendingPointerYRef = useRef(null);
  const isPreviewDraggingRef = useRef(false);

  const [previewDevice, setPreviewDevice] = useState(
    previewDevices[0],
  );

  const [previewScroll, setPreviewScroll] = useState(0);
  const [previewPageHeight, setPreviewPageHeight] = useState(
    previewDevices[0].pageHeight,
  );

  const [previewMode, setPreviewMode] = useState("pending");
  const [isPreviewDragging, setIsPreviewDragging] =
    useState(false);

  const [previewFrame, setPreviewFrame] = useState({
    width: 0,
    height: 0,
  });

  const disconnectIframeMeasurement = useCallback(() => {
    iframeResizeObserverRef.current?.disconnect();
    iframeResizeObserverRef.current = null;

    iframeScrollCleanupRef.current?.();
    iframeScrollCleanupRef.current = null;
  }, []);

  const getIframeDocument = useCallback(() => {
    const iframeElement = iframeRef.current;

    if (!iframeElement) {
      return null;
    }

    return (
      iframeElement.contentDocument ||
      iframeElement.contentWindow?.document ||
      null
    );
  }, []);

  const getDocumentHeight = useCallback((iframeDocument) => {
    if (!iframeDocument) {
      return 0;
    }

    const documentElement = iframeDocument.documentElement;
    const body = iframeDocument.body;

    return Math.max(
      documentElement?.scrollHeight ?? 0,
      documentElement?.offsetHeight ?? 0,
      body?.scrollHeight ?? 0,
      body?.offsetHeight ?? 0,
    );
  }, []);

  const setupIframeMeasurement = useCallback(() => {
    disconnectIframeMeasurement();

    const iframeElement = iframeRef.current;

    if (!iframeElement) {
      return;
    }

    try {
      const iframeDocument = getIframeDocument();
      const iframeWindow = iframeElement.contentWindow;

      if (!iframeDocument || !iframeWindow) {
        throw new Error("Iframe document is unavailable.");
      }

      const updatePageHeight = () => {
        const nextHeight = getDocumentHeight(iframeDocument);

        if (nextHeight > 0) {
          setPreviewPageHeight(nextHeight);
        }
      };

      setPreviewMode("same-origin");
      updatePageHeight();

      const resizeObserver = new ResizeObserver(() => {
        updatePageHeight();
      });

      if (iframeDocument.documentElement) {
        resizeObserver.observe(iframeDocument.documentElement);
      }

      if (iframeDocument.body) {
        resizeObserver.observe(iframeDocument.body);
      }

      iframeResizeObserverRef.current = resizeObserver;

      const handleIframeScroll = () => {
        const documentHeight = getDocumentHeight(iframeDocument);
        const maxScrollTop = Math.max(
          0,
          documentHeight - previewDevice.height,
        );

        const nextScroll =
          maxScrollTop > 0
            ? (iframeWindow.scrollY / maxScrollTop) * 100
            : 0;

        setPreviewScroll((currentScroll) => {
          if (Math.abs(currentScroll - nextScroll) < 0.05) {
            return currentScroll;
          }

          return clamp(nextScroll, 0, 100);
        });
      };

      iframeWindow.addEventListener("scroll", handleIframeScroll, {
        passive: true,
      });

      iframeScrollCleanupRef.current = () => {
        iframeWindow.removeEventListener(
          "scroll",
          handleIframeScroll,
        );
      };

      iframeWindow.scrollTo(0, 0);
      setPreviewScroll(0);
    } catch {
      setPreviewMode("fallback");
      setPreviewPageHeight(previewDevice.pageHeight);
      setPreviewScroll(0);
    }
  }, [
    disconnectIframeMeasurement,
    getDocumentHeight,
    getIframeDocument,
    previewDevice.height,
    previewDevice.pageHeight,
  ]);

  useEffect(() => {
    const previewFrameElement = previewFrameRef.current;

    if (!previewFrameElement) {
      return undefined;
    }

    const updatePreviewFrame = () => {
      const { width, height } =
        previewFrameElement.getBoundingClientRect();

      setPreviewFrame({
        width,
        height,
      });
    };

    updatePreviewFrame();

    const resizeObserver = new ResizeObserver(updatePreviewFrame);
    resizeObserver.observe(previewFrameElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    setPreviewScroll(0);
    setPreviewPageHeight(previewDevice.pageHeight);

    if (!iframeLoadedRef.current) {
      return undefined;
    }

    const animationFrameId = requestAnimationFrame(() => {
      setupIframeMeasurement();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [previewDevice, setupIframeMeasurement]);

  useEffect(() => {
    if (previewMode !== "same-origin") {
      return;
    }

    const iframeElement = iframeRef.current;
    const iframeWindow = iframeElement?.contentWindow;

    if (!iframeWindow) {
      return;
    }

    const maxScrollTop = Math.max(
      0,
      previewPageHeight - previewDevice.height,
    );

    const nextScrollTop =
      maxScrollTop * (previewScroll / 100);

    iframeWindow.scrollTo({
      top: nextScrollTop,
      left: 0,
      behavior: "auto",
    });
  }, [
    previewDevice.height,
    previewMode,
    previewPageHeight,
    previewScroll,
  ]);

  useEffect(() => {
    return () => {
      disconnectIframeMeasurement();

      if (pointerAnimationFrameRef.current !== null) {
        cancelAnimationFrame(
          pointerAnimationFrameRef.current,
        );
      }
    };
  }, [disconnectIframeMeasurement]);

  const updatePreviewScroll = useCallback((clientY) => {
    const previewTrackElement = previewTrackRef.current;

    if (!previewTrackElement) {
      return;
    }

    const { top, height } =
      previewTrackElement.getBoundingClientRect();

    if (height <= 0) {
      return;
    }

    const nextValue = ((clientY - top) / height) * 100;

    setPreviewScroll(clamp(nextValue, 0, 100));
  }, []);

  const schedulePreviewScroll = useCallback(
    (clientY) => {
      pendingPointerYRef.current = clientY;

      if (pointerAnimationFrameRef.current !== null) {
        return;
      }

      pointerAnimationFrameRef.current =
        requestAnimationFrame(() => {
          if (pendingPointerYRef.current !== null) {
            updatePreviewScroll(
              pendingPointerYRef.current,
            );
          }

          pendingPointerYRef.current = null;
          pointerAnimationFrameRef.current = null;
        });
    },
    [updatePreviewScroll],
  );

  if (!project) {
    return <p>Project information was not found.</p>;
  }

  const projectDetail = prepareProjectDetail(project);

  const coverTitle =
    project.projectName ??
    `${project.title} 웹사이트 리뉴얼`;

  const previewScale =
    previewFrame.height > 0
      ? previewFrame.height / previewDevice.height
      : 1;

  const previewWidth =
    previewDevice.width * previewScale;

  const previewScrollbarCover =
    previewDevice.scrollbarGutter * previewScale;

  const fallbackScrollableHeight = Math.max(
    0,
    previewPageHeight * previewScale - previewFrame.height,
  );

  const fallbackOffset =
    fallbackScrollableHeight * (previewScroll / 100);

  const previewLeft = Math.max(
    0,
    (previewFrame.width - previewWidth) / 2,
  );

  const isFallbackMode = previewMode === "fallback";

  const iframeHeight = isFallbackMode
    ? previewPageHeight
    : previewDevice.height;

  const iframeTransform = isFallbackMode
    ? `translate3d(0, ${-fallbackOffset}px, 0) scale(${previewScale})`
    : `scale(${previewScale})`;

  return (
    <div className="ppt-page-wrap seoul-youth-center__cover-wrap">
      <section
        className="ppt-page seoul-youth-center__cover"
        aria-labelledby="seoul-youth-center-title"
      >
        <div className="seoul-youth-center__cover-copy">
          <p className="seoul-youth-center__eyebrow">
            {projectDetail.eyebrow}
          </p>

          <div className="seoul-youth-center__title-group">
            <p>{project.englishTitle}</p>

            <h1 id="seoul-youth-center-title">
              {coverTitle}
            </h1>

            <p className="seoul-youth-center__summary">
              {project.summary}
            </p>
          </div>
        </div>

        <figure
          className="seoul-youth-center__cover-image motion-fade-up"
          aria-label={`${project.title} 메인 화면`}
        >
          {project.liveUrl ? (
            <div
              className="seoul-youth-center__iframe-wrap no-print"
              ref={previewFrameRef}
              style={{
                "--preview-left": `${previewLeft}px`,
                "--preview-rendered-width": `${previewWidth}px`,
                "--preview-scrollbar-cover": `${previewScrollbarCover}px`,
              }}
            >
              <iframe
                ref={iframeRef}
                src={project.liveUrl}
                title={`${project.title} live website preview`}
                loading="lazy"
                onLoad={() => {
                  iframeLoadedRef.current = true;
                  setupIframeMeasurement();
                }}
                style={{
                  width: `${previewDevice.width}px`,
                  height: `${iframeHeight}px`,
                  left: `${previewLeft}px`,
                  top: 0,

                  transform: iframeTransform,
                  transformOrigin: "top left",
                  willChange: "transform",
                }}
              />
            </div>
          ) : null}

          <img
            className="print-only"
            src={coverImages.main}
            alt={`${project.title} 메인 화면`}
          />

          {project.liveUrl ? (
            <div
              className={[
                "seoul-youth-center__preview-controls",
                "no-print",
                isPreviewDragging ? "is-dragging" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-label="Preview controls"
            >
              <div
                className="seoul-youth-center__device-controls"
                aria-label="Preview device controls"
              >
                {previewDevices.map(
                  ({ key, label, Icon }) => (
                    <button
                      type="button"
                      key={key}
                      className={
                        previewDevice.key === key
                          ? "is-active"
                          : ""
                      }
                      aria-label={label}
                      aria-pressed={
                        previewDevice.key === key
                      }
                      onClick={() => {
                        const nextDevice =
                          previewDevices.find(
                            (device) => device.key === key,
                          );

                        if (nextDevice) {
                          setPreviewDevice(nextDevice);
                        }
                      }}
                    >
                      <Icon />
                    </button>
                  ),
                )}
              </div>

              <span
                ref={previewTrackRef}
                className="seoul-youth-center__preview-track"
                aria-hidden="true"
                onPointerDown={(event) => {
                  isPreviewDraggingRef.current = true;
                  setIsPreviewDragging(true);

                  event.currentTarget.setPointerCapture(
                    event.pointerId,
                  );

                  schedulePreviewScroll(event.clientY);
                }}
                onPointerMove={(event) => {
                  if (!isPreviewDraggingRef.current) {
                    return;
                  }

                  schedulePreviewScroll(event.clientY);
                }}
                onPointerUp={(event) => {
                  isPreviewDraggingRef.current = false;
                  setIsPreviewDragging(false);

                  if (
                    event.currentTarget.hasPointerCapture(
                      event.pointerId,
                    )
                  ) {
                    event.currentTarget.releasePointerCapture(
                      event.pointerId,
                    );
                  }
                }}
                onPointerCancel={() => {
                  isPreviewDraggingRef.current = false;
                  setIsPreviewDragging(false);
                }}
              >
                <span
                  className="seoul-youth-center__preview-thumb"
                  style={{
                    top: `${previewScroll}%`,
                  }}
                />
              </span>

              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={previewScroll}
                aria-label="Preview scroll position"
                onChange={(event) => {
                  setPreviewScroll(
                    Number(event.target.value),
                  );
                }}
              />
            </div>
          ) : null}
        </figure>

        <div className="seoul-youth-center__links no-print">
          {project.liveUrl ? (
            <a
              className="hover-lift"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              View website
            </a>
          ) : null}

          {project.githubUrl ? (
            <a
              className="hover-lift"
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default SeoulYouthCenterCover;