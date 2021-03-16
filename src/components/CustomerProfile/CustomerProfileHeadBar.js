import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import constants from '../../utils/constants'

export default function CustomerProfileHeadBar({
  isEnabled,
  handleActionClick,
}) {
  function handleStatusChangeClick() {
    if (isEnabled) {
      handleActionClick(
        constants['DISABLE_USER'],
        <FormattedMessage
          id="confirm.user.block"
          defaultMessage="Are you sure you want to block?"
        />,
      )
    } else {
      handleActionClick(
        constants['ENABLE_USER'],
        <FormattedMessage
          id="confirm.user.unblock"
          defaultMessage="Are you sure you want to unblock?"
        />,
      )
    }
  }

  function handleSaveClick() {
    handleActionClick(
      constants['UPDATE_USER'],
      <FormattedMessage
        id="confirm.update"
        defaultMessage="Are you sure you want to update?"
      />,
    )
  }

  const blockButtonText = isEnabled ? (
    <>
      <i class="fas fa-ban"></i>{' '}
      <FormattedMessage id="blockUser" defaultMessage="Block User" />
    </>
  ) : (
    <FormattedMessage id="unblockUser" />
  )

  return (
    <div className="head-bar flex-content">
      <Link to="/user-management">
        <button type="button" className="btn btn-default back">
          <i className="fas fa-chevron-left"></i>
        </button>
      </Link>
      <div className="breadcrumb">
        <p>
          <FormattedMessage
            id="breadcrumbs.userProfile"
            values={{ b: (text) => <b>{text}</b> }}
            defaultMessage={`User Management > User Profile`}
          />
        </p>
      </div>

      <div className="header-buttons ml-auto">
        <button type="button" className="btn btn-default white-button">
          <FormattedMessage
            id="sendPushNotification"
            defaultMessage="Send Push Notification"
          />
        </button>
        <button
          type="button"
          className="btn btn-default white-button ml-1"
          onClick={handleSaveClick}
        >
          <FormattedMessage id="save" defaultMessage="Save" />
        </button>
        <button
          type="button"
          className="btn btn-default theme-button ml-1"
          onClick={handleStatusChangeClick}
        >
          {blockButtonText}
        </button>
      </div>
    </div>
  )
}
