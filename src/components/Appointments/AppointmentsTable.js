import React from 'react'
import { FormattedMessage } from 'react-intl'
import AppointmentsTableRow from './AppointmentsTableRow'

export default function AppointmentsTable({
  bookings,
  sortField,
  sortOrder,
  handleSortChange,
  handleActionClick,
  handleBookingModalViewClick
}) {
  return (
    <div class="data-table">
      <table class="table table-striped ">
        <thead>
          <tr>
            <th
              onClick={() => {
                handleSortChange('booking_id')
              }}
            >
              <FormattedMessage id="bookingRef" defaultMessage="Booking Ref." />
              {'  '}
              {sortField === 'booking_id' ? (
                <i
                  className={`fas fa-angle-${sortOrder === 0 ? 'up' : 'down'}`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th
              onClick={() => {
                handleSortChange('artist_name')
              }}
            >
              <FormattedMessage id="artistName" defaultMessage="Artist Name" />{' '}
              {sortField === 'artist_name' ? (
                <i
                  className={`fas fa-angle-${sortOrder === 0 ? 'up' : 'down'}`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th
              onClick={() => {
                handleSortChange('customer_name')
              }}
            >
              <FormattedMessage id="clientName" defaultMessage="Client Name" />{' '}
              {sortField === 'customer_name' ? (
                <i
                  className={`fas fa-angle-${sortOrder === 0 ? 'up' : 'down'}`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th
              onClick={() => {
                handleSortChange('start_time')
              }}
            >
              <FormattedMessage
                id="appointmentTime"
                defaultMessage="Appointment Time"
              />{' '}
              {sortField === 'start_time' ? (
                <i
                  className={`fas fa-angle-${sortOrder === 0 ? 'up' : 'down'}`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th>
              <FormattedMessage id="packages" defaultMessage="Packages" />
              {''}
            </th>
            <th
              onClick={() => {
                handleSortChange('status')
              }}
            >
              <FormattedMessage
                id="bookingStatus"
                defaultMessage="Booking Status"
              />{' '}
              {sortField === 'status' ? (
                <i
                  className={`fas fa-angle-${sortOrder === 0 ? 'up' : 'down'}`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th>
              <FormattedMessage id="action" defaultMessage="Action" />
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <AppointmentsTableRow
              booking={booking}
              handleActionClick={handleActionClick}
              handleBookingModalViewClick={handleBookingModalViewClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
