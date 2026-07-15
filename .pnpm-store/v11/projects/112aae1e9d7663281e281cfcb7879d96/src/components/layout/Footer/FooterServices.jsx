import { useState } from 'react'
import { serviceColumns } from '../../../data/footerData'
import { iconSize } from '../../../tokens/size'
import { CallIcon, PlusIcon } from '../../icons'
import InactiveFooterLink from './InactiveFooterLink'

const servicePhones = ['1599-2211', '1522-4400']

function FooterServiceSummary({ column, phone }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className={`site-footer__service ${isOpen ? 'is-open' : ''}`}>
      <h2>
        <CallIcon size={iconSize.xs} aria-hidden="true" />
        {column.title}
      </h2>
      <strong className="site-footer__service-phone">{phone}</strong>
      <p>{column.time}</p>
      <button
        type="button"
        className="site-footer__service-toggle"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        <PlusIcon size={iconSize.xs} />
      </button>
      <ul>
        {column.links.map((link) => (
          <li key={link}>
            <InactiveFooterLink>{link}</InactiveFooterLink>
          </li>
        ))}
      </ul>
    </section>
  )
}

function FooterServices() {
  return (
    <div className="site-footer__services">
      {serviceColumns.map((column, index) => (
        <FooterServiceSummary
          key={column.title}
          column={column}
          phone={servicePhones[index]}
        />
      ))}
    </div>
  )
}

export default FooterServices
