import React, { useContext } from 'react'
import { FormattedMessage } from 'react-intl'
import { changeArtistVerificationStatusAPI } from '../../api/api'
import constants from '../../utils/constants'
import codes from '../../utils/constants'

export default function RowDropDownMenu(props) {
  const { userId, handleActionClick, requestType } = props

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
        <span
          className="dropdown-item cursor-pointer"
          onClick={() => {
            handleActionClick(
              userId,
              codes['APPROVE_ARTIST'],
              <FormattedMessage
                id="confirm.approve"
                defaultMessage="Are you sure you want to approve?"
              />,
            )
          }}
        >
          <i className="fas fa-check"></i>{' '}
          <FormattedMessage id="approve" defaultMessage="Approve" />
        </span>
        {!(requestType === constants['ARTIST_REQUEST_TYPE_DISAPPROVED']) ? (
          <span
            className="dropdown-item cursor-pointer"
            onClick={() => {
              handleActionClick(userId, codes['DISAPPROVE_ARTIST'])
            }}
          >
            <i className="fas fa-times"></i>{' '}
            <FormattedMessage id="disapprove" defaultMessage="Disapprove" />
          </span>
        ) : (
          ''
        )}

        {!(requestType === constants['ARTIST_REQUEST_TYPE_REJECTED']) ? (
          <span
            className="dropdown-item cursor-pointer"
            onClick={() => {
              handleActionClick(
                userId,
                codes['REJECT_ARTIST'],
                <FormattedMessage
                  id="confirm.reject"
                  defaultMessage="Are you sure you want to reject?"
                />,
              )
            }}
          >
            <i className="fas fa-times"></i>{' '}
            <FormattedMessage id="reject" defaultMessage="Reject" />
          </span>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
