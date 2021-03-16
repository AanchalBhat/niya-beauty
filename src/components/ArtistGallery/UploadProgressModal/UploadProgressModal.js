import React from 'react'
import { Modal } from 'react-bootstrap'

export default function UploadProgressModal({
  show,
  handleClose,
  total,
  current,
  progress,
  handleCancel,
}) {
  return (
    <>
      <Modal
        size="md"
        show={show}
        onHide={handleCancel}
        aria-labelledby="example-modal-sizes-title-lg"
        id="corfirmation-modal"
      >
        <Modal.Header style={{ justifyContent: 'center' }} closeButton>
          <h5 style={{ fontWeight: ' 600' }} className="modal-title">
            Uploading
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="files-count text-center">
            <p>
              {current}/{total}
            </p>
          </div>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn-default white-button"
            data-dismiss="modal"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
