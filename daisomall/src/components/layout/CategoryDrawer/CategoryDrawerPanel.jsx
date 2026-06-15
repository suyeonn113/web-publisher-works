import { Link } from 'react-router-dom'
import { getPublicAssetPath } from '../../../utils/getPublicAssetPath'

function CategoryDrawerPanel({ sections, scrollContainerRef, onScroll, onSectionRef }) {
  if (sections.length === 0) {
    return (
      <div className="category-drawer__section-list" ref={scrollContainerRef} onScroll={onScroll}>
        <p className="category-drawer__empty">등록된 카테고리가 없습니다.</p>
      </div>
    )
  }

  return (
    <div className="category-drawer__section-list" ref={scrollContainerRef} onScroll={onScroll}>
      {sections.map((section, index) => (
        <section
          key={`${section.categoryIndex}-${section.title}`}
          className="category-drawer__section"
          ref={(node) => onSectionRef(index, node)}
        >
          <h2>{section.title}</h2>
          <div className="category-drawer__links">
            {section.items.map((item) => (
              <Link key={`${item.id}-${item.label}`} to={`/category/${item.id}`}>
                {item.image && <img src={getPublicAssetPath(item.image)} alt="" />}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default CategoryDrawerPanel
