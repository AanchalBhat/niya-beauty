import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function HomeAddress({
  streetAddress,
  city,
  zipcode,
  country,
  handleChange,
}) {
  return (
    <div className="home-address position-relative">
      <hr />
      <div style={{ textAlign: 'left' }} className="address-inputs">
        <div className="table-head">
          <h6>
            <FormattedMessage id="homeAddress" defaultMessage="Home Address" />
          </h6>
        </div>
        <form className="">
          <div className="flex-content">
            <div className="form-group">
              <label>
                <FormattedMessage
                  id="homeAddress"
                  defaultMessage="Home Address"
                />
              </label>
              <input
                name="street_address"
                type="text"
                className="form-control"
                value={streetAddress}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <FormattedMessage id="city" defaultMessage="City" />
              </label>
              <input
                name="city"
                type="text"
                className="form-control"
                value={city}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex-content">
            <div className="form-group">
              <label>
                <FormattedMessage id="city" defaultMessage="Zip" />
              </label>
              <input
                name="zipcode"
                type="text"
                className="form-control"
                value={zipcode}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                <FormattedMessage id="country" defaultMessage="Country" />
              </label>
              <input
                name="country"
                type="text"
                className="form-control"
                value={country}
                onChange={handleChange}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
