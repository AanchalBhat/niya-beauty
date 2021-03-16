import React from 'react'
import { Form } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import { Link, useRouteMatch } from 'react-router-dom'
import constants from '../../utils/constants'

export default function Breadcrumbs(props) {
  const { requestType, setRequestType, requestCount } = props
  const { path, url } = useRouteMatch()
  let breadcrumbsText = 'breadcrumbs.artistRequests.pending'
  if (requestType === constants['ARTIST_REQUEST_TYPE_DISAPPROVED']) {
    breadcrumbsText = 'breadcrumbs.artistRequests.disapproved'
  }
  if (requestType === constants['ARTIST_REQUEST_TYPE_REJECTED']) {
    breadcrumbsText = 'breadcrumbs.artistRequests.rejected'
  }

  return (
    <React.Fragment>
      <div className="breadcrumb p-2">
        <p>
          <FormattedMessage
            id={breadcrumbsText}
            defaultMessage="Artist Requests > <b>Requests</b>"
            values={{ b: (text) => <b>{text}</b> }}
          />
        </p>
      </div>

      <ul className="nav nav-pills sub-tabs" role="tablist">
        <li className="nav-item">
          <Link
            to={`${url}/pending`}
            className={`nav-link ${
              requestType === constants['ARTIST_REQUEST_TYPE_PENDING']
                ? 'active'
                : ''
            } flex-content`}
            onClick={() => {
              setRequestType(constants['ARTIST_REQUEST_TYPE_PENDING'])
            }}
          >
            <FormattedMessage id="requests" defaultMessage="Requests" />{' '}
            <p>{requestCount.pending}</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              requestType === constants['ARTIST_REQUEST_TYPE_DISAPPROVED']
                ? 'active'
                : ''
            } flex-content`}
            data-toggle="pill"
            to={`${url}/disapproved`}
            onClick={() => {
              setRequestType(constants['ARTIST_REQUEST_TYPE_DISAPPROVED'])
            }}
          >
            <FormattedMessage id="disapproved" defaultMessage="Disapproved" />{' '}
            <p>{requestCount.disapproved}</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              requestType === constants['ARTIST_REQUEST_TYPE_REJECTED']
                ? 'active'
                : ''
            } flex-content`}
            data-toggle="pill"
            to={`${url}/rejected`}
            onClick={() => {
              setRequestType(constants['ARTIST_REQUEST_TYPE_REJECTED'])
            }}
          >
            <FormattedMessage id="rejected" defaultMessage="Rejected" />{' '}
            <p>{requestCount.rejected}</p>
          </Link>
        </li>
      </ul>
    </React.Fragment>
  )
}
