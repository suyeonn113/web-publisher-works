import { airports } from '../data/airports';

export const getAirport = (code) => airports.find((airport) => airport.code === code);

export const formatAirportDisplayName = (airport, { separator = '/' } = {}) => {
  if (!airport) {
    return '';
  }

  if (airport.city === airport.airport || airport.city.includes(airport.airport)) {
    return airport.city;
  }

  return `${airport.city}${separator}${airport.airport}`;
};
