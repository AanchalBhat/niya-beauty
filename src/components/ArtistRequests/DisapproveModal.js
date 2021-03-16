import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { changeArtistVerificationStatusAPI } from '../../api/api'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { FormattedMessage } from 'react-intl'

export default function DisapproveModal({
  modalShow,
  performAction,
  modalMessage,
  handleClose,
  buttonText
}) {
  const [rejectionReason, setRejectionReason] = useState('')


  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={modalShow}
        onHide={() => {
          setRejectionReason('')
          handleClose()
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <FormattedMessage id="reason" defaultMessage="Reason" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label style={{ fontSize: '1rem' }}>
                <FormattedMessage id="typeReason" defaultMessage="Type Your Reason" />
                {/* <FormattedMessage id="optional" defaultMessage=" (Optional)"/> */}
              </label>
              <textarea
                className="form-control"
                value={rejectionReason}
                onChange={(e) => {
                  setRejectionReason(e.target.value)
                }}
              ></textarea>
              
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ justifyContent: 'center' }}>
            <button
              type="button"
              className="btn btn-default theme-button"
              onClick={(e) => {
                e.preventDefault()
                performAction(rejectionReason)
              }}
              disabled={ !(rejectionReason.trim()) ? true : false}
            >
              <FormattedMessage id={buttonText}/>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}

