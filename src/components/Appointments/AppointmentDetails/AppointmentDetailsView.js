import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../../common/Breadcrumbs'
import ArtistDetailsCard from './ArtistDetailsCard'
import BookingDetailsCard from './BookingDetailsCard'
import ClientDetailsCard from './ClientDetailsCard'
import FeedbackArtistCard from './FeedbackArtistCard'
import FeedbackClientCard from './FeedbackClientCard'
import PackageAndAppointmentDetailsCard from './PackageAndAppointmentDetailsCard'
import constants from '../../../utils/constants'

export default function AppointmentDetailsView({ details, starValues }) {
  const {
    artist_details: artistDetails,
    customer_details: customerDetails,
    booking_details: bookingDetails,
    services,
    feedback,
    feedback_values: feedbackValues,
  } = details

  console.log(bookingDetails.status)
  console.log(constants['CODE_BOOKING_COMPLETE'])
  console.log(bookingDetails.status == constants['CODE_BOOKING_COMPLETE'])

  const breadcrumbsText = (
    <FormattedMessage
      id="breadcrumbs.bookingDetails"
      values={{ b: (text) => <b>{text}</b> }}
    />
  )

  return (
    <div className="container-fluid">
      <div className="appointment-booking-details parent-div mt-4">
        <Breadcrumbs text={breadcrumbsText} />

        <div className="card-style packages-cards m-3">
          <div className="card-head flex-content">
            <div className="flex-content">
              <Link to="/appointments">
                <button type="button" className="btn btn-default back">
                  <i className="fas fa-chevron-left"></i>
                </button>
              </Link>
              <h6>
                <FormattedMessage id="details" defaultMessage="details" />
              </h6>
            </div>
          </div>
          <div className="cards-scroll p-3">
            <div className="row">
              <div className="col-md-3">
                <ArtistDetailsCard details={artistDetails} />
              </div>

              <div className="col-md-3">
                <ClientDetailsCard details={customerDetails} />
              </div>

              <div className="col-md-6">
                <PackageAndAppointmentDetailsCard
                  details={{ bookingDetails, services }}
                />
              </div>

              <div className="col-md-3 mt-4">
                <BookingDetailsCard />
              </div>

              <div className="col-md-3 mt-4">
                <FeedbackClientCard
                  details={feedback[0]}
                  feedbackValues={feedbackValues}
                  starValues={starValues}
                />
              </div>

              <div className="col-md-3 mt-4 mb-3">
                <FeedbackArtistCard
                  details={feedback[1]}
                  feedbackValues={feedbackValues}
                  starValues={starValues}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
