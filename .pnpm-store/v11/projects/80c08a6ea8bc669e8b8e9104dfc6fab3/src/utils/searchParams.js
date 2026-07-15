import { TRIP_TYPES } from '../constants/tripType';
import { addDays, formatDate, toDate } from './date';

export const sortSelectedDates = (dates) =>
  [...dates].sort((a, b) => toDate(a).getTime() - toDate(b).getTime());

export const createOneWaySearchParams = ({ from, to, departureDate }) => ({
  tripType: TRIP_TYPES.ONE_WAY,
  from,
  to,
  departureDate,
});

export const createRoundTripSearchParams = ({ from, to, departureDate, returnDate }) => ({
  tripType: TRIP_TYPES.ROUND_TRIP,
  from,
  to,
  departureDate,
  returnDate,
});

export const createSearchParamsFromCalendar = ({ tripType, from, to, selectedDates }) => {
  if (tripType === TRIP_TYPES.ONE_WAY) {
    return createOneWaySearchParams({
      from,
      to,
      departureDate: selectedDates[0],
    });
  }

  const [departureDate, returnDate] = sortSelectedDates(selectedDates);

  return createRoundTripSearchParams({
    from,
    to,
    departureDate,
    returnDate,
  });
};

export const createFixedRoundTripSearchParams = ({ from, to, baseDate, stayDays = 7 }) =>
  createRoundTripSearchParams({
    from,
    to,
    departureDate: baseDate,
    returnDate: formatDate(addDays(toDate(baseDate), stayDays)),
  });
