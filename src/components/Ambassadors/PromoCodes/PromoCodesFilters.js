import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function PromoCodesFilters({ filters, handleChange }) {
  return (
    <div className="filters">
      <form className="flex-content">
        <div className="form-group icon-set-input position-relative">
          <i className="far fa-calendar-alt"></i>
          <label>
            <FormattedMessage id="startDate" />
          </label>
          <input
            type="date"
            name="start_date"
            value={filters.start_date}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group icon-set-input position-relative">
          <i className="far fa-calendar-alt"></i>
          <label>
            <FormattedMessage id="endDate" />
          </label>
          <input
            type="date"
            className="form-control"
            name="end_date"
            value={filters.end_date}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  )
}
