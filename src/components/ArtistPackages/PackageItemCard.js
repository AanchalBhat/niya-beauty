import React from 'react'
import { FormattedMessage } from 'react-intl'
import NewLoader from '../common/LoadingSpinner/NewLoader'

export default function PackageItemCard(props) {
  const {
    packageName,
    durationInMinutes,
    media,
    loader,
    price,
    availableServices,
    selectedServices,
    isEnabled,
    packageIndex,
    handleServiceToggle,
    handleChange,
    handleSave,
    error,
  } = props

  return (
    <div className="col-md-3 card-border pb-3">
      <div className="package-card mt-3">
        <div className="card-color">
          <div className="switch-btn mb-3 flex-content">
            <p>
              <FormattedMessage
                id="package.toggle.desc"
                defaultMessage="Turning off will make this package unavailable to your clients"
              />
            </p>

            <label className="switch ml-auto">
              <input
                type="checkbox"
                name="is_enabled"
                checked={isEnabled}
                onChange={(e) => {
                  handleChange(e, packageIndex)
                }}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <ul className="package-imgs pb-2 flex-content-scroll">
            {media
              ?JSON.parse(media).map((url, index) => (
                  <li>
                    <img src={url} key={index} />
                  </li>
                ))
              : ''}
          </ul>

          <div className="head-part">
            <h5>
              {durationInMinutes}{' '}
              <FormattedMessage id="minutes" defaultMessage="Minutes" />
            </h5>
            <h6 className="mt-1">{packageName}</h6>
          </div>

          <div className="price-package">
            <form>
              <div className="form-group position-relative">
                <i className="fas fa-dollar-sign"></i>
                <input
                  type="text"
                  name="price"
                  className="form-control"
                  value={price}
                  onChange={(e) => {
                    handleChange(e, packageIndex)
                  }}
                />
                <p className="err-message">
                  {error ? (
                    error.price ? (
                      <FormattedMessage id={error.message ? error.message : 'blank'} />
                    ) : (
                      ''
                    )
                  ) : (
                    ''
                  )}
                </p>
              </div>
            </form>
          </div>

          <div className="services">
            <div className="flex-content mb-2">
              <h6 className="mb-1">
                <FormattedMessage id="services" defaultMessage="Services" />
              </h6>
              <p style={{ fontSize: '10px;' }} className="ml-auto">
                <FormattedMessage
                  id="selectedServices"
                  defaultMessage="Selected Services"
                />
                - {selectedServices.length}
              </p>
            </div>
            <ul>
              {Object.entries(availableServices).map(([key, value]) => (
                <li
                  style={{ flexWrap: 'nowrap;' }}
                  className={`d-flex cursor-pointer ${
                    selectedServices.includes(key) ? '' : 'unselected'
                  }`}
                  onClick={() => {
                    handleServiceToggle(packageIndex, key)
                  }}
                >
                  <i className="fas fa-check-circle mr-2 mt-1"></i>
                  <p>
                    <b>{value.service_name}</b> {value.service_description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="save-button">
          <button
            type="button"
            className="btn btn-default theme-button"
            disabled={loader}
            onClick={() => {
              handleSave(packageIndex)
            }}
            // disabled={error?(error.error):false}
          >
            <FormattedMessage id="save" />
            {loader === true  ? <NewLoader /> : null}
          </button>
         
        </div>
      </div>
    </div>
  )
}
