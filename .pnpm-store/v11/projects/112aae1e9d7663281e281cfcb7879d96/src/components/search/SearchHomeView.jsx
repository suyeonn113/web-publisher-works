import ProductCardList from '../common/ProductCardList/ProductCardList'
import { FEATURED_KEYWORDS, RECENT_KEYWORDS } from './searchData'
import './SearchHomeView.scss'

function SearchHomeView({ products, popularKeywords, recommendedProducts, onKeywordSelect }) {
  const cleaningCount = products.filter((product) => product.categoryId === 'cleaning').length

  return (
    <div className="recommend">
      <section className="search-section">
        <div className="search-section__head">
          <h2>최근 검색어</h2>
          <button type="button">모두 지우기</button>
        </div>
        <div className="search-chip-row">
          {RECENT_KEYWORDS.map((keyword) => (
            <button type="button" key={keyword} onClick={() => onKeywordSelect(keyword)}>
              {keyword}
            </button>
          ))}
        </div>
      </section>

      <section className="search-section">
        <div className="search-section__head">
          <h2>추천 키워드</h2>
          <span>결과 많은 키워드</span>
        </div>
        <div className="search-chip-row is-featured">
          {FEATURED_KEYWORDS.map((keyword) => (
            <button type="button" key={keyword} onClick={() => onKeywordSelect(keyword)}>
              {keyword}
            </button>
          ))}
        </div>
      </section>

      <button type="button" className="search-data-banner" onClick={() => onKeywordSelect('청소')}>
        <span>데이터 추천</span>
        <strong>청소 상품 {cleaningCount}개 모아보기</strong>
        <em>택배 · 픽업 · 오늘배송</em>
      </button>

      <section className="search-section">
        <div className="search-section__head">
          <h2>급상승 검색어</h2>
          <span>상품 키워드 기준</span>
        </div>
        <ol className="search-ranking-list">
          {popularKeywords.map(({ keyword, count }, index) => (
            <li key={keyword}>
              <button type="button" onClick={() => onKeywordSelect(keyword)}>
                <strong>{index + 1}</strong>
                <span>{keyword}</span>
                <em>{count}개</em>
              </button>
            </li>
          ))}
        </ol>
      </section>

      <section className="search-section search-openrun">
        <div className="search-section__head">
          <h2>추천 상품</h2>
          <span>JSON 데이터 연결</span>
        </div>
        <ProductCardList products={recommendedProducts} />
      </section>
    </div>
  )
}

export default SearchHomeView
