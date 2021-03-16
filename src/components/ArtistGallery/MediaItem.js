import React from 'react'
import constants from '../../utils/constants'
import { FormattedMessage } from 'react-intl'
export default function MediaItem({
  mediaItem,
  index,
  handleToggle,
  handleActionClick,
  handleMediaItemClick,
}) {
  const {
    thumbnail_link: thumbnailUrl,
    media_link: mediaUrl,
    isChecked,
    is_approved: isApproved,
    media_id: mediaId,
    user_id: userId,
    format,
  } = mediaItem
  return (
    <li className="position-relative">
      <div className="media-item">
      <div className="dropdown">
        <button
          className="btn btn-primary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="fas fa-ellipsis-h"></i>
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {isApproved !== constants['STATUS_APPROVED_MEDIA'] ? (
            <span
              className="dropdown-item"
              onClick={(e) => {
                handleActionClick(
                  <FormattedMessage id="confirm.approve" />,
                  mediaId,
                  userId,
                  constants['ACTION_APPROVE_MEDIA'],
                )
              }}
            >
              <i className="fas fa-check"></i>
              <FormattedMessage id="approve" defaultMessage="Approve" />
            </span>
          ) : (
            ''
          )}

          <span
            className="dropdown-item"
            onClick={(e) => {
              handleActionClick(
                <FormattedMessage id="confirm.delete" />,
                mediaId,
                userId,
                constants['ACTION_DELETE_MEDIA'],
              )
            }}
          >
            <i className="fas fa-trash"></i>{' '}
            <FormattedMessage id="delete" defaultMessage="Delete" />
          </span>
          {isApproved !== constants['STATUS_REJECTED_MEDIA'] ? (
            <span
              className="dropdown-item"
              onClick={(e) => {
                handleActionClick(
                  <FormattedMessage id="confirm.reject" />,
                  mediaId,
                  userId,
                  constants['ACTION_REJECT_MEDIA'],
                )
              }}
            >
              <i className="fas fa-times"></i>
              <FormattedMessage id="reject" defaultMessage="Reject" />
            </span>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="selector-image text-center">
        {format === constants['MEDIA_FORMAT_VIDEO'] ? (
          <span className="cursor-pointer"
            onClick={() => {
              handleMediaItemClick(mediaUrl, format)
            }}
          >
            <i className="far fa-play-circle"></i>
          </span>
        ) : (
          ''
        )}
        <img
          data-toggle="modal"
          data-target="#Viewimage"
          src={thumbnailUrl}
          onClick={() => {
            handleMediaItemClick(mediaUrl, format)
          }}
        />
        {/* <button type="button" className="btn btn-default camera">
          <i className="fas fa-camera"></i>
        </button> */}
        <input
          className="mr-1"
          type="checkbox"
          data-id={index}
          checked={isChecked}
          onChange={handleToggle}
        />
        </div>
        </div>
    </li>
  )
}
