import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import constants from '../../../utils/constants'

export default function ARProfileHeader({ isVerified, handleActionClick }) {
  return (
    <div className="head-bar flex-content">
      <Link to="/artist-requests">
        <button type="button" className="btn btn-default back">
          <i className="fas fa-chevron-left"></i>
        </button>
      </Link>
      <div className="breadcrumb">
        <p>
          <FormattedMessage
            id="breadcrumbs.ar.ap"
            values={{
              b: (text) => <b>{text}</b>,
            }}
          />
        </p>
      </div>

      <div className="header-buttons ml-auto">
        <button
          type="button"
          className="btn btn-default white-button"
          onClick={() => {
            handleActionClick(
              constants['UPDATE_ARTIST'],
              <FormattedMessage id="confirm.update" defaultMessage="Are you sure you want to update?"/>,
            )
          }}
        >
          <FormattedMessage id="save" defaultMessage="Save" />
        </button>
        <button
          type="button"
          className={`btn btn-default ml-2 ${
            isVerified === constants ? 'grey-button' : 'theme-button'
          }`}
          disabled={isVerified === constants['APPROVE_ARTIST'] ? true : false}
          onClick={() => {
            handleActionClick(
              constants['APPROVE_ARTIST'],
              <FormattedMessage id="confirm.approve" defaultMessage="Are you sure you want to approve?"/>,
            )
          }}
        >
          {isVerified === constants['APPROVE_ARTIST'] ? (
            <FormattedMessage id="approved" defaultMessage="Approved" />
          ) : (
            <FormattedMessage id="approve" defaultMessage="Approve" />
          )}
        </button>
        <button
          type="button"
          className={`btn btn-default ml-2 ${
            isVerified === constants['DISAPPROVE_ARTIST'] ? 'grey-button' : 'theme-button'
          }`}
          disabled={isVerified === constants['DISAPPROVE_ARTIST'] ? true : false}
          onClick={() => {
            handleActionClick(constants['DISAPPROVE_ARTIST'], '')
          }}
        >
          {isVerified === constants['DISAPPROVE_ARTIST'] ? (
            <FormattedMessage id="disapproved" defaultMessage="Disapproved" />
          ) : (
            <FormattedMessage id="disapprove" defaultMessage="Disapprove" />
          )}
        </button>
        <button
          type="button"
          className={`btn btn-default ml-2 ${
            isVerified === constants['REJECT_ARTIST'] ? 'grey-button' : 'theme-button'
          }`}
          disabled={isVerified === constants['REJECT_ARTIST'] ? true : false}
          onClick={() => {
            handleActionClick(
              constants['REJECT_ARTIST'],
            )
          }}
        >
          {isVerified === constants['REJECT_ARTIST'] ? (
            <FormattedMessage id="rejected" defaultMessage="Rejected" />
          ) : (
            <FormattedMessage id="reject" defaultMessage="Reject" />
          )}
        </button>
      </div>
    </div>
  )
}
