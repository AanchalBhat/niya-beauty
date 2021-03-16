import React from 'react'
import { FormattedMessage } from 'react-intl'
import appointmentsIcon from '../../assets/images/appointment-ic.png'

export default function AppointmentsCard() {
  return (
    <div class="theme-card education-sec position-relative mt-3">
      <img src={appointmentsIcon} />
      <h2>
        <FormattedMessage id="appointments" defaultMessage="Appointments" />
      </h2>
      <div class="view">
        <a href="#">
          View <i class="fas fa-angle-right"></i>
        </a>
      </div>
    </div>
  )
}
