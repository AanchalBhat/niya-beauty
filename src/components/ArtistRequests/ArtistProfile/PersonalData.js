import React from 'react'
import { FormattedMessage } from 'react-intl'
import verifyIcon from '../../../assets/images/verify.png'

export default function PersonalData({
  firstName,
  lastName,
  email,
  phone,
  birthDate,
  about,
  emailVerified,
  phoneVerified,
  profileImage,
  handleChange,
  fullName,
  showFollowers,
  numFollowers,
}) {
  return (
    <div className="personal-info position-relative ">
      <div className="profile-image text-center">
        <img src={profileImage} />
        <h6 className="mt-2">{fullName}</h6>
        <button type="button" className="btn btn-default del-btn">
          Delete
        </button>
      </div>
      <div
        style={{ textAlign: 'left' }}
        className="info-inputs position-relative"
      >
        <hr />
        <div className="table-head flex-content">
          <h6>Personal Info</h6>
          {showFollowers ? (
            <button
              type="button"
              class="btn btn-default theme-button ml-auto mr-1"
            >
              <i class="fas fa-users"></i> {numFollowers} Followers
            </button>
          ) : (
            ''
          )}
        </div>
        <form className="">
          <div className="flex-content">
            <div className="form-group">
              <label>
                <FormattedMessage id="firstName" defaultMessage="First Name" />
              </label>
              <input
                type="text"
                name="first_name"
                value={firstName}
                className="form-control"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>
                <FormattedMessage id="lastName" defaultMessage="Last Name" />
              </label>
              <input
                type="text"
                value={lastName}
                className="form-control"
                name="last_name"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>
                <FormattedMessage id="email" defaultMessage="Email" />
                {emailVerified ? (
                  <span className="verify-ic">
                    <img src={verifyIcon} />
                  </span>
                ) : (
                  ''
                )}
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <FormattedMessage id="phone" defaultMessage="Phone" />
                {phoneVerified ? (
                  <span className="verify-ic">
                    <img src={verifyIcon} />
                  </span>
                ) : (
                  ''
                )}
              </label>
              <input
                name="phone"
                type="text"
                className="form-control"
                value={phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group dob">
              <label>
                <FormattedMessage
                  id="dateOfBirth"
                  defaultMessage="Date of Birth"
                />
              </label>
              <input
                type="date"
                className="form-control"
                value={birthDate}
                name="birth_date"
                max={new Date().toISOString().substring(0, 10)}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group textarea">
            <label>
              <FormattedMessage id="about" defaultMessage="About" />
            </label>
            <textarea
              type="text"
              className="form-control"
              value={about}
              name="about"
              onChange={handleChange}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  )
}
