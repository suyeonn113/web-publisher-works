export const flights = [
  {
    id: 'rs715-icn-kix-20260514',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS715',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'KIX',
        city: '오사카',
        airport: '간사이',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-14',
      departureTime: '15:20',
      arrivalDate: '2026-05-14',
      arrivalTime: '17:00',
      durationMinutes: 100,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 123500,
        seatsLeft: 1,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 178500,
        seatsLeft: 2,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 378500,
        seatsLeft: 4,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 7,
    },
  },
  {
    id: 'rs716-kix-icn-20260521',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS716',

    route: {
      from: {
        code: 'KIX',
        city: '오사카',
        airport: '간사이',
        terminal: 'T1',
      },
      to: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-21',
      departureTime: '18:10',
      arrivalDate: '2026-05-21',
      arrivalTime: '20:05',
      durationMinutes: 115,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 152500,
        seatsLeft: 1,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 192500,
        seatsLeft: 2,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 414700,
        seatsLeft: 3,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 6,
    },
  },
  {
    id: 'rs705-icn-nrt-20260516',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS705',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-16',
      departureTime: '10:10',
      arrivalDate: '2026-05-16',
      arrivalTime: '12:40',
      durationMinutes: 150,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 129900,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 189900,
        seatsLeft: 5,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 389900,
        seatsLeft: 8,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 15,
    },
  },
  {
    id: 'rs901-gmp-cju-20260517',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS901',

    route: {
      from: {
        code: 'GMP',
        city: '서울',
        airport: '김포',
        terminal: 'Domestic',
      },
      to: {
        code: 'CJU',
        city: '제주',
        airport: '제주',
        terminal: 'Domestic',
      },
    },

    schedule: {
      departureDate: '2026-05-17',
      departureTime: '08:30',
      arrivalDate: '2026-05-17',
      arrivalTime: '09:50',
      durationMinutes: 80,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 39900,
        seatsLeft: 4,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 69900,
        seatsLeft: 8,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 119900,
        seatsLeft: 12,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 24,
    },
  },
  {
    id: 'rs511-icn-dad-20260602',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS511',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'DAD',
        city: '다낭',
        airport: '다낭',
        terminal: 'International',
      },
    },

    schedule: {
      departureDate: '2026-06-02',
      departureTime: '18:45',
      arrivalDate: '2026-06-02',
      arrivalTime: '22:30',
      durationMinutes: 285,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 159900,
        seatsLeft: 3,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 239900,
        seatsLeft: 6,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 489900,
        seatsLeft: 10,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 19,
    },
  },
  {
    id: 'rs527-icn-cxr-20260608',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS527',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'CXR',
        city: '나트랑',
        airport: '깜란',
        terminal: 'International',
      },
    },

    schedule: {
      departureDate: '2026-06-08',
      departureTime: '20:20',
      arrivalDate: '2026-06-09',
      arrivalTime: '00:25',
      durationMinutes: 305,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 169900,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 249900,
        seatsLeft: 5,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 529900,
        seatsLeft: 9,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 16,
    },
  },
  {
    id: 'rs703-icn-nrt-20260518',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS703',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-18',
      departureTime: '16:45',
      arrivalDate: '2026-05-18',
      arrivalTime: '19:10',
      durationMinutes: 145,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 223500,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 313500,
        seatsLeft: 5,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 453500,
        seatsLeft: 7,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 14,
    },
  },
  {
    id: 'rs703-icn-nrt-20260519',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS703',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-19',
      departureTime: '16:45',
      arrivalDate: '2026-05-19',
      arrivalTime: '19:10',
      durationMinutes: 145,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 223500,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 313500,
        seatsLeft: 5,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 453500,
        seatsLeft: 7,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 14,
    },
  },
  {
    id: 'rs703-icn-nrt-20260520',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS703',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-20',
      departureTime: '16:45',
      arrivalDate: '2026-05-20',
      arrivalTime: '19:10',
      durationMinutes: 145,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 223500,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 313500,
        seatsLeft: 5,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 453500,
        seatsLeft: 7,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 14,
    },
  },
  {
    id: 'rs703-icn-nrt-20260521',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS703',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-21',
      departureTime: '16:45',
      arrivalDate: '2026-05-21',
      arrivalTime: '19:10',
      durationMinutes: 145,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 238500,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 328500,
        seatsLeft: 5,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 453500,
        seatsLeft: 7,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 14,
    },
  },
  {
    id: 'rs703-icn-nrt-20260522',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS703',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-22',
      departureTime: '16:45',
      arrivalDate: '2026-05-22',
      arrivalTime: '19:10',
      durationMinutes: 145,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 273500,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 363500,
        seatsLeft: 5,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 453500,
        seatsLeft: 7,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 14,
    },
  },
  {
    id: 'rs703-icn-nrt-20260523',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS703',

    route: {
      from: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
      to: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-23',
      departureTime: '16:45',
      arrivalDate: '2026-05-23',
      arrivalTime: '19:10',
      durationMinutes: 145,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 248500,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 338500,
        seatsLeft: 5,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 453500,
        seatsLeft: 7,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 14,
    },
  },
  {
    id: 'rs706-nrt-icn-20260521',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS706',

    route: {
      from: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
      to: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-21',
      departureTime: '11:40',
      arrivalDate: '2026-05-21',
      arrivalTime: '14:20',
      durationMinutes: 160,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 158100,
        seatsLeft: 3,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 258100,
        seatsLeft: 6,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 468100,
        seatsLeft: 9,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 18,
    },
  },
  {
    id: 'rs706-nrt-icn-20260522',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS706',

    route: {
      from: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
      to: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-22',
      departureTime: '11:40',
      arrivalDate: '2026-05-22',
      arrivalTime: '14:20',
      durationMinutes: 160,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 158100,
        seatsLeft: 3,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 258100,
        seatsLeft: 6,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 468100,
        seatsLeft: 9,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 18,
    },
  },
  {
    id: 'rs706-nrt-icn-20260523',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS706',

    route: {
      from: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
      to: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-23',
      departureTime: '11:40',
      arrivalDate: '2026-05-23',
      arrivalTime: '14:20',
      durationMinutes: 160,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 168100,
        seatsLeft: 3,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 268100,
        seatsLeft: 6,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 468100,
        seatsLeft: 9,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 18,
    },
  },
  {
    id: 'rs702-nrt-icn-20260523',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS702',

    route: {
      from: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
      to: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-23',
      departureTime: '12:50',
      arrivalDate: '2026-05-23',
      arrivalTime: '15:30',
      durationMinutes: 160,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 168100,
        seatsLeft: 9,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 268100,
        seatsLeft: 6,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 468100,
        seatsLeft: 9,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 24,
    },
  },
  {
    id: 'rs704-nrt-icn-20260523',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS704',

    route: {
      from: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
      to: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-23',
      departureTime: '20:10',
      arrivalDate: '2026-05-23',
      arrivalTime: '22:50',
      durationMinutes: 160,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 158100,
        seatsLeft: 2,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 258100,
        seatsLeft: 6,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 468100,
        seatsLeft: 9,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 17,
    },
  },
  {
    id: 'rs706-nrt-icn-20260524',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS706',

    route: {
      from: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
      to: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-24',
      departureTime: '11:40',
      arrivalDate: '2026-05-24',
      arrivalTime: '14:20',
      durationMinutes: 160,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 168100,
        seatsLeft: 3,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 268100,
        seatsLeft: 6,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 468100,
        seatsLeft: 9,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 18,
    },
  },
  {
    id: 'rs706-nrt-icn-20260525',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS706',

    route: {
      from: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
      to: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-25',
      departureTime: '11:40',
      arrivalDate: '2026-05-25',
      arrivalTime: '14:20',
      durationMinutes: 160,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 378100,
        seatsLeft: 3,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 418100,
        seatsLeft: 6,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 468100,
        seatsLeft: 9,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 18,
    },
  },
  {
    id: 'rs706-nrt-icn-20260526',
    airline: {
      name: '에어서울',
      code: 'RS',
    },
    flightNo: 'RS706',

    route: {
      from: {
        code: 'NRT',
        city: '도쿄',
        airport: '나리타',
        terminal: 'T1',
      },
      to: {
        code: 'ICN',
        city: '서울',
        airport: '인천',
        terminal: 'T1',
      },
    },

    schedule: {
      departureDate: '2026-05-26',
      departureTime: '11:40',
      arrivalDate: '2026-05-26',
      arrivalTime: '14:20',
      durationMinutes: 160,
    },

    fares: {
      currency: 'KRW',
      special: {
        label: '특가운임',
        price: 223100,
        seatsLeft: 3,
        baggageIncluded: false,
      },
      discount: {
        label: '할인운임',
        price: 323100,
        seatsLeft: 6,
        baggageIncluded: true,
      },
      normal: {
        label: '정상운임',
        price: 468100,
        seatsLeft: 9,
        baggageIncluded: true,
      },
    },

    availability: {
      status: 'available',
      seatsLeft: 18,
    },
  },
];
