import ProductCardList from '../common/ProductCardList/ProductCardList'
import { BADGE_LABELS, SORT_LABELS } from './searchData'
import './SearchResultsView.scss'

function SearchResultsView({
  searchQuery,
  filteredProducts,
  resultProducts,
  categoryStats,
  keywordCount,
  activeBadge,
  sortType,
  onBadgeChange,
  onSortChange,
}) {
  return (
    <div className="search-results-view">
      <nav className="search-tabs" aria-label="검색 결과 유형">
        <button type="button" className="is-active">상품</button>
        <button type="button">쇼츠</button>
        <button type="button">매장상품찾기</button>
      </nav>

      <div className="search-result-summary">
        <div>
          <span>검색 결과</span>
          <strong>{searchQuery} 상품 {filteredProducts.length}개</strong>
        </div>
        <p>카테고리 {categoryStats.length} · 키워드 {keywordCount} · 배송옵션 4</p>
      </div>

      <div className="search-quick-filters" aria-label="배송 옵션 필터">
        {Object.entries(BADGE_LABELS).map(([badge, label]) => (
          <button
            type="button"
            key={badge}
            className={activeBadge === badge ? 'is-active' : ''}
            onClick={() => onBadgeChange(badge)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="search-toolbar">
        <span>품절제외</span>
        <div aria-label="정렬">
          {Object.entries(SORT_LABELS).map(([type, label]) => (
            <button
              type="button"
              key={type}
              className={sortType === type ? 'is-active' : ''}
              onClick={() => onSortChange(type)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <ProductCardList products={resultProducts} />
    </div>
  )
}

export default SearchResultsView
