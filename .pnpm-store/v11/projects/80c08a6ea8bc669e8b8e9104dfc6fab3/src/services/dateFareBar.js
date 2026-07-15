import { searchFlights } from './flightSearch';
import { addDays, formatDate, toDate } from '../utils/date';

export const getDateFareBarItems = ({ from, to, baseDate, range = 3 }) => {
  const base = toDate(baseDate);

  return Array.from({ length: range * 2 + 1 }, (_, index) => {
    const date = formatDate(addDays(base, index - range));
    const dayFlights = searchFlights({ from, to, departureDate: date });
    const lowestSpecialPrice = dayFlights.reduce((lowestPrice, flight) => {
      if (flight.availability.seatsLeft <= 0 || flight.fares.special.seatsLeft <= 0) {
        return lowestPrice;
      }

      const price = flight.fares.special.price;
      return lowestPrice === null || price < lowestPrice ? price : lowestPrice;
    }, null);

    return {
      date,
      price: lowestSpecialPrice,
      isSelected: date === baseDate,
    };
  });
};
