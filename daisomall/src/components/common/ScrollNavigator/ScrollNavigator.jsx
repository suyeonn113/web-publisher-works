import { useEffect, useRef, useState } from 'react'
import { iconSize } from '../../../tokens/size'
import ArrowIcon from '../../icons/ArrowIcon'
import './ScrollNavigator.scss'

const SCROLL_EDGE_OFFSET = 24

function ScrollNavigator({
  children,
  targetSelector,
  previousLabel = '이전 콘텐츠 보기',
  nextLabel = '다음 콘텐츠 보기',
}) {
  const rootRef = useRef(null)
  const [scrollState, setScrollState] = useState({
    canScrollPrev: false,
    canScrollNext: false,
  })

  const getTarget = () => rootRef.current?.querySelector(targetSelector)

  const updateScrollState = () => {
    const target = getTarget()

    if (!target) return

    const maxScrollLeft = Math.max(0, target.scrollWidth - target.clientWidth)
    const scrollLeft = Math.max(0, target.scrollLeft)

    setScrollState({
      canScrollPrev: scrollLeft > SCROLL_EDGE_OFFSET,
      canScrollNext: scrollLeft < maxScrollLeft - SCROLL_EDGE_OFFSET,
    })
  }

  useEffect(() => {
    const target = getTarget()

    if (!target) return undefined

    const frameId = window.requestAnimationFrame(updateScrollState)

    target.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)

    return () => {
      window.cancelAnimationFrame(frameId)
      target.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [targetSelector, children])

  const scrollContent = (direction) => {
    const target = getTarget()

    if (!target) return

    target.scrollBy({
      left: target.clientWidth * 0.8 * direction,
      behavior: 'smooth',
    })

    window.setTimeout(updateScrollState, 360)
  }

  return (
    <div className="scroll-navigator" ref={rootRef}>
      <button
        type="button"
        className="scroll-navigator__button is-prev"
        aria-label={previousLabel}
        hidden={!scrollState.canScrollPrev}
        onClick={() => scrollContent(-1)}
      >
        <ArrowIcon size={iconSize.sm} />
      </button>
      {children}
      <button
        type="button"
        className="scroll-navigator__button is-next"
        aria-label={nextLabel}
        hidden={!scrollState.canScrollNext}
        onClick={() => scrollContent(1)}
      >
        <ArrowIcon size={iconSize.sm} />
      </button>
    </div>
  )
}

export default ScrollNavigator
