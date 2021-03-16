import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import constants from '../../utils/constants'

export default function CancelAppointmentModal({
  modalShow,
  performAction,
  handleClose,
  cancelOptions,
}) {
  const [reasonID, setReasonID] = useState('')
  const [cancellationReason, setCancellationReason] = useState('')
  const [customCancellationReason, setCustomCancellationReason] = useState('')
  const [showErrorMessage, setShowErrorMessage] = useState(false)

  function handleReasonTypeChange(e) {
    const { target } = e
    const { value } = target
    const text = target.selectedOptions[0].getAttribute('data-text')
    console.log(value)
    console.log(constants['REASON_TYPE_OTHER'])
    setReasonID(parseInt(value))
    setCancellationReason(text)
  }

  function handleCancelClick() {
    let cancelReason = cancellationReason
    if (reasonID === constants['REASON_TYPE_OTHER']) {
      cancelReason = customCancellationReason
    }
    if (!cancelReason) {
      setShowErrorMessage(true)
    } else {
      performAction(cancellationReason, reasonID)
      hideModal()
    }
  }

  function hideModal() {
    handleClose()
    setCancellationReason('')
    setCustomCancellationReason('')
  }

  return (
    <React.Fragment>
      <Modal
        size="lg"
        show={modalShow}
        onHide={hideModal}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <FormattedMessage id="reason" defaultMessage="Reason" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group select position-relative">
              <label
                style={{
                  fontSize: '0.9rem',
                }}
              >
                <FormattedMessage id="reason" defaultMessage="Reason" />
              </label>
              <i className="fas fa-angle-down" style={{ top: '40px' }}></i>
              <select
                className="form-control"
                name="country"
                onChange={handleReasonTypeChange}
              >
                <FormattedMessage id="select" defaultMessage="Select">
                  {(text) => (
                    <option selected value="">
                      {text}
                    </option>
                  )}
                </FormattedMessage>
                {cancelOptions.map((cancelOption) => (
                  <option
                    value={cancelOption.opton_id}
                    data-text={cancelOption.option_text}
                    key={cancelOption.option_id}
                  >
                    {cancelOption.option_text}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label
                style={{
                  fontSize: '0.9rem',
                }}
              >
                <FormattedMessage
                  id="typeReason"
                  defaultMessage="Type Your Reason"
                />
              </label>

              <textarea
                className="form-control"
                value={customCancellationReason}
                onChange={(e) => {
                  setCustomCancellationReason(e.target.value)
                  setShowErrorMessage(false)
                }}
                disabled={reasonID !== constants['REASON_TYPE_OTHER']}
              ></textarea>
              {showErrorMessage ? (
                <span className="error-msg">
                  Reason is mandatory. Please provide reason for cancelling.
                </span>
              ) : (
                ''
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ justifyContent: 'center' }}>
            <button
              type="button"
              className="btn btn-default theme-button"
              onClick={handleCancelClick}
            >
              <FormattedMessage
                id="cancelAppointment"
                defaultMessage="Cancel Appointment"
              />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}
