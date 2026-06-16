import { airSeoulPreview } from "./airSeoulPreview";
import { daisoMallPreview } from "./daisoMallPreview";
import { fragfarmPreview } from "./fragfarmPreview";
import { seoulYouthCenterPreview } from "./seoulYouthCenterPreview";

export { getProjectBeforeScreens } from "./beforeScreens";

export const projectPreviews = [
  daisoMallPreview,
  airSeoulPreview,
  seoulYouthCenterPreview,
  fragfarmPreview,
];

export const getProjectPreviewById = (projectId) =>
  projectPreviews.find((preview) => preview.projectId === projectId);