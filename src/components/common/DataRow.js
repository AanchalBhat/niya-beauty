import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import CODES from '../../utils/constants'
import constants from '../../utils/constants'

export default function DataRow(props) {
  const RowDropdownMenu = props.dropdownMenu
  const { handleActionClick } = props
  const { user,type } = props

  const date = moment(user.signup_date).format('Do MMMM, YYYY')
  const time = moment(user.signup_date).format('h:mm A')
  const authType = user.auth_type
  let signupType = ''
  switch (authType) {
    case CODES['SIGN_UP_TYPE_EMAIL']:
      signupType = 'E-Mail'
      break
    case CODES['SIGN_UP_TYPE_PHONE']:
      signupType = 'Phone'
      break
    case CODES['SIGN_UP_TYPE_FACEBOOK']:
      signupType = 'Facebook'
      break
    case CODES['SIGN_UP_TYPE_GOOGLE']:
      signupType = 'Google'
      break
    case CODES['SIGN_UP_TYPE_APPLE']:
      signupType = 'Apple'
      break
    default:
      signupType = ''
  }

  const linkUrl = type === constants['TABLE_USER_LISTING'] ? `/user-management/${user.user_id}/profile` : `/artist-management/${user.user_id}/profile`

  return (
    <tr>
      <td className="action">
        <div className="action-inner flex-content">
        <Link to={linkUrl}>
          <button type="button" className="btn btn-default view-user">
            <i className="fas fa-eye"></i>
          </button>
        </Link>
        <RowDropdownMenu
          userId={user.user_id}
          handleActionClick={handleActionClick}
          isEnabled={user.is_enabled}
          profileUrl={linkUrl}
          />
          </div>
      </td>
      <td>{user.user_id}</td>
      <td>
        {user.full_name
          ? user.full_name
          : user.first_name + ' ' + user.last_name}
      </td>
      <td>{user.email}</td>
      <td></td>
      <td>{user.country}</td>

      <td>{user.app_version}</td>
      <td>
        {user.device_type === 2 ? 'iOS' : 'Android'}{' '}
        <p className="span-text">{user.device_name}</p>
      </td>
      <td>{user.phone}</td>
      <td>{signupType}</td>
      <td>
        {date}
        <p className="span-text">{time}</p>
      </td>
      <td>{user.is_enabled === 1 ? 'Active' : 'Disabled'}</td>
    </tr>
  )
}
