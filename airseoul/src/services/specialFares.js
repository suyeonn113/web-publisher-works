import { APP_BASE_DATE } from '../constants/appDate';
import { destinationImages } from '../data/destinationImages';
import { createFixedRoundTripSearchParams } from '../utils/searchParams';
import { getFlightsWithFares } from './flightSearch';

export const getSpecialFareCards = () => {
  const lowestFareByDestination = new Map();

  getFlightsWithFares()
    .filter((flight) => flight.route.from.code === 'ICN')
    .forEach((flight) => {
      const destinationCode = flight.route.to.code;
      const currentFare = lowestFareByDestination.get(destinationCode);

      if (
        !currentFare ||
        flight.fares.special.price < currentFare.fares.special.price
      ) {
        lowestFareByDestination.set(destinationCode, flight);
      }
    });

  return Array.from(lowestFareByDestination.values()).map((flight) => ({
    id: `special-${flight.route.to.code}`,
    from: flight.route.from,
    to: flight.route.to,
    image: destinationImages[flight.route.to.code],
    price: flight.fares.special.price,
    currency: flight.fares.currency,
    searchParams: createFixedRoundTripSearchParams({
      from: flight.route.from.code,
      to: flight.route.to.code,
      baseDate: APP_BASE_DATE,
    }),
  }));
};
