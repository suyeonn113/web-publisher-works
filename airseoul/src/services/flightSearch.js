import { flightFareRows } from '../data/flightFareRows';
import { flightRows } from '../data/flightRows';

const getFaresByFlightId = () =>
  flightFareRows.reduce((faresByFlightId, fareRow) => {
    const { currency, fareType, flightId, ...fare } = fareRow;
    const fares = faresByFlightId.get(flightId) ?? { currency };

    fares[fareType] = fare;
    faresByFlightId.set(flightId, fares);

    return faresByFlightId;
  }, new Map());

export const getFlightsWithFares = () => {
  const faresByFlightId = getFaresByFlightId();

  return flightRows.map((flight) => ({
    id: flight.id,
    airline: {
      code: flight.airlineCode,
      name: flight.airlineName,
    },
    flightNo: flight.flightNo,
    route: {
      from: {
        code: flight.originCode,
        city: flight.originCity,
        airport: flight.originAirport,
        terminal: flight.originTerminal,
      },
      to: {
        code: flight.destinationCode,
        city: flight.destinationCity,
        airport: flight.destinationAirport,
        terminal: flight.destinationTerminal,
      },
    },
    schedule: {
      departureDate: flight.departureDate,
      departureTime: flight.departureTime,
      arrivalDate: flight.arrivalDate,
      arrivalTime: flight.arrivalTime,
      durationMinutes: flight.durationMinutes,
    },
    fares: faresByFlightId.get(flight.id) ?? {},
    availability: {
      status: flight.availabilityStatus,
      seatsLeft: flight.seatsLeft,
    },
  }));
};

export const searchFlights = ({ from, to, departureDate }) =>
  getFlightsWithFares().filter((flight) => {
    const matchesFrom = !from || flight.route.from.code === from;
    const matchesTo = !to || flight.route.to.code === to;
    const matchesDepartureDate =
      !departureDate || flight.schedule.departureDate === departureDate;

    return matchesFrom && matchesTo && matchesDepartureDate;
  });

export const searchRoundTripFlights = ({ from, to, departureDate, returnDate }) => ({
  outboundFlights: searchFlights({ from, to, departureDate }),
  inboundFlights: searchFlights({
    from: to,
    to: from,
    departureDate: returnDate,
  }),
});
