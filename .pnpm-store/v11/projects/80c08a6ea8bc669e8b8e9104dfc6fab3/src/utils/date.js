import { APP_BASE_DATE } from '../constants/appDate';

export const toDate = (dateText) => new Date(`${dateText}T00:00:00`);

export const getAppNow = () => {
  const realNow = new Date();
  const appBaseDate = toDate(APP_BASE_DATE);

  return new Date(
    appBaseDate.getFullYear(),
    appBaseDate.getMonth(),
    appBaseDate.getDate(),
    realNow.getHours(),
    realNow.getMinutes(),
    realNow.getSeconds(),
    realNow.getMilliseconds()
  );
};

export const addDays = (date, days) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
};

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getAppDateText = () => formatDate(getAppNow());

export const formatKoreanMonthDay = (dateText) => {
  if (!dateText) {
    return '';
  }

  const date = toDate(dateText);
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${month}월 ${day}일 (${weekdays[date.getDay()]})`;
};

export const formatRealtimeDateTime = () => {
  const now = getAppNow();

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day}(${weekdays[now.getDay()]}) ${hours}:${minutes}`;
};