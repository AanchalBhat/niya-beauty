import React from 'react'
import AppointmentTimes from '../ArtistRequests/ArtistProfile/AppointmentTimes'
import AppointmentTimesDaily from '../ArtistRequests/ArtistProfile/AppointmentTimesDaily'
import ArtistPersonalInfo from '../ArtistRequests/ArtistProfile/ArtistPersonalInfo'
import BeautyProfileData from '../ArtistRequests/ArtistProfile/BeautyProfileData'
import EducationDetails from '../ArtistRequests/ArtistProfile/EducationDetails'
import GallerySection from '../ArtistRequests/ArtistProfile/GallerySection'
import PackageSection from '../ArtistRequests/ArtistProfile/PackageSection'
import SocialMedia from '../ArtistRequests/ArtistProfile/SocialMedia'
import AMHeader from './AMHeader'
import AppointmentsCard from './AppointmentsSection'
import './ArtistProfile.css'
import BookingStatusSection from './BookingStatusSection'
import CertificatesSection from './CertificatesSection'
import ChatsSection from './ChatsSection'
import EarningsSection from './EarningsSection/EarningsSection'
import ReferralSection from './ReferralSection'
import ReportsSection from './ReportsSection'

export default function ArtistProfileView(props) {
  const {
    artistProfileData,
    otherProfileData,
    handleChange,
    isLoading,
    handleEducationReset,
    addEducation,
    removeEducation,
    artistId,
    beautyProfileArray,
    handleActionClick,
    fullName,
  } = props

  return (
    <div>
      <div class="container-fluid">
        <div class="artist-management artist-profile parent-div pb-4 mt-4">
          <AMHeader
            handleActionClick={handleActionClick}
            isFeatured={otherProfileData.is_featured}
            isEnabled={otherProfileData.is_enabled}
          />
          <ArtistPersonalInfo
            profileData={artistProfileData}
            emailVerified={otherProfileData.email_verified}
            phoneVerified={otherProfileData.phone_verified}
            handleChange={handleChange}
            fullName={fullName}
            showFollowers={true}
            numFollowers={otherProfileData.followers}
          />
          <div className="row">
            <div className="col-md-6">
              <EducationDetails
                isLoading={isLoading}
                education={artistProfileData.education}
                handleChange={handleChange}
                handleEducationReset={handleEducationReset}
                addEducation={addEducation}
                removeEducation={removeEducation}
              />
            </div>

            <div className="col-md-3">
              <SocialMedia
                website={artistProfileData.website_link}
                fb={artistProfileData.facebook_link}
                instagram={artistProfileData.instagram_link}
                youtube={artistProfileData.youtube_link}
                pinterest={artistProfileData.pinterest_link}
                handleChange={handleChange}
              />
            </div>
            <div class="col-md-3">
              <AppointmentsCard />
            </div>
          </div>
          <div className="row packages-parent">
            <div className="col-md-3">
              <ChatsSection />
            </div>
            <div className="col-md-9">
              <PackageSection
                packages={otherProfileData.packages}
                hourlyRate={artistProfileData.hourly_rate}
                artistId={artistId}
              />
            </div>
          </div>
          <BeautyProfileData data={beautyProfileArray} artistId={artistId} />
          <GallerySection media={otherProfileData.media} artistId={artistId} />
          <CertificatesSection
            certificates={otherProfileData.training_certificate}
            artistId={artistId}
          />
          <div className="row pb-3">
            <div className="col-md-9">
              <ReferralSection />
            </div>
            <div className="col-md-3">
              <BookingStatusSection data={otherProfileData.booking_status} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <AppointmentTimesDaily />
            </div>
            
          </div>
          <div className="row mb-4">
            <div className="col-md-9">
              <AppointmentTimes />
            </div>
            <div className="col-md-3">
              <ReportsSection />
            </div>
          </div>
          <div className="row">
          <div className="col-md-12">
              <EarningsSection
                earnings={otherProfileData.earnings}
                artistId={artistId}
                wallet={otherProfileData.wallet}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
