import React from 'react'
import constants from '../../utils/constants'
import { FormattedMessage } from 'react-intl'

export default function GalleryNav({ currentSection, handleNavChange, mediaCount }) {
  console.log(currentSection)
  return (
    <ul className="nav nav-pills sub-tabs" role="tablist">
      <li className="nav-item">
        <span
          className={`nav-link flex-content-gallery ${
            currentSection === constants['APPROVED_MEDIA_SECTION']
              ? 'active'
              : ''
          }`}
          onClick={() => {
            handleNavChange(constants['APPROVED_MEDIA_SECTION'])
          }}
        >
          <FormattedMessage id="approved" defaultMessage="Approved" /> <p>{mediaCount.approved}</p>
        </span>
      </li>
      <li className="nav-item">
        <span
          className={`nav-link flex-content-gallery ${
            currentSection === constants['REJECTED_MEDIA_SECTION']
              ? 'active'
              : ''
            }`}
            onClick={() => {
            handleNavChange(constants['REJECTED_MEDIA_SECTION'])
          }}
        >
          <FormattedMessage id="rejected" defaultMessage="Rejected" /> <p>{mediaCount.rejected}</p>
        </span>
      </li>
      <li className="nav-item">
        <span
          className={`nav-link flex-content-gallery ${
            currentSection === constants['PENDING_MEDIA_SECTION']
              ? 'active'
              : ''
          }`}
          onClick={() => {
            handleNavChange(constants['PENDING_MEDIA_SECTION'])
          }}
        >
          <FormattedMessage id="pending" defaultMessage="Pending" /> <p>{mediaCount.pending}</p>
        </span>
      </li>
    </ul>
  )
}
