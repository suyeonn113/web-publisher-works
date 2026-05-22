import { heroSlides } from '../data/heroSlides';
import { getFlightsWithFares } from './flightSearch';

function getAvailableFares(flight) {
  return Object.values(flight.fares ?? {}).filter((fare) => {
    return typeof fare.price === 'number';
  });
}

function getLowestFare(flight) {
  const fares = getAvailableFares(flight);

  if (fares.length === 0) return null;

  return fares.reduce((lowestFare, currentFare) => {
    return currentFare.price < lowestFare.price ? currentFare : lowestFare;
  });
}

function getLowestFlightByDestination(toCode) {
  const matchedFlights = getFlightsWithFares().filter((flight) => {
    return (
      flight.route?.to?.code === toCode &&
      flight.availability?.status === 'available'
    );
  });

  if (matchedFlights.length === 0) return null;

  return matchedFlights.reduce((lowestFlight, currentFlight) => {
    const lowestFare = getLowestFare(lowestFlight);
    const currentFare = getLowestFare(currentFlight);

    if (!lowestFare) return currentFlight;
    if (!currentFare) return lowestFlight;

    return currentFare.price < lowestFare.price ? currentFlight : lowestFlight;
  });
}

export function getHeroSlidesWithLowestFares() {
  return heroSlides.map((slide) => {
    const flight = getLowestFlightByDestination(slide.toCode);
    const lowestFare = flight ? getLowestFare(flight) : null;

    return {
      ...slide,
      flight,
      lowestFare,
    };
  });
}
