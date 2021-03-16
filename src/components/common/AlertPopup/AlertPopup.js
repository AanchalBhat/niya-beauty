import React from 'react'
import { Modal } from 'react-bootstrap'
import './AlertPopup.css'

export default function AlertPopup({show, handleClose, message}) {
  return (
    <Modal
      size="md"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
      id="corfirmation-modal"
    >
      <Modal.Header style={{ justifyContent: 'center' }} closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          {message}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="card-details-form">
          <div className="form-group mt-2 text-center">
            <button
              type="button"
              className="btn btn-default theme-button mr-3"
              onClick={handleClose}
            >
              Ok
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
