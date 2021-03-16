import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import constants from '../../../utils/constants'

export default function ListingDropdown({
  handleActionClick,
  isEnabled,
  userId,
  profileUrl,
}) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-angle-down"></i>
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link to={profileUrl} className="no-underline">
          <span className="dropdown-item cursor-pointer">
            <i className="fas fa-eye"></i>
            <FormattedMessage id="viewUser" defaultMessage="View User" />
          </span>
        </Link>
        {isEnabled ? (
          <span
            className="dropdown-item cursor-pointer"
            onClick={() => {
              handleActionClick(
                userId,
                constants['DISABLE_USER'],
                <FormattedMessage
                  id="confirm.disable"
                  defaultMessage="Are you sure you want to disable?"
                />,
              )
            }}
          >
            <i className="fas fa-ban"></i>{' '}
            <FormattedMessage id="disableUser" defaultMessage="Disable User" />
          </span>
        ) : (
          <span
            className="dropdown-item"
            onClick={() => {
              handleActionClick(
                userId,
                constants['ENABLE_USER'],
                <FormattedMessage
                  id="confirm.enable"
                  defaultMessage="Are you sure you want to enable?"
                />,
              )
            }}
          >
            <i className="fas fa-check-circle"></i>{' '}
            <FormattedMessage id="enableUser" defaultMessage="Enable User" />
          </span>
        )}
      </div>
    </div>
  )
}
