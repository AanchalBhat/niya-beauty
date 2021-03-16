import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

export default function CertificatesSection({ certificates, artistId }) {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card-style beauty-data mt-3">
          <div className="table-head flex-content">
            <h6>
              <FormattedMessage
                id="certificates"
                defaultMessage="Certificates"
              />
            </h6>
            <Link
              className="ml-auto"
              to={{
                pathname: `/artist-management/${artistId}/profile/certificates`,
                state: {
                  certificatesList : certificates,
                },
              }}
            >
              <button type="button" className="btn btn-default theme-button">
                <i className="fas fa-pencil-alt"></i>{' '}
                <FormattedMessage id="edit" defaultMessage="Edit" />
              </button>
            </Link>
          </div>
          <div className="doc flex-content-scroll">
            {certificates.map((certificateLink, index) => (
              <img src={certificateLink} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
