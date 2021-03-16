import React from 'react'
import { FormattedMessage } from 'react-intl'
import constants from '../../../utils/constants'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function AddAmbassadorView({
  ambassadorDetails,
  handleChange,
  handleAdd,

  error,
  handlePhoneChange,
  phoneValidation,
  emailValidation,
}) {
  const { phone: phoneError, email: emailError } = error
  const profitPercentageOptions = constants[
    'PROFIT_PERCENTAGE_VALUES'
  ].map((val) => <option value={val}>{val}</option>)


  return (
    <div className="container-fluid">
      <div className="niyaambassador-add parent-div mt-4">
        <div className="head-bar flex-content">
          <div className="breadcrumb">
            <p>
              <FormattedMessage
                id="breadcrumbs.addAmbassador"
                defaultMessage="Niya Ambassador > <b>Add Niya Ambassador</b>"
                values={{ b: (text) => <b>{text}</b> }}
              />
            </p>
          </div>
        </div>

        <div className="card-style  m-3">
          <div className="card-head flex-content">
            <div className="flex-content">
              <Link to="/ambassadors">
                <button type="button" className="btn btn-default back">
                  <i className="fas fa-chevron-left"></i>
                </button>
              </Link>
              <h6>
                <FormattedMessage
                  id="addNiyaAmbassador"
                  defaultMessage="Add Niya Ambassador"
                />
              </h6>
            </div>
          </div>
          <div className="cards-scroll p-3">
            <form className="card-details-form">
              <div className="flex-content">
                <div className="form-group mr-2">
                  <label>
                    <FormattedMessage id="name" defaultMessage="Name" />
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={ambassadorDetails.name}
                    onChange={handleChange}
                    required={true}
                    className="form-control"
                  />
                </div>
                <div className="form-group mr-2 position-relative">
                  <label>
                    <FormattedMessage id="email" defaultMessage="Email" />{' '}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={ambassadorDetails.email}
                    onChange={handleChange}
                    required={true}
                    className="form-control"
                    onBlur={emailValidation}
                  />
                  {emailError ? (
                    <p class="err-message">
                      <FormattedMessage
                        id="invalidEmail"
                        defaultMessage="Please provide a valid email"
                      />
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="flex-content">
                <div className="form-group mr-2 position-relative">
                  <label>
                    <FormattedMessage
                      id="phoneNumber"
                      defaultMessage="Phone Number"
                    />
                  </label>

                  <PhoneInput
                    onChange={handlePhoneChange}
                    inputClass="form-control"
                    inputStyle={{ paddingLeft: '50px' }}
                    onBlur={phoneValidation}
                  />
                  {phoneError ? (
                    <p class="err-message">
                      <FormattedMessage
                        id="invalidPhone"
                        defaultMessage="Please provide a valid phone number"
                      />
                    </p>
                  ) : (
                    ''
                  )}
                </div>
                <div className="form-group select position-relative">
                  <label>
                    <FormattedMessage
                      id="ambassadorProfitInPercent"
                      defaultMessage="Ambassador Profit (In %)"
                    />
                  </label>
                  <i className="fas fa-angle-down"></i>
                  <select
                    className="form-control"
                    name="profit_percentage"
                    onChange={handleChange}
                  >
                    <FormattedMessage id="select">
                      {(text) => <option value="">{text}</option>}
                    </FormattedMessage>
                    {profitPercentageOptions}
                  </select>
                </div>
              </div>

              {/* <div class="flex-content position-relative">
                <label class="phone-no-label">
                  <FormattedMessage
                    id="phoneNumber"
                    defaultMessage="Phone Number"
                  />
                </label>
                <div class="select position-relative code-select">
                  <i class="fas fa-angle-down"></i>
                  <select
                    class="form-control"
                    name="country_code"
                    value={ambassadorDetails.country_code}
                    onChange={handleChange}
                  >
                    <FormattedMessage id="select">
                      {(text) => <option value="">{text}</option>}
                    </FormattedMessage>
                    {countryCodes.map((country) => (
                      <option value={country.code}> {country.code}</option>
                    ))}
                  </select>
                </div>
                <div class="form-group position-relative mr-2 phone-no-group">
                  <label style={{ opacity: '0' }}>0</label>

                  <input
                    type="text"
                    name="phone"
                    class="form-control"
                    value={ambassadorDetails.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group select position-relative">
                  <label>
                    <FormattedMessage
                      id="ambassadorProfitInPercent"
                      defaultMessage="Ambassador Profit (In %)"
                    />
                  </label>
                  <i className="fas fa-angle-down"></i>
                  <select
                    className="form-control"
                    name="profit_percentage"
                    onChange={handleChange}
                  >
                    <FormattedMessage id="select">
                      {(text) => <option value="">{text}</option>}
                    </FormattedMessage>
                    {profitPercentageOptions}
                  </select>
                </div>
              </div> */}

              <div className="flex-content">
                <div className="form-group mr-2 position-relative icon-set-input">
                  <i className="far fa-calendar-alt"></i>
                  <label>
                    <FormattedMessage
                      id="startDate"
                      defaultMessage="Start Date"
                    />
                  </label>
                  <input
                    type="date"
                    min = {new Date().toISOString().substring(0,10)}
                    max={
                      ambassadorDetails.expiry_on
                        ? ambassadorDetails.expiry_on
                        : ''
                    }
                    className="form-control pl-5"
                    name="started_on"
                    value={ambassadorDetails.started_on}
                    onChange={handleChange}
                    required={true}
                  />
                </div>

                <div className="form-group  position-relative icon-set-input">
                  <i className="far fa-calendar-alt"></i>
                  <label>
                    <FormattedMessage
                      id="expireOn"
                      defaultMessage="Expire On"
                    />
                  </label>
                  <input
                    type="date"
                    style={{ paddingLeft: '15px' }}
                    className="form-control pl-5"
                    name="expiry_on"
                    min={
                      ambassadorDetails.started_on
                        ? new moment(ambassadorDetails.started_on)
                            .add(1, 'days')
                            .format('YYYY-MM-D')
                        : ''
                    }
                    value={ambassadorDetails.expiry_on}
                    onChange={handleChange}
                    required={true}
                  />
                  <div className="radio">
                    <input
                      name="is_forever"
                      type="radio"
                      style={{ marginTop: '10px' }}
                      checked={ambassadorDetails.is_forever}
                      onClick={handleChange}
                    />
                    <FormattedMessage id="forever" defaultMessage="Forever" />
                  </div>
                </div>
              </div>
              {error.allFieldsNotProvided ? (
                <div className="err-msg form-group">
                  <p>
                    <FormattedMessage id="errorIncompleteDetails" />
                  </p>
                </div>
              ) : (
                ''
              )}

              <div className="form-group  flex-content ml-auto">
                <button
                  type="button"
                  className="btn btn-default theme-button mr-2"
                  onClick={handleAdd}
                >
                  <FormattedMessage id="add" defaultMessage="Add" />
                </button>
                <button
                  type="button"
                  className="btn btn-default grey-button mr-2"
                >
                  <FormattedMessage id="cancel" defaultMessage="Cancel" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
