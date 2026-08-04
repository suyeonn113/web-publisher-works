import { useEffect, useRef, useState } from 'react'
import { iconSize } from '../../../tokens/size'
import { ArrowIcon } from '../../icons'

function FooterToggle({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 767px)')
    const updatePanelInertState = () => {
      panelRef.current?.toggleAttribute('inert', mediaQueryList.matches && !isOpen)
    }

    updatePanelInertState()
    mediaQueryList.addEventListener('change', updatePanelInertState)

    return () => {
      mediaQueryList.removeEventListener('change', updatePanelInertState)
    }
  }, [isOpen])

  const handleKeyDown = (event) => {
    if (event.key !== 'Escape' || !isOpen) return

    event.preventDefault()
    setIsOpen(false)
    window.requestAnimationFrame(() => {
      buttonRef.current?.focus()
    })
  }

  return (
    <section
      className={`site-footer__toggle ${isOpen ? 'is-open' : ''}`}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={buttonRef}
        type="button"
        className="site-footer__menu-button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {title}
        <ArrowIcon size={iconSize.xxs} aria-hidden="true" />
      </button>
      <div ref={panelRef} className="site-footer__toggle-panel">
        <div className="site-footer__toggle-inner">{children}</div>
      </div>
    </section>
  )
}

export default FooterToggle
