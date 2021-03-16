import React from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import Loader from 'react-loader-spinner'

export default function EarningsHistory(props) {
  const { earningsHistory, availableServices, handleScroll, isLoading } = props

  return (
    <div className="card-color">
      <h6 style={{ fontWeight: '600' }}>
        <FormattedMessage
          id="earningsHistory"
          defaultMessage="Earnings History"
        />
      </h6>
      <div className="scroll-table" onScroll={handleScroll}>
        <table className="table table-striped ">
          <thead>
            <tr>
              <th>
                <FormattedMessage id="fullName" defaultMessage="Full Name" />
              </th>
              <th>
                <FormattedMessage
                  id="appointmentTime"
                  defaultMessage="Appointment Time"
                />
              </th>
              <th>
                <FormattedMessage id="date" defaultMessage="Date" />
              </th>
              <th>
                <FormattedMessage id="package" defaultMessage="Package" />
              </th>
              <th>
                <FormattedMessage id="services" defaultMessage="Services" />
              </th>
            </tr>
          </thead>
          <tbody>
            {earningsHistory.map((ele) => (
              <tr>
                <td>{ele.full_name}</td>
                <td>
                  {moment(ele.start_time_in_ms).format('h:mm A')} -{' '}
                  {moment(ele.end_time_in_ms).format('h:mm A')}
                </td>
                <td>{moment(ele.scheduled_on).format('Do MMMM YYYY')}</td>
                <td>
                  {ele.duration_in_min} <FormattedMessage id="minutes" /> - $
                  {ele.total_price}
                </td>
                <td>
                  <form>
                    <div className="form-group select mb-0 ml-2 position-relative">
                      <i className="fas fa-angle-down"></i>
                      <select className="form-control pt-0 pb-0" id="">
                        {/* <FormattedMessage id="services">
                          {(text) => (
                            <option value="" selected disabled>
                              {text}
                            </option>
                          )}
                        </FormattedMessage> */}
                        {ele.services
                          ? ele.services
                              .split(',')
                              .map((serviceId) => (
                                <option>
                                  {availableServices[serviceId].service_name}
                                </option>
                              ))
                          : ''}
                      </select>
                    </div>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <Loader type="TailSpin" color="#975E4A" height={40} width={40} />
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
