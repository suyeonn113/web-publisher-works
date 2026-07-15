// src/constants/routes.js

export const ROUTES = {
  home: '/',

  company: {
    brandStory: '/company/brand-story',
  },

  booking: {
    root: '/booking',

    flight: '/booking/flight',
    bookingCheck: '/booking/check',
    refund: '/booking/change-refund',
    checkin: '/booking/check-in',
    flightStatus: '/booking/flight-status',
  },

  travel: {
    root: '#',

    seat: '/travel/seat',
    baggage: '/travel/baggage',
    meal: '#',
    insurance: '#',

    dutyFree: '#',
    cafeMint: '#',

    airportService: '/travel/airport-service',
    travelSupport: '#',
  },

  service: {
    root: '#',

    cabinService: '#',
    aircraft: '#',
    groupBooking: '#',
    documents: '#',
  },

  benefit: {
    root: '#',

    event: '/events',
    eventDetail: (eventId) => `/events/${eventId}`,
    partnership: '#',
    membership: '#',
  },

  contact: {
    root: '#',

    notice: '#',
    faq: '#',
    inquiry: '#',
    lost: '#',
  },

  auth: {
    login: '#',
  },
};
