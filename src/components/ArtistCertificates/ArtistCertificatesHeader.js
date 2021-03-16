import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

export default function ArtistCertificatesHeader({
  fileSelector,
  handleFileSelect,
  handleFileSelectClick,
  numChecked,
  handleConfirmModalShow,
  artistId
}) {
  function handleDeleteClick() {
    const message = <FormattedMessage id="confirm.delete.certificate" />
    handleConfirmModalShow(message)
  }
  return (
    <div class="card-head flex-content">
       <Link to={`/artist-management/${artistId}/profile`}>
          <button type="button" className="btn btn-default back">
            <i className="fas fa-chevron-left"></i>
          </button>
        </Link>
      <h6>
        <FormattedMessage id="certificates" defaultMessage="Certificates" />
      </h6>
      <div class="right-action-buttons flex-content ml-auto">
        <button
          type="button"
          class="btn btn-default white-button mr-2"
          onClick={handleFileSelectClick}
        >
          <i class="fas fa-plus"></i>{' '}
          <FormattedMessage id="add" defaultMessage="Add" />
        </button>
        <input
          type="file"
          style={{ display: 'none' }}
          accept=".jpeg, .jpg, .png"
          multiple={true}
          ref={fileSelector}
          onChange={handleFileSelect}
        />

        <button
          type="button"
          class="btn btn-default grey-button"
          disabled={!numChecked}
          onClick={handleDeleteClick}
        >
          <i class="far fa-trash-alt"></i>{' '}
          <FormattedMessage id="delete" defaultMessage="Delete" />
        </button>
      </div>
    </div>
  )
}
