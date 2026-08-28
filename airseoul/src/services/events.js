import { getAppNow, toDate } from '../utils/date';

const parseEventDate = (dateText) => {
  if (!dateText) return null;

  const date = toDate(dateText.replaceAll('.', '-'));
  return Number.isNaN(date.getTime()) ? null : date;
};

const getDateOnly = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const isEventActive = (eventItem, referenceDate = getAppNow()) => {
  if (eventItem?.isActive !== true) return false;

  const currentDate = getDateOnly(referenceDate);
  const startDate = parseEventDate(eventItem.startDate);
  const endDate = parseEventDate(eventItem.endDate);

  if (eventItem.startDate && !startDate) return false;
  if (eventItem.endDate && !endDate) return false;
  if (startDate && currentDate < startDate) return false;
  if (endDate && currentDate > endDate) return false;

  return true;
};

export const getActiveEvents = (eventItems, referenceDate = getAppNow()) => {
  return eventItems.filter((eventItem) => isEventActive(eventItem, referenceDate));
};