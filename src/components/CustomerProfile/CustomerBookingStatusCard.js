import React from 'react'
import { FormattedMessage } from 'react-intl'
import bookingStatusIcon from '../../assets/images/book-status-ic.png'

export default function CustomerBookingStatusCard({ data }) {
  return (
    <div className="theme-card position-relative">
      <img src={bookingStatusIcon} />
      <h6>
        <FormattedMessage id="bookingStatus" defaultMessage="Booking Status" />
      </h6>

      <div className="center-portion">
        <h2>
          {/* {data.accepted ? (data.accepted).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          }) : ''} */}
          {data.accepted ? data.accepted : '0'}
        </h2>
        <h6>
          <FormattedMessage id="schedule" defaultMessage="Schedule" />
        </h6>
      </div>

      <div className="end-portion">
        <h4>{data.completed ? data.completed : '0'}</h4>
        <p>
          <FormattedMessage id="complete" defaultMessage="Complete" />
        </p>
      </div>
    </div>
  )
}
