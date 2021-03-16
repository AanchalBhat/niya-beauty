import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import PackageItemCard from './PackageItemCard'

export default function ArtistPackagesView(props) {
  const {
    artistId,
    availableServices,
    packages,
    handleServiceToggle,
    handleChange,
    handleSave,
    loader,
    errors,
  } = props

  return (
    <div className="container-fluid">
      <div className="packages parent-div packages-section">
        <div className="head-bar flex-content">
          
          <div className="breadcrumb">
            <p>
              <FormattedMessage
                id="breadcrumbs.artistPackages"
                defaultMessage="Artist Management > User Profile > <b>Packages</b>"
                values={{
                  b: (text) => <b>{text}</b>,
                }}
              />
            </p>
          </div>
        </div>
        {/* <!-- PACKAGES-CARDS --> */}
        <div className="card-style packages-cards m-3">
          <div className="card-head">
            <div className="flex-content">
              <Link to={`/artist-management/${artistId}/profile`}>
                <button type="button" className="btn btn-default back">
                  <i className="fas fa-chevron-left"></i>
                </button>
              </Link>
              <h6>
                <FormattedMessage id="packages" defaultMessage="Packages" />
              </h6>
            </div>
          </div>
          <div className="cards-scroll">
            {/* <!-- cards --> */}
            <div style={{ borderBottom: '1px solid #F5EEE7;' }} className="row">
              {packages.map((ele, index) => (
                <PackageItemCard
                  key={ele.package_id}
                  packageName={ele.package_name}
                  durationInMinutes={ele.duration_in_min}
                  availableServices={availableServices}
                  selectedServices={ele.service_ids}
                  isEnabled={ele.is_enabled}
                  packageIndex={index}
                  media={ele.media}
                  price={ele.price}
                  handleServiceToggle={handleServiceToggle}
                  handleChange={handleChange}
                  handleSave={handleSave}
                  loader ={loader}
                  error={errors[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
