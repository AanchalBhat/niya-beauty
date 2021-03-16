import React from 'react'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import DatePicker from 'react-datepicker'

export default function EarningsFilter(props) {
  const {
    setStartDate,
    setEndDate,
    startDate,
    endDate,
    checkIfErrorsRemoved,
    error,
  } = props
  return (
    <div className="filters">
      <form className="flex-content">
        <div className="form-group position-relative">
          <label>
            <FormattedMessage id="startDate" />:{' '}
          </label>
          <DatePicker
            selected={startDate}
            className="form-control"
            onChange={(date) => {
              setStartDate(date)
              checkIfErrorsRemoved()
            }}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            maxDate={moment(new Date()).subtract(5, 'months').toDate()}
          />
          {error.error ? (
            <p className="err-filter">
              <FormattedMessage id={error.message ? error.message : 'blank'} />
            </p>
          ) : (
            ''
          )}
        </div>
        <div className="form-group">
          <label>
            <FormattedMessage id="endDate" />:{' '}
          </label>
          <DatePicker
            selected={endDate}
            className="form-control"
            onChange={(date) => {
              setEndDate(date)
              checkIfErrorsRemoved()
            }}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            maxDate={new Date()}
          />
        </div>
      </form>
    </div>
  )
}
