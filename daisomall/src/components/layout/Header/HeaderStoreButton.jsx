import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { PATHS } from '../../../routes/paths'

const STORE_TIP_DISPLAY_TIME = 4000
let hasShownStoreTip = false

function HeaderStoreButton() {
  const [isTipVisible, setIsTipVisible] = useState(false)
  const storeTipRef = useRef(null)
  const timerRef = useRef(null)

  const hideStoreTip = () => {
    setIsTipVisible(false)

    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  useEffect(() => {
    if (hasShownStoreTip) return undefined

    hasShownStoreTip = true
    setIsTipVisible(true)

    timerRef.current = window.setTimeout(() => {
      hideStoreTip()
    }, STORE_TIP_DISPLAY_TIME)

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isTipVisible) return undefined

    const handlePointerDown = (event) => {
      if (storeTipRef.current?.contains(event.target)) return

      hideStoreTip()
    }

    window.addEventListener('pointerdown', handlePointerDown)

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isTipVisible])

  return (
    <div className="site-header__store-wrap" ref={storeTipRef}>
      <NavLink
        to={PATHS.store}
        className={({ isActive }) => `site-header__store${isActive ? ' is-active' : ''}`}
        onClick={hideStoreTip}
      >
        매장
      </NavLink>
      {isTipVisible && (
        <div className="site-header__store-tip" role="status">
          <strong>매장에 있으신가요?</strong>
          <span>매장 물건을 검색해보세요!</span>
        </div>
      )}
    </div>
  )
}

export default HeaderStoreButton
