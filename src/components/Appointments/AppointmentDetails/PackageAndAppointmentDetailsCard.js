import React from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'

export default function PackageAndAppointmentDetailsCard({ details }) {
  const { bookingDetails, services } = details
  return (
    <div className="details-card">
      <h6>
        <FormattedMessage
          id="packageAppointmentDetails"
          defaultMessage="Package and Appointment Details"
        />
      </h6>
      <div className="flex-content">
        <div className="group mr-5">
          <label>
            <FormattedMessage id="packageName" defaultMessage="Package Name" />
          </label>
          <p>{bookingDetails.package_name}</p>
        </div>

        <div className="group mr-5">
          <label>
            {' '}
            <FormattedMessage
              id="packagePrice"
              defaultMessage="Package Price"
            />
          </label>
          <p>${bookingDetails.total_price}</p>
        </div>
        <div className="group">
          <label>
            <FormattedMessage id="duration" defaultMessage="Duration" />
          </label>
          <p>
            {bookingDetails.duration_in_min} <FormattedMessage id="minutes" />
          </p>
        </div>
      </div>

      <div className="flex-content">
        <div className="group">
          <label>
            <FormattedMessage
              id="appointmentTime"
              defaultMessage="Appointment Time"
            />
          </label>
          <p>24th July, 2020 , 10:00 AM</p>
        </div>
      </div>

      <div className="services mt-2">
        <h6>
          {' '}
          <FormattedMessage id="services" defaultMessage="Services" />{' '}
        </h6>
        <ul>
          {services.map((service) => (
            <li
              style={{ flexWrap: 'nowrap' }}
              className="d-flex"
              key={service.service_id}
            >
              <i className="fas fa-check-circle mr-2 mt-1"></i>
              <p>{service.service_name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
