import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function AppointmentsFilters({ filters, handleFiltersChange,packageDropdownOptions }) {
  return (
    <div className="filters">
      <form className="flex-content">
        <div className="form-group">
          <label>
            <FormattedMessage
              id="bookingRef"
              defaultMessage="Booking Reference"
            />
          </label>
          <input
            type="text"
            name="booking_id"
            value={filters.booking_id}
            onChange={handleFiltersChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>
            <FormattedMessage id="artistName" defaultMessage="Artist Name" />
          </label>
          <input
            type="text"
            className="form-control"
            name="artist_name"
            value={filters.artist_name}
            onChange={handleFiltersChange}
          />
        </div>

        <div className="form-group">
          <label>
            <FormattedMessage id="clientName" defaultMessage="Client Name" />
          </label>
          <input
            type="text"
            className="form-control"
            name="customer_name"
            value={filters.customer_name}
            onChange={handleFiltersChange}
          />
        </div>

        <div className="form-group icon-set-input position-relative">
          <i className="far fa-calendar-alt"></i>
          <label>
            <FormattedMessage
              id="appointmentTime"
              defaultMessage="appointmentTime"
            />
          </label>
          <input
            type="date"
            name="scheduled_on"
            value={filters.scheduled_on}
            className="form-control"
            onChange={handleFiltersChange}
          />
        </div>

        <div className="form-group select position-relative">
          <label>
            {' '}
            <FormattedMessage id="packages" defaultMessage="Packages" />
          </label>
          <i className="fas fa-angle-down"></i>
          <select className="form-control" name="package" onChange={handleFiltersChange}>
            <FormattedMessage id="select" defaultMessage="Search">
              {(searchText) => (
                <option selected value="">
                  {searchText}
                </option>
              )}
            </FormattedMessage>
            {packageDropdownOptions}

          </select>
        </div>
      </form>
    </div>
  )
}
