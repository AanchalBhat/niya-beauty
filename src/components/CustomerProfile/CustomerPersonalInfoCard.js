import React from 'react'
import { FormattedMessage } from 'react-intl'
import verifyIcon from '../../assets/images/verify.png'

export default function CustomerPersonalInfoCard({ data, handleChange }) {
  const {
    first_name,
    last_name,
    email,
    phone,
    profilePicThumbnail,
    profilePic,
    emailVerified,
    phoneVerified,
  } = data
  return (
    <div className="personal-info position-relative card-style">
      <div className="profile-image text-center">
        <img src={profilePic} />
        <h6 className="mt-2">
          {(first_name ? first_name : '') + ' ' + (last_name ? last_name : '')}
        </h6>
        <button type="button" className="btn btn-default">
          <FormattedMessage id="delete" />
        </button>
      </div>
      <div className="info-inputs">
        <div className="table-head flex-content">
          <h6>
            <FormattedMessage
              id="personalInfo"
              defaultMessage="Personal Info"
            />
          </h6>
        </div>
        <form className="flex-content flex-content">
          <div className="form-group">
            <label>
              <FormattedMessage id="firstName" defaultMessage="First Name" />
            </label>
            <input
              type="text"
              name="first_name"
              className="form-control"
              value={first_name ? first_name : ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <FormattedMessage id="lastName" defaultMessage="Last Name" />
            </label>
            <input
              type="text"
              name="last_name"
              className="form-control"
              value={last_name ? last_name : ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <FormattedMessage id="email" defaultMessage="Email" />{' '}
              {emailVerified ? (
                <span className="verify-ic">
                  <img src={verifyIcon} />
                </span>
              ) : (
                ''
              )}
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={email ? email : ''}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              <FormattedMessage id="phoneNo" defaultMessage="Phone No." />
              {phoneVerified ? (
                <span className="verify-ic">
                  <img src={verifyIcon} />
                </span>
              ) : (
                ''
              )}
            </label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={phone ? phone : ''}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
