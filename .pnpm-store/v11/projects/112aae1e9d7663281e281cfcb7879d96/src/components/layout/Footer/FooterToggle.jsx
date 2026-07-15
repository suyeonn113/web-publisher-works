import { useState } from 'react'
import { iconSize } from '../../../tokens/size'
import { ArrowIcon } from '../../icons'

function FooterToggle({ title, children }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={`site-footer__toggle ${isOpen ? 'is-open' : ''}`}>
      <button
        type="button"
        className="site-footer__menu-button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {title}
        <ArrowIcon size={iconSize.xxs} aria-hidden="true" />
      </button>
      <div className="site-footer__toggle-panel">
        <div className="site-footer__toggle-inner">{children}</div>
      </div>
    </section>
  )
}

export default FooterToggle
