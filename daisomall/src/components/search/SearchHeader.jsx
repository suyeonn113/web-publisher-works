import { ArrowIcon } from '../icons'
import { iconSize } from '../../tokens/size'
import './SearchHeader.scss'

function SearchHeader({ searchQuery, onInputChange, onBack }) {
  return (
    <div className="search-header-band">
      <div className="search-container">
        <button type="button" className="arrowIcon-box" onClick={onBack} aria-label="검색 페이지 이동">
          <ArrowIcon size={iconSize.sm} className="search-header__back-icon" />
        </button>
        <input
          type="text"
          name="search-input"
          value={searchQuery}
          onChange={onInputChange}
          className="search-input"
          spellCheck={false}
          placeholder="검색어를 입력해주세요"
        />
      </div>
    </div>
  )
}

export default SearchHeader
