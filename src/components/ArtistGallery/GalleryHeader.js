import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import constants from '../../utils/constants'

export default function GalleryHeader({
  mediaCount,
  currentSection,
  handleMultipleActionClick,
  fileUploader,
  handleFileSelectClick,
  handleFileSelect,
  artistId
}) {
  return (
    <div className="gallery-header">
      <div className="card-head flex-content-gallery">
        <Link to={`/artist-management/${artistId}/profile`}>
          <button type="button" className="btn btn-default back">
            <i className="fas fa-chevron-left"></i>
          </button>
        </Link>
        <h6>
          <FormattedMessage id="gallery" defaultMessage="Gallery" /> (
          {mediaCount})
        </h6>
        <div className="ml-auto">
          <button
            type="button"
            className="btn btn-default white-button"
            onClick={handleFileSelectClick}
          >
            <i className="fas fa-plus"></i>{' '}
            <FormattedMessage id="add.media" defaultMessage="Add media" />
          </button>
          <input
            type="file"
            style={{ display: 'none' }}
            accept=".jpeg, .jpg, .png, .mp4, .mov, .avi, .mpeg, .flv, .heic,"
            multiple={true}
            ref={fileUploader}
            onChange={handleFileSelect}
          />
          {/* <button type="button" className="btn btn-default theme-button">
          <FormattedMessage id="save" defaultMessage="Save" />
        </button> */}
          <button
            type="button"
            className="btn btn-default grey-button"
            onClick={() => {
              handleMultipleActionClick(
                <FormattedMessage id="confirm.delete.selected" />,
                constants['ACTION_DELETE_MEDIA'],
              )
            }}
          >
            <i className="fas fa-trash"></i>{' '}
            <FormattedMessage id="delete" defaultMessage="Delete" />
          </button>
          <button
            type="button"
            className="btn btn-default theme-button"
            disabled={currentSection === constants['APPROVED_MEDIA_SECTION']}
            onClick={() => {
              handleMultipleActionClick(
                <FormattedMessage id="confirm.approve.selected" />,
                constants['ACTION_APPROVE_MEDIA'],
              )
            }}
          >
            <FormattedMessage id="approve" defaultMessage="Approve" />
          </button>
          <button
            type="button"
            className="btn btn-default grey-button"
            disabled={currentSection === constants['REJECTED_MEDIA_SECTION']}
            onClick={() => {
              handleMultipleActionClick(
                <FormattedMessage id="confirm.reject.selected" />,
                constants['ACTION_REJECT_MEDIA'],
              )
            }}
          >
            <FormattedMessage id="reject" defaultMessage="Reject" />
          </button>
        </div>
      </div>
    </div>
  )
}
