import React from 'react'
import { Modal } from 'react-bootstrap'
import constants from '../../../utils/constants'
import './ImagePreviewModal.css'

export default function ImagePreviewModal({
  show,
  handleClose,
  previewUrl,
  mediaFormat,
}) {
  return (
    <>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        aria-labelledby="example-modal-sizes-title-lg"
        id="media-preview"
      >
        <Modal.Header style={{ justifyContent: 'center' }} closeButton>
         
        </Modal.Header>
        <Modal.Body>
          <div class="preview-div">
            {mediaFormat === constants['MEDIA_FORMAT_IMAGE'] ? (
              <img src={previewUrl} />
            ) : (
              ''
            )}
            {mediaFormat === constants['MEDIA_FORMAT_VIDEO'] ? (
              <video controls={true}>
                <source src={previewUrl}/>
              </video>
            ) : (
              ''
            )}
          </div>
        </Modal.Body>
      </Modal>
     
    </>
  )
}
