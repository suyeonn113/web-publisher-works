import {
  detailTypeMap,
  platformMap,
  responsibilityMap,
  siteTypeMap,
  techMap,
  workTypeMap,
} from "../constants/projectOptions";

export const getProjectOptionLabel = (map, key) => map[key] ?? key;

export const getProjectOptionLabels = (map, keys = []) =>
  keys.map((key) => getProjectOptionLabel(map, key));

export const joinProjectLabels = (items = []) =>
  items.filter(Boolean).join(" · ");

export const formatProjectPeriod = ({ start, end }) => {
  const formatDate = (date) => date.replace("-", ".");

  return `${formatDate(start)} – ${end ? formatDate(end) : "Present"}`;
};

export const formatProjectContribution = (contribution) =>
  typeof contribution === "number" ? `${contribution}%` : contribution;

export const getProjectTechItems = (keys = []) =>
  keys.map((key) => ({
    key,
    label: techMap[key]?.label ?? key,
    Icon: techMap[key]?.Icon,
  }));

export const getProjectTechLabels = (keys = []) =>
  keys.map((key) => techMap[key]?.label ?? key);

export const getProjectTypeLabels = (project) => [
  ...getProjectOptionLabels(platformMap, project.platforms),
  getProjectOptionLabel(siteTypeMap, project.siteType),
  getProjectOptionLabel(workTypeMap, project.workType),
];

export const getProjectOverviewItems = (project) => [
  {
    label: "Project",
    value: project.projectName,
  },
  {
    label: "Type",
    value: joinProjectLabels(getProjectTypeLabels(project)),
  },
  {
    label: "Period",
    value: formatProjectPeriod(project.period),
  },
  {
    label: "Role",
    value: joinProjectLabels(
      getProjectOptionLabels(responsibilityMap, project.responsibilities),
    ),
  },
  {
    label: "Contribution",
    value: formatProjectContribution(project.contribution),
  },
  {
    label: "Target",
    value: joinProjectLabels(project.target),
  },
  {
    label: "Objective",
    value: project.objective,
  },
  {
    label: "Scope",
    value: joinProjectLabels(project.scope),
  },
  {
    label: "Environment & Tools",
    value: joinProjectLabels(getProjectTechLabels(project.tech)),
  },
];

export const prepareProjectDetail = (project) => {
  const platformLabels = getProjectOptionLabels(
    platformMap,
    project.platforms,
  );
  const responsibilityLabels = getProjectOptionLabels(
    responsibilityMap,
    project.responsibilities,
  );

  return {
    eyebrow: [
      getProjectOptionLabel(detailTypeMap, project.detailType),
      ...platformLabels,
    ].join(" · "),
    periodLabel: formatProjectPeriod(project.period),
    siteTypeLabel: getProjectOptionLabel(siteTypeMap, project.siteType),
    workTypeLabel: getProjectOptionLabel(workTypeMap, project.workType),
    responsibilityLabels,
    responsibilityLabel: responsibilityLabels.join(" · "),
    techItems: getProjectTechItems(project.tech),
  };
};
