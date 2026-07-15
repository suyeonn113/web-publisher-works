const GUIDE_CONTENT = {
  airport: {
    title: '공항 서비스',
    sections: [
      {
        id: 'airport-check-in',
        title: '공항 체크인 및 탑승 절차',
        paragraphs: [
          '공항 도착 후 탑승권을 발급하고 필요한 경우 수하물을 위탁합니다.',
          '국제선은 여행 서류 확인, 보안 검색과 출국 심사를 거쳐 탑승구로 이동합니다.',
        ],
      },
      {
        id: 'check-in-restrictions',
        title: '온라인 체크인 제한 대상',
        paragraphs: [
          '유아 동반 승객, 혼자 여행하는 어린이, 휠체어 등 공항 지원이 필요한 승객은 온라인 체크인이 제한될 수 있습니다.',
          '반려동물, 추가 좌석, 특수 수하물을 신청했거나 공동운항편과 여행 서류 확인이 필요한 경우 공항 카운터를 이용해 주세요.',
        ],
      },
      {
        title: '도심공항터미널',
        paragraphs: [
          '이용 가능한 노선과 대상 승객은 운영 기관의 안내를 확인해 주세요.',
          '공동운항편, 특별한 도움이 필요한 승객 등은 이용이 제한될 수 있습니다.',
        ],
      },
      {
        title: '공항별 체크인 마감 시간',
        paragraphs: [
          '체크인 마감 시간은 출발 공항과 노선에 따라 다릅니다. 충분한 여유를 두고 공항에 도착해 주세요.',
        ],
      },
    ],
  },
  baggage: {
    title: '수하물 안내',
    sections: [
      {
        title: '셀프 백드롭',
        paragraphs: [
          '온라인 또는 키오스크 체크인을 마친 승객이 직접 수하물 태그를 발급하고 위탁하는 서비스입니다.',
          '이용 가능한 공항, 위치와 운영 시간은 공항 현장 안내를 확인해 주세요.',
        ],
      },
      {
        title: '이용 절차',
        paragraphs: [
          '탑승권 확인 → 여권 확인 → 수하물 태그 부착 → 수하물 위탁 → 확인증 수령 순서로 이용합니다.',
        ],
      },
      {
        title: '이용 제한',
        paragraphs: [
          '연결 구간, 초과 수하물, 특수 수하물, 반려동물 위탁 또는 직원의 도움이 필요한 경우 일반 카운터를 이용해 주세요.',
        ],
      },
    ],
  },
};

function TravelGuide({ guideType }) {
  const guide = GUIDE_CONTENT[guideType];

  return (
    <main className="travel-guide-page" aria-labelledby="travel-guide-title">
      <div className="travel-guide-page__inner">
        <h1 id="travel-guide-title">{guide.title}</h1>
        <div className="travel-guide-page__content">
          {guide.sections.map((section) => (
            <section id={section.id} key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default TravelGuide;
