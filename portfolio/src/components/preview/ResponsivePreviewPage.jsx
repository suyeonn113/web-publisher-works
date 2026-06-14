import { useCallback, useMemo, useState } from "react";

import DeviceSwitcher from "./DeviceSwitcher";
import PreviewGuidePanel from "./PreviewGuidePanel";
import PreviewHeader from "./PreviewHeader";
import PreviewStage from "./PreviewStage";
import PreviewStepNavigation from "./PreviewStepNavigation";
import { NotFoundPage } from "../../pages/NotFound";
import "./ResponsivePreviewPage.scss";

const ResponsivePreviewPage = ({ project, preview }) => {
  const [selectedDevice, setSelectedDevice] = useState(preview.defaultDevice);
  const [selectedStepId, setSelectedStepId] = useState(
    preview.reviewSteps[0]?.id,
  );
  const [controlStatus, setControlStatus] = useState({
    mode: preview.mode,
    message: null,
  });
  const [isPreviewUnavailable, setIsPreviewUnavailable] = useState(false);

  const handleControlStatusChange = useCallback((status) => {
    setControlStatus(status);
  }, []);

  const handleDeviceChange = useCallback((device) => {
    setSelectedDevice(device);
    setIsPreviewUnavailable(false);
  }, []);

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

  const selectedDeviceConfig =
    preview.devices[selectedDevice] ?? preview.devices[preview.defaultDevice];

  if (!selectedStep || !selectedDeviceConfig) {
    return <NotFoundPage project={project} />;
  }

  return (
    <main className="responsive-preview-page">
      <PreviewHeader project={project} />
      <DeviceSwitcher
        devices={preview.devices}
        selectedDevice={selectedDevice}
        onChange={handleDeviceChange}
      />
      <PreviewStepNavigation
        steps={preview.reviewSteps}
        selectedStepId={selectedStep.id}
        onChange={handleStepChange}
      />
      <PreviewStage
        project={project}
        previewMode={preview.mode}
        step={selectedStep}
        device={selectedDeviceConfig}
        deviceKey={selectedDevice}
        controlMessage={controlStatus.message}
        onControlStatusChange={handleControlStatusChange}
        unavailable={isPreviewUnavailable}
        onUnavailable={() => setIsPreviewUnavailable(true)}
      />
      <PreviewGuidePanel
        preview={preview}
        step={selectedStep}
        controlMode={controlStatus.mode}
      />
    </main>
  );
};

export default ResponsivePreviewPage;
