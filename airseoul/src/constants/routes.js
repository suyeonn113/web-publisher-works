// src/constants/routes.js

export const ROUTES = {
  home: '/',

  booking: {
    root: '/booking',

    flight: '/booking/flight',
    bookingCheck: '/booking/check',
    refund: '/booking/refund',
    checkin: '/booking/checkin',
    flightStatus: '/booking/status',
  },

  travel: {
    root: '/travel',

    seat: '/travel/seat',
    baggage: '/travel/baggage',
    meal: '/travel/meal',
    insurance: '/travel/insurance',

    dutyFree: '/travel/duty-free',
    cafeMint: '/travel/cafe-mint',

    airportService: '/travel/airport-service',
    travelSupport: '/travel/support',
  },

  service: {
    root: '/service',

    cabinService: '/service/cabin-service',
    aircraft: '/service/aircraft',
    groupBooking: '/service/group-booking',
    documents: '/service/documents',
  },

  benefit: {
    root: '/benefit',

    event: '/benefit/event',
    partnership: '/benefit/partnership',
    membership: '/benefit/membership',
  },

  contact: {
    root: '/contact',

    notice: '/contact/notice',
    faq: '/contact/faq',
    inquiry: '/contact/inquiry',
    lost: '/contact/lost',
  },

  auth: {
    login: '/login',
  },
};