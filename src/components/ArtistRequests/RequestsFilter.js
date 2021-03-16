import { fn } from 'moment'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import constants from '../../utils/constants'
import DEFAULTS from '../../utils/DEFAULTS'

export default function RequestsFilter({
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
            <FormattedMessage id="email" defaultMessage="Email" />
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
            <FormattedMessage id="country" defaultMessage="Country" />
          </label>
          <i className="fas fa-angle-down"></i>
          <select
            className="form-control"
            name="country"
            value={filters.country}
          >
            <option value="">Select</option>
            {dropdownValues.country.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="form-group select position-relative">
          <label>
            <FormattedMessage
              id="appLanguage"
              defaultMessage="Device Language"
            />
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
              {(text) => <option value="">{text}</option>}
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
            <FormattedMessage id="signupEnd" defaultMessage="SignUp End" />
          </label>
          <input
            type="date"
            name="sign_up_date_end"
            value={filters.sign_up_date_end}
            onChange={handleChange}
            className="form-control"
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
            <option value="">Select</option>
            {dropdownValues.device_name.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
        </div>

        <div className="form-group select position-relative">
          <label>
            <FormattedMessage id="deviceType" defaultMessage="Device Type" />
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
            <FormattedMessage id="android" defaultMessage="Android">
              {(text) => (
                <option value={constants['DEVICE_TYPE_ANDROID']}>{text}</option>
              )}
            </FormattedMessage>
            <FormattedMessage id="iOS" defaultMessage="iOS">
              {(text) => (
                <option value={constants['DEVICE_TYPE_IOS']}>{text}</option>
              )}
            </FormattedMessage>
          </select>
        </div>

        {/* <div className="form-group select position-relative">
          <label>Status</label>
          <i className="fas fa-angle-down"></i>
          <select
            value={filters.is_enabled}
            className="form-control"
            onChange={handleChange}
            name="is_enabled"
          >
            <option value="">Select</option>
            <option value="1">Active</option>
            <option value="0">Pending</option>
          
          </select>
        </div> */}
      </form>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '6px '
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
              setFilters(DEFAULTS['ARTIST_REQUEST_FILTERS'])
            }}
          >
            <FormattedMessage id="clearAll" defaultMessage="Clear All" />
          </button>
        </div>
      </div>
    </div>
  )
}
