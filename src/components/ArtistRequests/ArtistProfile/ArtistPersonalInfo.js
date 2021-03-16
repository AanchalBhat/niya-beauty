import React from 'react'
import HomeAddress from './HomeAddress'
import PersonalData from './PersonalData'

export default function ArtistPersonalInfo({
  profileData,
  emailVerified,
  phoneVerified,
  handleChange,
  fullName,
  showFollowers,
  numFollowers
}) {
  const {
    first_name,
    last_name,
    email,
    phone,
    birth_date,
    about,
    street_address,
    city,
    zipcode,
    country,
    profile_image,
  } = profileData

  return (
    <div className="row">
      {/* <!-- personal-info-card --> */}
      <div className="col-md-12">
        <div className="card-style">
          {/* Personal Data */}
          <PersonalData
            profileData={profileData}
            firstName={first_name}
            lastName={last_name}
            email={email}
            phone={phone}
            birthDate={birth_date}
            about={about}
            emailVerified={emailVerified}
            phoneVerified={phoneVerified}
            profileImage={profile_image}
            handleChange={handleChange}
            fullName={fullName}
            showFollowers={showFollowers}
            numFollowers={numFollowers}
          />
          {/* <!-- Home Address --> */}
          <HomeAddress
            profileData={profileData}
            streetAddress={street_address}
            city={city}
            zipcode={zipcode}
            country={country}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}
