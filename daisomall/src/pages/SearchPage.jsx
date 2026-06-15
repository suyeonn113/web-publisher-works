import { useMemo, useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import SearchHeader from '../components/search/SearchHeader'
import SearchHomeView from '../components/search/SearchHomeView'
import SearchResultsView from '../components/search/SearchResultsView'
import { getCategoryStats, getKeywordStats, getSortedProducts } from '../components/search/searchData'
import './SearchPage.scss'

function SearchPage() {
  const { products, searchQuery, filteredProducts, handleInputChange, recommendedProducts } = useProducts()
  const [activeBadge, setActiveBadge] = useState('all')
  const [sortType, setSortType] = useState('recommend')

  const keywordStats = useMemo(() => getKeywordStats(products), [products])
  const popularKeywords = useMemo(() => keywordStats.slice(0, 10), [keywordStats])
  const categoryStats = useMemo(() => getCategoryStats(filteredProducts), [filteredProducts])
  const resultProducts = useMemo(
    () => getSortedProducts(filteredProducts, activeBadge, sortType),
    [activeBadge, filteredProducts, sortType]
  )

  const handleKeywordSelect = (keyword) => {
    setActiveBadge('all')
    handleInputChange({ target: { value: keyword } })
  }

  const handleBack = () => {
    if (searchQuery.trim()) {
      setActiveBadge('all')
      handleInputChange({ target: { value: '' } })
      return
    }

    window.history.back()
  }

  const hasSearchQuery = searchQuery.trim().length > 0
  const hasSearchResult = filteredProducts.length > 0

  return (
    <section className="search-page-placeholder">
      <SearchHeader searchQuery={searchQuery} onInputChange={handleInputChange} onBack={handleBack} />

      <div className="search-result">
        {hasSearchResult ? (
          <SearchResultsView
            searchQuery={searchQuery}
            filteredProducts={filteredProducts}
            resultProducts={resultProducts}
            categoryStats={categoryStats}
            keywordCount={Math.min(keywordStats.length, 6)}
            activeBadge={activeBadge}
            sortType={sortType}
            onBadgeChange={setActiveBadge}
            onSortChange={setSortType}
          />
        ) : !hasSearchQuery ? (
          <SearchHomeView
            products={products}
            popularKeywords={popularKeywords}
            recommendedProducts={recommendedProducts}
            onKeywordSelect={handleKeywordSelect}
          />
        ) : (
          <p className="no-result">검색 결과가 없습니다.</p>
        )}
      </div>
    </section>
  )
}

export default SearchPage
