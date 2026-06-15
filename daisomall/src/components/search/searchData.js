export const CATEGORY_LABELS = {
  beauty: '뷰티',
  kitchen: '주방',
  cleaning: '청소',
  storage: '수납',
  stationery: '문구',
  interior: '인테리어',
  tools: '공구',
  food: '식품',
  sports: '스포츠',
  fashion: '패션',
  pets: '반려동물',
  kids: '완구',
}

export const BADGE_LABELS = {
  all: '전체',
  delivery: '택배',
  pickup: '픽업',
  today: '오늘',
  bulk: '대량',
}

export const SORT_LABELS = {
  recommend: '추천순',
  review: '리뷰 많은순',
  priceLow: '낮은 가격순',
}

export const FEATURED_KEYWORDS = ['청소', '수납', '뷰티']
export const RECENT_KEYWORDS = ['토너', '제습제']

export function getKeywordStats(products) {
  const counts = products.reduce((acc, product) => {
    product.keywords?.forEach((keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1
    })
    return acc
  }, {})

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([keyword, count]) => ({ keyword, count }))
}

export function getCategoryStats(products) {
  return Object.entries(
    products.reduce((acc, product) => {
      acc[product.categoryId] = (acc[product.categoryId] || 0) + 1
      return acc
    }, {})
  ).map(([categoryId, count]) => ({
    categoryId,
    label: CATEGORY_LABELS[categoryId] || categoryId,
    count,
  }))
}

export function getSortedProducts(products, activeBadge, sortType) {
  const badgeFiltered =
    activeBadge === 'all'
      ? products
      : products.filter((product) => product.badges?.includes(activeBadge))

  return [...badgeFiltered].sort((a, b) => {
    if (sortType === 'review') return b.reviewCount - a.reviewCount
    if (sortType === 'priceLow') return a.price - b.price
    return (a.rank || 999) - (b.rank || 999)
  })
}
