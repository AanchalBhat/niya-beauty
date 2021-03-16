import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import constants from '../../utils/constants'
import Breadcrumbs from '../common/Breadcrumbs'

export default function AMHeader({ handleActionClick, isFeatured, isEnabled }) {
  const breadcrumbsText = (
    <FormattedMessage
      id="breadcrumbs.am.ap"
      values={{
        b: (text) => <b>{text}</b>,
      }}
    />
  )

  const blockButtonText = isEnabled ? (
    <>
      <i className="fas fa-ban"></i>{' '}
      <FormattedMessage id="blockUser" defaultMessage="Block User" />
    </>
  ) : (
    <FormattedMessage id="unblockUser" />
  )

  const FormattedMessageIDForBlockButton = isEnabled
    ? 'confirm.user.block'
    : 'confirm.user.unblock'

  return (
    <div className="head-bar flex-content">
      <Link to="/artist-management">
        <button type="button" className="btn btn-default back">
          <i className="fas fa-chevron-left"></i>
        </button>
      </Link>
      <Breadcrumbs text={breadcrumbsText} />

      <div className="header-buttons ml-auto">
        {isFeatured ? (
          <button type="button" className="btn btn-default white-button">
            <FormattedMessage id="featured" defaultMessage="Featured" />
          </button>
        ) : (
          ''
        )}

        <button type="button" className="btn btn-default white-button ml-2">
          <FormattedMessage
            id="sendPushNotification"
            defaultMessage="Send Push Notification"
          />
        </button>
        <button
          type="button"
          className="btn btn-default white-button ml-2"
          onClick={() => {
            handleActionClick(
              constants['UPDATE_ARTIST'],
              <FormattedMessage id="confirm.update" />,
            )
          }}
        >
          <FormattedMessage id="save" defaultMessage="Save" />
        </button>

        <button
          type="button"
          className="btn btn-default theme-button ml-2"
          onClick={() => {
            handleActionClick(constants['ENABLE_DISABLE_USER'],(
                <FormattedMessage
                  id={FormattedMessageIDForBlockButton}
                  defaultMessage="Are you sure you want to perform this action?"
                />
              ))
              
          }}
        >
          {blockButtonText}
        </button>
      </div>
    </div>
  )
}
