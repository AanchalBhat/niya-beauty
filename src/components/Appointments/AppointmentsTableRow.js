import React from 'react'
import constants from '../../utils/constants'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { Link, NavLink } from 'react-router-dom'

export default function AppointmentsTableRow({
  booking,
  handleActionClick,
  handleBookingModalViewClick,
}) {
  const startDate = moment(booking.start_time).format('Do MMMM, YYYY')
  const startTime = moment(booking.start_time).format('h:mm A')

  let bookingStatusText = 'pending'
  if (booking.status === constants['CODE_BOOKING_ACCEPTED'])
    bookingStatusText = 'accepted'
  else if (booking.status === constants['CODE_BOOKING_CANCELLED'])
    bookingStatusText = 'cancelled'
  else if (booking.status === constants['CODE_BOOKING_COMPLETE'])
    bookingStatusText = 'completed'
  else if (booking.status === constants['CODE_BOOKING_PENDING'])
    bookingStatusText = 'pending'
  else if (booking.status === constants['CODE_BOOKING_REJECTED'])
    bookingStatusText = 'rejected'

  const bookingStatus =
    bookingStatusText === 'cancelled' ? (
      <span className="canceled">
        <i className="far fa-times-circle"></i>{' '}
        <FormattedMessage id={bookingStatusText} />
      </span>
    ) : (
      <FormattedMessage id={bookingStatusText} />
    )

  return (
    <tr key={booking.booking_id}>
      <td className="booking-id cursor-pointer">
        <Link to={`/appointments/${booking.booking_id}/details`}>
          <span>{booking.booking_id}</span>
        </Link>
      </td>
      <td className="bold-names">
        <Link to={`/artist-management/${booking.artist_id}/profile`}>
          <span>{booking.artist_name}</span>
        </Link>
      </td>
      <td className="bold-names">
        <Link to={`/user-management/${booking.customer_id}/profile`}>
          <span>{booking.customer_name}</span>
        </Link>
      </td>
      <td>
        {startDate} <p className="span-text">{startTime}</p>
      </td>
      <td>
        {booking.duration_in_min}{' '}
        <FormattedMessage id="minutes" defaultMessage="Minutes" /> - $
        {booking.total_price}
        <p style={{ color: '#975E4A' }} className="span-text">
          {booking.package_name}
        </p>
      </td>
      <td>{bookingStatus}</td>

      <td className="action flex-content">
        <button
          type="button"
          className="btn btn-default view-user"
          onClick={() => {
            handleBookingModalViewClick(booking.booking_id, {
              packageName: booking.package_name,
              price: booking.total_price,
              startTime: booking.start_time,
              endTime: booking.end_time,
              status: bookingStatusText,
            })
          }}
        >
          <i className="fas fa-eye"></i>
        </button>
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-angle-down"></i>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {booking.status !== constants['CODE_BOOKING_CANCELLED'] ? (
              <span
                className="dropdown-item cursor-pointer"
                onClick={() => {
                  handleActionClick(
                    booking.booking_id,
                    constants['CODE_BOOKING_CANCELLED'],
                  )
                }}
              >
                <i className="fas fa-times"></i>{' '}
                <FormattedMessage id="cancel" defaultMessage="Cancel" />
              </span>
            ) : (
              ''
            )}
            {booking.status !== constants['CODE_BOOKING_COMPLETE'] ? (
              <span
                className="dropdown-item cursor-pointer"
                onClick={() => {
                  handleActionClick(
                    booking.booking_id,
                    constants['CODE_BOOKING_COMPLETE'],
                    <FormattedMessage id="confirm.bookingStatusChange" />,
                  )
                }}
              >
                <i className="fas fa-check"></i>{' '}
                <FormattedMessage id="complete" defaultMessage="Complete" />
              </span>
            ) : (
              ''
            )}

            {/* <span className="dropdown-item cursor-pointer">
              <i className="far fa-calendar-check"></i>{' '}
              <FormattedMessage id="reschedule" defaultMessage="Reschedule" />
            </span> */}
          </div>
        </div>
      </td>
    </tr>
  )
}
