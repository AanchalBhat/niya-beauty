import React from 'react'
import dollarIcon from '../../../assets/images/dollar.png'
import { Link, useRouteMatch } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

export default function PackageSection(props) {
  const { url } = useRouteMatch()
  const { packages, hourlyRate, artistId } = props
  return (
    <div className="card-style packages-data mt-3">
      <div className="table-head flex-content">
        <h6>
          <FormattedMessage id="packages" defaultMessage="Packages" />
        </h6>
        <Link
          to={`/artist-management/${artistId}/profile/packages`}
          className="ml-auto"
        >
          <button
            type="button"
            className="btn btn-default theme-button ml-auto"
          >
            {' '}
            <i className="fas fa-pencil-alt"></i> Edit
          </button>
        </Link>
      </div>

      <div className="question-cards flex-content-scroll">
        {packages.map((packageItem) => (
          <li key={packageItem.package_id}>
            <div className="card">
              <h5>{packageItem.duration_in_min} Minutes</h5>
              <h6>{packageItem.package_name}</h6>

              <div className="end-portion flex-content">
                <p>
                  <b>${packageItem.price}</b>
                </p>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  )
}
