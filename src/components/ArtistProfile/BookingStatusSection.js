import React from 'react'
import bookingsIcon from '../../assets/images/book-status-ic.png'
import { FormattedMessage } from 'react-intl'

export default function BookingStatusSection({ data }) {
  return (
    <div className="theme-card education-sec position-relative mt-3">
      <img src={bookingsIcon} />
      <div className="">
        <h6>
          <FormattedMessage
            id="bookingStatus"
            defaultMessage="Booking Status"
          />
        </h6>
      </div>
      <div className="center-portion">
        <h1 style={{ fontWeight: '600' }}>
          {data.accepted.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </h1>
        <p>
          <FormattedMessage id="schedule" defaultMessage="Schedule" />
        </p>
      </div>
      <div className="end-portion">
        <h4>
          {data.completed
            ? data.completed.toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })
            : data.completed}
        </h4>
        <p>
          <FormattedMessage id="completed" defaultMessage="Completed" />
        </p>
      </div>
    </div>
  )
}
