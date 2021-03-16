import React from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import constants from '../../../utils/constants'

export default function PromoCodesNav({ setActiveSection, activeSection }) {
  return (
    <ul className="nav nav-pills sub-tabs">
      <li
        className="nav-item"
        onClick={() => {
          setActiveSection(constants['PROMO_CODES_SECTION'])
        }}
      >
        <span
          className={`nav-link ${
            activeSection === constants['PROMO_CODES_SECTION'] ? 'active' : ''
          } flex-content cursor-pointer`}
        >
          <FormattedMessage id="promoCodes" defaultMessage="Promo Codes" />
        </span>
      </li>
      <li
        className="nav-item"
        onClick={() => {
          setActiveSection(constants['BASIC_DETAILS_SECTION'])
        }}
      >
        <span
          className={`nav-link ${
            activeSection === constants['BASIC_DETAILS_SECTION'] ? 'active' : ''
          } flex-content cursor-pointer`}
        >
          <FormattedMessage id="basicDetails" defaultMessage="Basic Details" />
        </span>
      </li>
    </ul>
  )
}
