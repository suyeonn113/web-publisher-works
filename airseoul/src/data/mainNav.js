// src/data/mainNav.js

import { ROUTES } from '../constants/routes';

export const mainNav = [
  {
    id: 'booking',
    label: '예약',
    href: ROUTES.booking.root,

    children: [
      { id: 'booking-flight', label: '항공권 예매', href: ROUTES.booking.flight },
      { id: 'booking-check', label: '예약 조회', href: ROUTES.booking.bookingCheck },
      { id: 'booking-refund', label: '변경 및 환불', href: ROUTES.booking.refund },
      { id: 'booking-checkin', label: '체크인', href: ROUTES.booking.checkin },
      { id: 'flight-status', label: '출도착 / 스케줄', href: ROUTES.booking.flightStatus },
    ],
  },

  {
    id: 'travel',
    label: '여행 준비',
    href: ROUTES.travel.root,

    children: [
      { id: 'seat', label: '좌석', href: ROUTES.travel.seat },
      { id: 'baggage', label: '수하물', href: ROUTES.travel.baggage },
      { id: 'meal', label: '기내식', href: ROUTES.travel.meal },
      { id: 'insurance', label: '여행 보험', href: ROUTES.travel.insurance },
      { id: 'airport-service', label: '공항 서비스', href: ROUTES.travel.airportService },
      { id: 'travel-support', label: '여행 지원 안내', href: ROUTES.travel.travelSupport },
    ],
  },

  {
    id: 'service',
    label: '서비스 안내',
    href: ROUTES.service.root,

    children: [
      { id: 'cabin-service', label: '기내 서비스', href: ROUTES.service.cabinService },
      { id: 'aircraft', label: '항공기 안내', href: ROUTES.service.aircraft },
      { id: 'group-booking', label: '단체 예약', href: ROUTES.service.groupBooking },
      { id: 'documents', label: '증빙 및 서류', href: ROUTES.service.documents },
    ],
  },

  {
    id: 'benefit',
    label: '혜택',
    href: ROUTES.benefit.root,

    children: [
      { id: 'event', label: '이벤트', href: ROUTES.benefit.event },
      { id: 'partnership', label: '제휴 혜택', href: ROUTES.benefit.partnership },
      { id: 'membership', label: '멤버십 혜택', href: ROUTES.benefit.membership },
    ],
  },
];
