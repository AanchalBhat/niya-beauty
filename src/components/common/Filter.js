import React from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import Defaults from '../../utils/DEFAULTS'

export default function Filters({
  dropdownValues,
  filters,
  handleChange,
  handleSubmit,
  setFilters,
}) {
  function handleSearchClick(event) {
    event.preventDefault()

    if (
      (filters.sign_up_date_end === '' && filters.sign_up_date_start !== '') ||
      (filters.sign_up_date_end !== '' && filters.sign_up_date_start === '')
    ) {
      alert('Please select both Sign Up Start and Sign Up End to filter data')
      return
    }

    let search_params = {}

    for (const [key, value] of Object.entries(filters)) {
      if (filters[key]) search_params[key] = value
    }
    setFilters(search_params)
    handleSubmit(search_params)
  }

  return (
    <div className="filters">
      <form className="flex-content">
        <div className="form-group">
          <label>
            <FormattedMessage id="userID" defaultMessage="User ID" />
          </label>
          <input
            name="user_id"
            value={filters.user_id}
            onChange={handleChange}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            <FormattedMessage id="fullName" defaultMessage="Full Name" />
          </label>
          <input
            name="full_name"
            value={filters.full_name}
            onChange={handleChange}
            type="text"
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            {' '}
            <FormattedMessage id="email" defaultMessage="E-Mail" />
          </label>
          <input
            name="email"
            value={filters.email}
            onChange={handleChange}
            type="email"
            className="form-control"
          />
        </div>

        <div className="form-group select position-relative">
          <label>
            {' '}
            <FormattedMessage id="country" defaultMessage="Country" />
          </label>
          <i className="fas fa-angle-down"></i>
          <select
            className="form-control"
            name="country"
            value={filters.country}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {dropdownValues.country.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="form-group select position-relative">
          <label>
            <FormattedMessage id="appLanguage" defaultMessage="App Language" />
          </label>
          <i className="fas fa-angle-down"></i>
          <select
            name="app_language"
            value={filters.app_language}
            onChange={handleChange}
            className="form-control"
          >
            <FormattedMessage id="select" defaultMessage="Select">
              {(text) => (
                <option name="app_version" value="">
                  {text}
                </option>
              )}
            </FormattedMessage>

            {dropdownValues.app_language.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>
            <FormattedMessage id="phoneNo" defaultMessage="Phone No." />
          </label>
          <input
            type="text"
            name="phone"
            value={filters.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group select position-relative">
          <label>
            <FormattedMessage id="appVersion" defaultMessage="App Version" />
          </label>
          <i className="fas fa-angle-down"></i>
          <select
            name="app_version"
            value={filters.app_version}
            onChange={handleChange}
            className="form-control"
            name="app_version"
          >
            <FormattedMessage id="select" defaultMessage="Select">
              {(text) => (
                <option name="app_version" value="">
                  {text}
                </option>
              )}
            </FormattedMessage>

            {dropdownValues.app_version.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="form-group select position-relative">
          <label>
            <FormattedMessage id="buildNo" defaultMessage="Build No." />
          </label>
          <i className="fas fa-angle-down"></i>
          <select
            className="form-control"
            name="build_version"
            value={filters.build_version}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {dropdownValues.build_version.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="form-group icon-set-input position-relative">
          <i className="far fa-calendar-alt"></i>
          <label>
            {' '}
            <FormattedMessage id="signupStart" defaultMessage="SignUp Start" />
          </label>
          <input
            type="date"
            name="sign_up_date_start"
            value={filters.sign_up_date_start}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group icon-set-input position-relative">
          <i className="far fa-calendar-alt"></i>
          <label>
            {' '}
            <FormattedMessage id="signupEnd" defaultMessage="SignUp End" />
          </label>
          <input
            type="date"
            name="sign_up_date_end"
            value={filters.sign_up_date_end}
            onChange={handleChange}
            className="form-control"
            max={new Date().toISOString().substring(0, 10)}
          />
        </div>

        <div className="form-group select position-relative">
          <label>
            <FormattedMessage id="deviceName" defaultMessage="Device Name" />
          </label>
          <i className="fas fa-angle-down"></i>
          <select
            name="device_name"
            value={filters.device_name}
            className="form-control"
            onChange={handleChange}
          >
            <FormattedMessage id="select" defaultMessage="Select">
              {(text) => <option value="">{text}</option>}
            </FormattedMessage>

            {dropdownValues.device_name.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="form-group select position-relative">
          <label>
            <FormattedMessage id="device" defaultMessage="Device" />
          </label>
          <i className="fas fa-angle-down"></i>
          <select
            name="device_type"
            value={filters.device_type}
            onChange={handleChange}
            className="form-control"
          >
            <FormattedMessage id="select" defaultMessage="Select">
              {(text) => <option value="">{text}</option>}
            </FormattedMessage>
            <option value="1">Android</option>
            <option value="2">iOS</option>
          </select>
        </div>

        <div className="form-group select position-relative">
          <label>
            <FormattedMessage id="status" defaultMessage="Status" />
          </label>
          <i className="fas fa-angle-down"></i>
          <select
            value={filters.is_enabled}
            className="form-control"
            onChange={handleChange}
            name="is_enabled"
          >
            <FormattedMessage id="select" defaultMessage="Select">
              {(text) => <option value="">{text}</option>}
            </FormattedMessage>
            <option value="1">Active</option>
            <option value="0">Pending</option>
            {/* <option value="id">Desktop</option> */}
          </select>
        </div>
        <div className="form-group select position-relative">
          <label>
            <FormattedMessage
              id="phoneVerified"
              defaultMessage="Phone Verified"
            />
          </label>
          <i className="fas fa-angle-down"></i>
          <select
            value={filters.phone_verified}
            className="form-control"
            onChange={handleChange}
            name="phone_verified"
          >
            <option value="">Select</option>
            <option value="1">Verified</option>
            <option value="0">Not Verified</option>
            {/* <option value="id">Desktop</option> */}
          </select>
        </div>
        <div className="form-group select position-relative">
          <label>
            <FormattedMessage
              id="emailVerified"
              defaultMessage="Email Verified"
            />
          </label>
          <i className="fas fa-angle-down"></i>
          <select
            value={filters.email_verified}
            className="form-control"
            onChange={handleChange}
            name="email_verified"
          >
            <option value="">Select</option>
            <option value="1">Verified</option>
            <option value="0">Not Verified</option>
            {/* <option value="id">Desktop</option> */}
          </select>
        </div>
      </form>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginRight: '10px',
        }}
      >
        <div>
          <button
            type="button"
            className={`btn btn-default theme-button btn-filter`}
            onClick={handleSearchClick}
          >
            <FormattedMessage id="apply" defaultMessage="Apply" />
          </button>
        </div>
        <div>
          <button
            type="button"
            className={`btn btn-default theme-button btn-filter`}
            onClick={() => {
              setFilters(Defaults['ARTIST_LISTING_FILTERS'])
            }}
          >
            <FormattedMessage id="clearAll" defaultMessage="Clear All" />
          </button>
        </div>
      </div>
    </div>
  )
}
