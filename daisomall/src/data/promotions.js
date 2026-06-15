const promotionImageFolders = {
  category: '/images/home-promotion/category',
  popular: '/images/home-promotion/popular',
  purchase: '/images/home-promotion/purchase',
}

// 파일명 추천 규칙:
// - 카테고리별 폴더 안에서 탭 id + 두 자리 번호 사용: popular-01.webp, purchase-01.webp
// - category 탭도 이미지가 늘어나면 /home-promotion/category/category-01.webp 구조 권장
// - id는 상세 주소가 되므로 영문 소문자와 하이픈만 사용: popular-new-item
const createPromotion = (groupId, promotion) => ({
  ...promotion,
  image: `${promotionImageFolders[groupId]}/${promotion.imageFile}`,
  path: `/promotion/${promotion.id}`,
})

const createPromotionGroup = (groupId, promotions) =>
  promotions.map((promotion) => createPromotion(groupId, promotion))

export const promotionTabs = [
  { id: 'category', label: '카테고리' },
  { id: 'popular', label: '인기급상승' },
  { id: 'purchase', label: '구매급상승' },
]

export const promotionGroups = {
  category: createPromotionGroup('category', [
    {
      id: 'category-pure',
      title: '1개 100원 천원 생리대',
      shortTitle: '100원\n생리대',
      subtitle: '카테고리 기획전',
      imageFile: 'category-01.webp',
    },
    {
      id: 'category-hair',
      title: '가성비로 완성하는 헤어 스타일링',
      shortTitle:'가성비\n스타일링',
      subtitle: '카테고리 기획전',
      imageFile: 'category-02.webp',
    },
    {
      id: 'category-solution',
      title: '비듬 고민별 맞춤 솔루션',
      shortTitle:'두피 고민\n솔루션',
      subtitle: '카테고리 기획전',
      imageFile: 'category-03.webp',
    },
    {
      id: 'category-solution',
      title: '장건강 솔루션 추천 BEST',
      shortTitle:'장건강\nBEST',
      subtitle: '카테고리 기획전',
      imageFile: 'category-04.webp',
    },
    {
      id: 'category-beauty',
      title: '클라뷰로 완성하는 여배우 피부',
      shortTitle: '클라뷰\n광채피부',
      subtitle: '카테고리 기획전',
      imageFile: 'category-05.webp',
    },
    {
      id: 'category-innerwear',
      title: 'BG 보디가드 ＆ YES code',
      shortTitle: 'BG·YES\n이너웨어',
      subtitle: '카테고리 기획전',
      imageFile: 'category-06.webp',
    },
    {
      id: 'category-pure',
      title: '무더위 대비 필수템',
      shortTitle: '여름\n필수템',
      subtitle: '카테고리 기획전',
      imageFile: 'category-07.webp',
    },
    {
      id: 'category-fashion',
      title: '베이직하우스 플러스+ 최초런칭',
      shortTitle: '베이직웨어\n첫 공개',
      subtitle: '카테고리 기획전',
      imageFile: 'category-02.webp',
    },
    {
      id: 'category-dehumidifier',
      title: '기분 좋은 뽀송한 하루',
      shortTitle: '습기 없이\n뽀송하게',
      subtitle: '카테고리 기획전',
      imageFile: 'category-08.webp',
    },
  ]),
  popular: createPromotionGroup('popular', [
    {
      id: 'popular-new',
      title: '베이직하우스 플러스 최초런칭',
      shortTitle: '베이직웨어\n첫 공개',
      subtitle: '281,068명 봤어요',
      imageFile: 'popular-01.webp',
      ranking: {
        rank: 1,
        direction: 'up', // up | down | same
        change: 1,
      },
    },
    {
      id: 'popular-daily',
      title: 'HEAD 러닝 웨어 2차 신상',
      shortTitle: 'HEAD 러닝\n신상 라인업',
      subtitle: '213,784명 봤어요',
      imageFile: 'popular-02.webp',
      ranking: {
        rank: 2,
        direction: 'down',
        change: -1,
      },
    },
    {
      id: 'popular-running',
      title: '5월 4주차 신상 기획전',
      shortTitle: '5월 4주차\n신상 기획전',
      subtitle: '201,052명 봤어요',
      imageFile: 'popular-03.webp',
      ranking: {
        rank: 3,
        direction: 'up',
        change: 1,
      },
    },
    {
      id: 'popular-weekly',
      title: '6월 1주차 신상 기획전',
      shortTitle: '6월 1주차\n신상 기획전',
      subtitle: '174,838명 봤어요',
      imageFile: 'popular-04.webp',
      ranking: {
        rank: 4,
        direction: 'up',
        change: 1,
      },
    },
    {
      id: 'popular-season',
      title: '生알로에 수분 김정문알로에',
      shortTitle: '알로에 수분\n진정 케어',
      subtitle: '173,186명 봤어요',
      imageFile: 'popular-05.webp',
      ranking: {
        rank: 5,
        direction: 'down',
        change: -1,
      },
    },
    {
      id: 'popular-new',
      title: '다이소 X HEAD 러닝웨어',
      shortTitle: 'HEAD와\n러닝 준비',
      subtitle: '144,980명 봤어요',
      imageFile: 'popular-06.webp',
      ranking: {
        rank: 6,
        direction: 'up', // up | down | same
        change: 1,
      },
    },
    {
      id: 'popular-daily',
      title: 'UV 걱정 없는 자외선 차단템',
      shortTitle: 'UV 차단\n여름 케어',
      subtitle: '143,476명 봤어요',
      imageFile: 'popular-07.webp',
      ranking: {
        rank: 7,
        direction: 'down',
        change: -1,
      },
    },
    {
      id: 'popular-running',
      title: '5월 2주차 신상 기획전',
      shortTitle: '5월 2주차\n신상 기획전',
      subtitle: '138,404명 봤어요',
      imageFile: 'popular-08.webp',
      ranking: {
        rank: 8,
        direction: 'down',
        change: -1,
      },
    },
    {
      id: 'popular-weekly',
      title: '야구 모드ON 덕질 시리즈',
      shortTitle: '야구팬\n덕질템',
      subtitle: '132,412명 봤어요',
      imageFile: 'popular-09.webp',
      ranking: {
        rank: 9,
        direction: 'up',
        change: 1,
      },
    },
    {
      id: 'popular-season',
      title: '5월 3주차 신상 기획전',
      shortTitle: '5월 3주차\n신상 기획전',
      subtitle: '131,696명 봤어요',
      imageFile: 'popular-10.webp',
      ranking: {
        rank: 10,
        direction: 'down',
        change: -1,
      },
    },
    {
      id: 'popular-new',
      title: '공기를 입은 듯 쾌적한 티셔츠',
      shortTitle: '공기처럼\n쾌적한 티셔츠',
      subtitle: '124,578명 봤어요',
      imageFile: 'popular-11.webp',
      ranking: {
        rank: 11,
        direction: 'same', // up | down | same
        change: 0,
      },
    },
    {
      id: 'popular-daily',
      title: '대용량 텀블러 출시',
      shortTitle: '대용량\n텀블러 츌시',
      subtitle: '114,396명 봤어요',
      imageFile: 'popular-12.webp',
      ranking: {
        rank: 12,
        direction: 'down',
        change: -1,
      },
    },
    {
      id: 'popular-running',
      title: '미피 신상 굿즈 다이소에 등장',
      shortTitle: '미피 굿즈\n다이소 상륙',
      subtitle: '112,532명 봤어요',
      imageFile: 'popular-13.webp',
      ranking: {
        rank: 13,
        direction: 'up',
        change: 1,
      },
    },
    {
      id: 'popular-weekly',
      title: '장벽엔 후- 후시덤 신상 출시',
      shortTitle: '후시덤\n장벽 케어',
      subtitle: '108,136명 보았어요',
      imageFile: 'popular-14.webp',
      ranking: {
        rank: 14,
        direction: 'up',
        change: 1,
      },
    },
    {
      id: 'popular-season',
      title: '여름 휴가 출발 여행 꿀템✈',
      shortTitle: '여름휴가\n여행 꿀템',
      subtitle: '107,020명 보았어요',
      imageFile: 'popular-15.webp',
      ranking: {
        rank: 15,
        direction: 'down',
        change: 1,
      },
    },
  ]),
  purchase: createPromotionGroup('purchase', [
    {
      id: 'purchase-storage',
      title: '한국의 전통 일상에 스며들다',
      shortTitle: '일상 속\n전통무드',
      subtitle: '구매 급상승',
      imageFile: 'purchase-01.webp',
      ranking: {
        rank: 1,
        direction: 'up',  
        change: 1,
      },
    },
    {
      id: 'purchase-kitchen',
      title: '生알로에 수분 김정문알로에',
      shortTitle: '알로에 수분\n진정 케어',
      subtitle: '구매 급상승',
      imageFile: 'purchase-02.webp',
      ranking: {
        rank: 2,
        direction: 'up',
        change: 1,
      },
    },
    {
      id: 'purchase-bath',
      title: '착 달라붙는 자석\n수납🧲',
      shortTitle: '착붙 자석\n수납템',
      subtitle: '구매 급상승',
      imageFile: 'purchase-03.webp',
      ranking: {
        rank: 3,
        direction: 'up',
        change: 1,
      },
    },
    {
      id: 'purchase-living',
      title: '장벽엔 후- 후시덤 신상',
      shortTitle: '후시덤\n장벽 케어',
      subtitle: '구매 급상승',
      imageFile: 'purchase-04.webp',
      ranking: {
        rank: 4,
        direction: 'up',
        change: 1,
      },
    },
    {
      id: 'purchase-beauty',
      title: '5월 4주차 신상 기획전',
      shortTitle: '5월 4주차\n신상 기획전',
      subtitle: '구매 급상승',
      imageFile: 'purchase-05.webp',
      ranking: {
        rank: 5,
        direction: 'new',
        change: 0,
      },
    },
    {
      id: 'purchase-storage',
      title: '여름 휴가 출발 여행 꿀템✈',
      shortTitle: '여름휴가\n여행 꿀템',
      subtitle: '구매 급상승',
      imageFile: 'purchase-06.webp',
      ranking: {
        rank: 6,
        direction: 'same',  
        change: 0,
      },
    },
    {
      id: 'purchase-kitchen',
      title: '여름 완구 총집합',
      shortTitle: '여름 완구\n총집합',
      subtitle: '구매 급상승',
      imageFile: 'purchase-07.webp',
      ranking: {
        rank: 7,
        direction: 'up',
        change: 1,
      },
    },
    {
      id: 'purchase-bath',
      title: '야구 모드ON 덕질 시리즈',
      shortTitle: '야구팬\n덕질템',
      subtitle: '구매 급상승',
      imageFile: 'purchase-08.webp',
      ranking: {
        rank: 8,
        direction: 'new',
        change: 0,
      },
    },
    {
      id: 'purchase-living',
      title: '6월 1주차 신상 기획전',
      shortTitle: '6월 1주차\n신상 기획전',
      subtitle: '구매 급상승',
      imageFile: 'purchase-09.webp',
      ranking: {
        rank: 9,
        direction: 'down',
        change: -1,
      },
    },
    {
      id: 'purchase-beauty',
      title: '1일 1팩 마스크시트',
      shortTitle: '매일 1팩\n마스크팩',
      subtitle: '구매 급상승',
      imageFile: 'purchase-10.webp',
      ranking: {
        rank: 10,
        direction: 'new',
        change: 0,
      },
    },
    {
      id: 'purchase-storage',
      title: '대용량 텀블러 출시',
      shortTitle: '대용량\n텀블러 츌시',
      subtitle: '구매 급상승',
      imageFile: 'purchase-11.webp',
      ranking: {
        rank: 11,
        direction: 'same',  
        change: 0,
      },
    },
    {
      id: 'purchase-kitchen',
      title: '다이소 X HEAD 러닝웨어',
      shortTitle: 'HEAD와 함께\n러닝 준비',
      subtitle: '구매 급상승',
      imageFile: 'purchase-12.webp',
      ranking: {
        rank: 12,
        direction: 'new',
        change: 0,
      },
    },
    {
      id: 'purchase-bath',
      title: 'HEAD 러닝 웨어 2차 신상',
      shortTitle: 'HEAD 러닝\n신상 라인',
      subtitle: '구매 급상승',
      imageFile: 'purchase-13.webp',
      ranking: {
        rank: 13,
        direction: 'new',
        change: 0,
      },
    },
    {
      id: 'purchase-living',
      title: '다이소 생활꿀템',
      shortTitle: '일상 속\n생활꿀템',
      subtitle: '구매 급상승',
      imageFile: 'purchase-14.webp',
      ranking: {
        rank: 14,
        direction: 'new',
        change: 0,
      },
    },
    {
      id: 'purchase-beauty',
      title: '미피 신상 굿즈 다이소에 등장',
      shortTitle: '일상 편한\n생활꿀템',
      subtitle: '구매 급상승',
      imageFile: 'purchase-15.webp',
      ranking: {
        rank: 15,
        direction: 'new',
        change: 0,
      },
    },
  ]),
}
