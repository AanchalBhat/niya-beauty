import React from 'react'
import { Modal } from 'react-bootstrap'
import { FormattedMessage } from 'react-intl'
import './AppointmentDetailsModal.css'
import moment from 'moment'

export default function AppointmentDetailsModal({
  modalShow,
  performAction,
  handleClose,
  bookingDetails,
}) {
  const {
    packageName,
    price,
    startTime,
    endTime,
    status,
    services,
  } = bookingDetails
  // let statusValue = 'pending'
  // statusValue = status

  return (
    <Modal
      size="lg"
      show={modalShow}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div class="row">
          <div class="col-md-6 border-right">
            <form>
              <h6 style={{ fontWeight: '600' }}>
                <FormattedMessage
                  id="packageDetails"
                  defaultMessage="Package Details"
                />
              </h6>
              <div class="form-group">
                <label>
                  <FormattedMessage
                    id="packageName"
                    defaultMessage="Package Name"
                  />
                </label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={packageName ? packageName : ''}
                />
              </div>
              <div class="form-group">
                <label>
                  <FormattedMessage id="price" defaultMessage="Price" />
                </label>
                <input
                  type="text"
                  class="form-control"
                  disabled
                  value={price !== undefined ? `$${price}` : ''}
                />
              </div>

              <div class="flex-content">
                <div class="form-group select position-relative">
                  <label>
                    {' '}
                    <FormattedMessage
                      id="timeStartFrom"
                      defaultMessage="Time Start From"
                    />
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={startTime ? moment(startTime).format('h:mm A') : ''}
                  />
                </div>
                <div class="form-group select position-relative ml-2">
                  <label>
                    {' '}
                    <FormattedMessage id="timeEnd" defaultMessage="Time End" />
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    disabled
                    value={startTime ? moment(endTime).format('h:mm A') : ''}
                  />
                </div>
              </div>

              <div class="form-group position-relative">
                <h6 style={{ fontWeight: '600' }} class="mt-3 mb-3">
                  <FormattedMessage
                    id="bookingStatus"
                    defaultMessage="Booking Status"
                  />
                </h6>
                <p>{<FormattedMessage id={status ? status : 'blank'} />}</p>
              </div>
            </form>
          </div>

          <div class="col-md-6">
            <h6 style={{ fontWeight: '600' }}>
              <FormattedMessage id="servicesInvolved" />
            </h6>

            <ul class="packages-modal">
              {services.map((service) => (
                <li class="d-flex">
                  <i class="fas fa-check-circle mr-2 mt-1"></i>
                  <p>
                    <b>{service.service_name}</b>
                    <br />
                    {service.service_description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div style={{ justifyContent: 'center' }}>
          <button
            type="button"
            className="btn btn-default theme-button"
            onClick={(e) => {}}
          >
            <FormattedMessage id="disapprove" />
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}
