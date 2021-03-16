import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function AmbassadorListingFilters({ handleChange, filters }) {
  return (
    <div className="filters">
      <form className="flex-content">
        <div className="form-group">
          <label>
            <FormattedMessage id="name" defaultMessage="Name" />
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            onChange={handleChange}
            value={filters.name}
          />
        </div>

        <div className="form-group">
          <label>
            <FormattedMessage id="phoneNo" defaultMessage="Phone No." />
          </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            onChange={handleChange}
            value={filters.phone}
          />
        </div>

        <div className="form-group">
          <label>
            <FormattedMessage id="email" defaultMessage="Email" />
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
            value={filters.email}
          />
        </div>

        <div className="form-group">
          <label>
            <FormattedMessage id="ambassadorID" defaultMessage="Phone" />
          </label>
          <input
            type="text"
            className="form-control"
            name="ambassador_id"
            onChange={handleChange}
            value={filters.ambassador_id}
          />
        </div>

        <div className="form-group icon-set-input position-relative">
          <i className="far fa-calendar-alt"></i>
          <label>
            <FormattedMessage id="dateCreated" defaultMessage="Date Created" />
          </label>
          <input
            type="date"
            name="started_on"
            onChange={handleChange}
            className="form-control"
            value={filters.started_on}
          />
        </div>

        <div className="form-group icon-set-input position-relative">
          <i className="far fa-calendar-alt"></i>
          <label>
            {' '}
            <FormattedMessage id="expiryDate" defaultMessage="Expiry Date" />
          </label>
          <input
            type="date"
            name="expiry_on"
            onChange={handleChange}
            className="form-control"
            value={filters.expiry_on}
          />
        </div>
      </form>
    </div>
  )
}
