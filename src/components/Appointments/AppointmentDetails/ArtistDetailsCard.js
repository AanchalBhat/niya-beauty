import React from 'react'
import { FormattedMessage } from 'react-intl'
import verifyIcon from '../../../assets/images/verify.png'

export default function ArtistDetailsCard({ details }) {
  return (
    <div className="details-card">
      <h6>
        <FormattedMessage id="artistInfo" defaultMessage="Artist Info" />
      </h6>
      <div className="flex-content">
        <div className="group w-50">
          <label>
            <FormattedMessage id="artistID" defaultMessage="Artist ID" />
          </label>
          <p>{details.user_id}</p>
        </div>

        <div className="group ml-auto w-50 ml-8">
          <label>
            <FormattedMessage id="fullName" defaultMessage="Full Name" />
          </label>
          <p>{details.full_name}</p>
        </div>
      </div>

      <div className="flex-content">
        <div className="group w-50">
          <label>
            <FormattedMessage id="email" defaultMessage="Email" />
            {details.email_verified ? (
              <span className="verify-ic">
                <img src={verifyIcon} />
              </span>
            ) : (
              ''
            )}
          </label>
          <p>{details.email}</p>
        </div>

        <div className="group ml-auto w-50 ml-8">
          <label>
            <FormattedMessage id="country" defaultMessage="Country" />
          </label>
          <p>{details.country}</p>
        </div>
      </div>
      <div className="group">
        <label>
          <FormattedMessage id="phoneNo" defaultMessage="Phone No." />
          {details.phone_verified ? (
            <span className="verify-ic">
              <img src={verifyIcon} />
            </span>
          ) : (
            ''
          )}
        </label>
        <p>{details.phone}</p>
      </div>
    </div>
  )
}
