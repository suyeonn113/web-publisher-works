import { useEffect, useState } from 'react'
import ArrowIcon from '../../icons/ArrowIcon'
import TimeIcon from '../../icons/TimeIcon'
import { iconSize } from '../../../tokens/size'
import './FloatingActionButtons.scss'

const TOP_BUTTON_VISIBLE_OFFSET = 300

function FloatingActionButtons() {
  const [isTopButtonVisible, setIsTopButtonVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsTopButtonVisible(window.scrollY > TOP_BUTTON_VISIBLE_OFFSET)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="floating-action-buttons" aria-label="빠른 메뉴">
      <button type="button" className="floating-action-button" aria-label="최근 본 상품">
        <TimeIcon size={iconSize.sm}/>
      </button>
      {isTopButtonVisible ? (
        <button
          type="button"
          className="floating-action-button floating-action-button--top"
          aria-label="위로가기"
          onClick={handleScrollTop}
        >
          <ArrowIcon size={iconSize.xs} />
        </button>
      ) : null}
    </div>
  )
}

export default FloatingActionButtons
