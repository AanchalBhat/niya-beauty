import React from 'react'
import BookingStatusCard from './CustomerBookingStatusCard'
import CustomerProfileHeadBar from './CustomerProfileHeadBar'
import PersonalInfoCard from './CustomerPersonalInfoCard'
import BeautyProfileDataCard from './BeautyProfileDataCard'
import LoginActivityCard from './CustomerLoginActivityCard'

export default function CustomerProfileView({
  profileData,
  activityData,
  bookingStatusData,
  handleChange,
  handleActionClick,
  beautyProfileData
}) {
  return (
    <div className="container-fluid">
      <div className="user-management user-profile parent-div mt-4 customer-profile-na">
        <CustomerProfileHeadBar
          isEnabled={profileData.isEnabled}
          handleActionClick={handleActionClick}
        />

        <div className="row">
          <div className="col-md-3">
            <BookingStatusCard data={bookingStatusData} />
          </div>

          <div className="col-md-9">
            <PersonalInfoCard data={profileData} handleChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <BeautyProfileDataCard data={beautyProfileData}/>
          </div>
        </div>

        <div className="col-md-12">
          <LoginActivityCard data={activityData} />
        </div>
      </div>
    </div>
  )
}
