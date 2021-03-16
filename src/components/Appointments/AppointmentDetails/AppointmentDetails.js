import React, { useState, useEffect, useContext } from 'react'
import AppointmentDetailsView from './AppointmentDetailsView'
import './AppointmentDetails.css'
import { useParams } from 'react-router-dom'
import { LanguageContext } from '../../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../../context/AccessTokenProvider'
import { getBookingDetailsAPI } from '../../../api/api'
import DEFAULTS from '../../../utils/DEFAULTS'

//Star values is the adjectve associated with the number of stars recieved via rating
export default function AppointmentDetails({ starValues }) {
  const { bookingId } = useParams()
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const [appointmentDetails, setAppointmentDetails] = useState(
    DEFAULTS['APPOINTMENT_DETAILS'],
  )

  useEffect(() => {
    const queryParams = {
      bookingId,
      language,
    }
    getBookingDetailsAPI(queryParams, accessToken).then((res) => {
      if (res.success !== false) {
        const responseData = res.data.data
        setAppointmentDetails(responseData)
      }
    })
  }, [])

  return (
    <AppointmentDetailsView
      details={appointmentDetails}
      starValues={starValues}
    />
  )
}
