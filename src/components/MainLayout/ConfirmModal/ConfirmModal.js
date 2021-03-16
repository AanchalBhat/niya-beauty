import React, { useContext } from 'react'
import { AccessTokenContext } from '../../../context/AccessTokenProvider'
import { Modal } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { removeAccessTokenCookie } from '../../../utils/auth'
import './ConfirmModal.css'
import { FormattedMessage } from 'react-intl'
export default function ConfirmModal({ show, setModalShow, modalMessage }) {
  const history = useHistory()
  const { setAccessToken } = useContext(AccessTokenContext)
  function handleClose() {
    setModalShow(false)
  }

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
          {modalMessage || 'Are you sure you want to logout?'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="card-details-form">
          <div className="form-group mt-2 text-center">
            <button
              type="button"
              className="btn btn-default theme-button mr-3"
              onClick={() => {
                removeAccessTokenCookie()
                setAccessToken(null)
                // history.push('/temp')
                // history.goBack()
                handleClose()
              }}
            >
              <FormattedMessage id="yes" defaultMessage="Yes"/>
            </button>
            <button
              type="button"
              className="btn btn-default white-button"
              data-dismiss="modal"
              onClick={handleClose}
            >
              <FormattedMessage id="no" defaultMessage="No"/>
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
