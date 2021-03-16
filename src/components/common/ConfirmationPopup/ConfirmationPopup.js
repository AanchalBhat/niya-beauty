import React from 'react'
import { Modal } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import './ConfirmationPopup.css'
export default function ConfirmationPopup({
  modalShow,
  performAction,
  modalMessage,
  handleClose,
}) {
  return (
    <Modal
      size="md"
      show={modalShow}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
      id="corfirmation-modal"
    >
      <Modal.Header style={{ justifyContent: 'center' }} closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {modalMessage}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="card-details-form">
          <div className="form-group mt-2 text-center">
            <button
              type="button"
              className="btn btn-default theme-button mr-3"
              onClick={() => {
                performAction()
                handleClose()
              }}
            >
              <FormattedMessage id="yes" defaultMessage="Yes" />
            </button>
            <button
              type="button"
              className="btn btn-default white-button"
              data-dismiss="modal"
              onClick={handleClose}
            >
              <FormattedMessage id="no" defaultMessage="No" />
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
