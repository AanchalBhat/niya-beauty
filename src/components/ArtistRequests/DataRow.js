import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import CODES from '../../utils/constants'
import { FormattedMessage } from 'react-intl'
import constants from '../../utils/constants'

export default function DataRow(props) {
  const RowDropdownMenu = props.dropdownMenu
  const { handleActionClick, requestType } = props
  const { request } = props

  const date = moment(request.signup_date).format('Do MMMM, YYYY')
  const time = moment(request.signup_date).format('h:mm A')
  const authType = request.auth_type
  let signupType = ''
  switch (authType) {
    case CODES['SIGN_UP_TYPE_EMAIL']:
      signupType = <FormattedMessage id="email" defaultMessage="E-Mail" />
      break
    case CODES['SIGN_UP_TYPE_PHONE']:
      signupType = <FormattedMessage id="phone" defaultMessage="Phone" />
      break
    case CODES['SIGN_UP_TYPE_FACEBOOK']:
      signupType = <FormattedMessage id="facebook" defaultMessage="Facebook" />
      break
    case CODES['SIGN_UP_TYPE_GOOGLE']:
      signupType = <FormattedMessage id="google" defaultMessage="Google" />
      break
    case CODES['SIGN_UP_TYPE_APPLE']:
      signupType = <FormattedMessage id="apple" defaultMessage="Apple" />
      break
    default:
      signupType = ''
  }

  const reqType = request.is_verified

  let newReqText = <FormattedMessage id="new" defaultMessage="New" />
  let reappliedReqText = (
    <FormattedMessage id="reapplied" defaultMessage="Reapplied" />
  )
  if (reqType === constants['ARTIST_REQUEST_TYPE_REAPPLIED']) {
    reappliedReqText = (
      <FormattedMessage
        id="reapplied"
        defaultMessage="Reapplied"
        values={{ count: request.reapply_count }}
      />
    )
  }

  // switch (reqType) {
  //   case CODES['ARTI']:
  //     signupType = <FormattedMessage id="email" defaultMessage="E-Mail" />
  //     break
  //   case CODES['SIGN_UP_TYPE_PHONE']:
  //     signupType = <FormattedMessage id="phone" defaultMessage="Phone" />
  //     break
  //   case CODES['SIGN_UP_TYPE_FACEBOOK']:
  //     signupType = <FormattedMessage id="facebook" defaultMessage="Facebook" />
  //     break
  //   case CODES['SIGN_UP_TYPE_GOOGLE']:
  //     signupType = <FormattedMessage id="google" defaultMessage="Google" />
  //     break
  //   case CODES['SIGN_UP_TYPE_APPLE']:
  //     signupType = <FormattedMessage id="apple" defaultMessage="Apple" />
  //     break
  //   default:
  //     signupType = ''
  // }

  return (
    <tr>
      <td className="action">
        <div className="flex-content action-inner">
          <Link to={`/artist-requests/${request.user_id}/profile`}>
            <button type="button" className="btn btn-default view-request">
              <i className="fas fa-eye"></i>
            </button>
          </Link>
          <RowDropdownMenu
            userId={request.user_id}
            handleActionClick={handleActionClick}
            isEnabled={request.is_enabled}
            requestType={requestType}
          />
        </div>
      </td>
      <td>{request.user_id}</td>
      <td>
        {request.full_name
          ? request.full_name
          : request.first_name + ' ' + request.last_name}
      </td>
      <td>{request.email}</td>
      <td>{request.country}</td>

      <td>{request.app_version}</td>
      <td>
        {request.device_type === constants['DEVICE_TYPE_IOS'] ? (
          <FormattedMessage id="iOS" />
        ) : (
          <FormattedMessage id="Android" />
        )}
        <p className="span-text">{request.device_name}</p>
      </td>
      <td>{request.phone}</td>
      <td>{signupType}</td>
      <td>
        {date}
        <p className="span-text">{time}</p>
      </td>
      <td>
        {reqType === constants['ARTIST_REQUEST_TYPE_REAPPLIED']
          ? reappliedReqText
          : newReqText}
      </td>
    </tr>
  )
}
