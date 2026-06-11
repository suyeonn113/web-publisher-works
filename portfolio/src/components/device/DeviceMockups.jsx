import "./DeviceMockups.scss";

const DEVICE_LABELS = {
  desktop: "PC screen",
  mobile: "Mobile screen",
};

export const DeviceFrame = ({
  type = "desktop",
  src,
  alt = "",
  className = "",
  imageClassName = "",
  url,
  loading = "eager",
}) => {
  const frameClassName = [
    "device-frame",
    `device-frame--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={frameClassName}>
      {type === "desktop" ? (
        <div className="device-frame__browser-bar" aria-hidden="true">
          <span className="device-frame__traffic-lights">
            <span />
            <span />
            <span />
          </span>

          <span className="device-frame__browser-sidebar" />

          <span className="device-frame__browser-navigation">
            <span className="device-frame__browser-back" />
            <span className="device-frame__browser-forward" />
          </span>

          <span className="device-frame__address">
            <span className="device-frame__address-lock" />
            <span className="device-frame__address-text">{url}</span>
            <svg
              className="device-frame__address-reload"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M21 12a9 9 0 1 1-2.64-6.36L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
          </span>

          <span className="device-frame__browser-actions">
            <span className="device-frame__browser-share" />
            <span className="device-frame__browser-new-tab" />
            <span className="device-frame__browser-tabs" />
          </span>
        </div>
      ) : (
        <div className="device-frame__phone-top" aria-hidden="true">
          <span className="device-frame__dynamic-island" />
        </div>
      )}

      <div className="device-frame__screen">
        <img
          className={imageClassName || undefined}
          src={src}
          alt={alt}
          loading={loading}
          fetchPriority={loading === "eager" ? "high" : undefined}
        />
      </div>
    </div>
  );
};

const normalizeDevice = (device, type) => {
  if (typeof device === "string") {
    return {
      src: device,
      alt: DEVICE_LABELS[type],
    };
  }

  return device;
};

export const DeviceShowcase = ({
  desktop,
  mobile,
  className = "",
  label,
}) => {
  const desktopDevice = normalizeDevice(desktop, "desktop");
  const mobileDevice = normalizeDevice(mobile, "mobile");
  const showcaseClassName = ["device-showcase", className]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={showcaseClassName} aria-label={label}>
      {desktopDevice ? (
        <DeviceFrame
          type="desktop"
          src={desktopDevice.src}
          alt={desktopDevice.alt}
          url={desktopDevice.url}
          loading={desktopDevice.loading}
          className={[
            "device-showcase__desktop",
            desktopDevice.className,
          ]
            .filter(Boolean)
            .join(" ")}
          imageClassName={desktopDevice.imageClassName}
        />
      ) : null}

      {mobileDevice ? (
        <DeviceFrame
          type="mobile"
          src={mobileDevice.src}
          alt={mobileDevice.alt}
          loading={mobileDevice.loading}
          className={[
            "device-showcase__mobile",
            mobileDevice.className,
          ]
            .filter(Boolean)
            .join(" ")}
          imageClassName={mobileDevice.imageClassName}
        />
      ) : null}
    </figure>
  );
};
