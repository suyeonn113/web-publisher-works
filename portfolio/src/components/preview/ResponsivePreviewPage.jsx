import { useCallback, useEffect, useMemo, useState } from "react";

import DeviceSwitcher from "./DeviceSwitcher";
import PreviewFloatingControls from "./PreviewFloatingControls";
import PreviewHeader from "./PreviewHeader";
import PreviewStage from "./PreviewStage";
import PreviewStepNavigation from "./PreviewStepNavigation";
import { getProjectBeforeScreens } from "../../data/projectPreviews";
import PreviewBeforeSiteModal from "./PreviewBeforeSiteModal";
import { NotFoundPage } from "../../pages/NotFound";
import "./ResponsivePreviewPage.scss";

const [isBeforeScreenOpen, setIsBeforeScreenOpen] = useState(false);
const beforeScreens = getProjectBeforeScreens(preview.projectId);

const isMobileOnlyProject = (project) =>
  project.platforms?.length === 1 && project.platforms.includes("mobile");

const getEnabledDeviceKeys = (project, preview) => {
  const { devices, visibleDevices } = preview;
  const deviceKeys = Object.keys(devices);

  if (isMobileOnlyProject(project)) {
    return deviceKeys.filter((device) => device === "mobile");
  }

  return (visibleDevices ?? deviceKeys).filter((device) =>
    deviceKeys.includes(device),
  );
};

const getInitialDeviceKey = (project, preview) => {
  const enabledDeviceKeys = getEnabledDeviceKeys(project, preview);

  if (enabledDeviceKeys.includes(preview.defaultDevice)) {
    return preview.defaultDevice;
  }

  return enabledDeviceKeys[0] ?? preview.defaultDevice;
};

const ResponsivePreviewPage = ({ project, preview }) => {
  const [selectedDevice, setSelectedDevice] = useState(() =>
    getInitialDeviceKey(project, preview),
  );
  const [selectedStepId, setSelectedStepId] = useState(
    preview.reviewSteps[0]?.id,
  );
  const [isPreviewUnavailable, setIsPreviewUnavailable] = useState(false);
  const [isPageScrollLocked, setIsPageScrollLocked] = useState(false);
  const enabledDeviceKeys = useMemo(
    () => getEnabledDeviceKeys(project, preview),
    [project, preview],
  );

  const handleDeviceChange = useCallback((device) => {
    if (!enabledDeviceKeys.includes(device)) {
      return;
    }

    setSelectedDevice(device);
    setIsPreviewUnavailable(false);
  }, [enabledDeviceKeys]);

  const handleStepChange = useCallback((stepId) => {
    setSelectedStepId(stepId);
    setIsPreviewUnavailable(false);
  }, []);

  const selectedStep = useMemo(
    () =>
      preview.reviewSteps.find((step) => step.id === selectedStepId) ??
      preview.reviewSteps[0],
    [preview.reviewSteps, selectedStepId],
  );

  const disabledDeviceKeys = useMemo(
    () =>
      Object.keys(preview.devices).filter(
        (device) => !enabledDeviceKeys.includes(device),
      ),
    [enabledDeviceKeys, preview.devices],
  );

  const selectedDeviceConfig =
    preview.devices[selectedDevice] ?? preview.devices[preview.defaultDevice];

  useEffect(() => {
    if (!enabledDeviceKeys.includes(selectedDevice)) {
      setSelectedDevice(enabledDeviceKeys[0] ?? preview.defaultDevice);
      setIsPreviewUnavailable(false);
    }
  }, [
    enabledDeviceKeys,
    preview.defaultDevice,
    selectedDevice,
  ]);

  useEffect(() => {
    if (!isPageScrollLocked) {
      return undefined;
    }

    const { body, documentElement } = document;
    const previousBodyOverflow = body.style.overflow;
    const previousDocumentOverflow = documentElement.style.overflow;

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousBodyOverflow;
      documentElement.style.overflow = previousDocumentOverflow;
    };
  }, [isPageScrollLocked]);

  if (!selectedStep || !selectedDeviceConfig) {
    return <NotFoundPage project={project} />;
  }

  return (
    <main
      className={[
        "responsive-preview-page",
        isPageScrollLocked ? "is-page-scroll-locked" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <PreviewFloatingControls
        isPageScrollLocked={isPageScrollLocked}
        onTogglePageScrollLock={onTogglePageScrollLock}
        beforeScreens={beforeScreens}
        onOpenBeforeScreen={() => setIsBeforeScreenOpen(true)}
      />
      <PreviewHeader project={project} preview={preview} />
      <div className="preview-control-row">
        <PreviewStepNavigation
          steps={preview.reviewSteps}
          selectedStepId={selectedStep.id}
          onChange={handleStepChange}
        />
        <DeviceSwitcher
          devices={preview.devices}
          deviceKeys={enabledDeviceKeys}
          selectedDevice={selectedDevice}
          disabledDevices={disabledDeviceKeys}
          onChange={handleDeviceChange}
        />
      </div>
      {selectedStep.features?.length > 0 && (
        <ul className="preview-feature-notes" aria-label={`${selectedStep.title} 구현 포인트`}>
          {selectedStep.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      )}
      <PreviewStage
        project={project}
        step={selectedStep}
        device={selectedDeviceConfig}
        deviceKey={selectedDevice}
        unavailable={isPreviewUnavailable}
        onUnavailable={() => setIsPreviewUnavailable(true)}
      />
    </main>
  );
};

export default ResponsivePreviewPage;
