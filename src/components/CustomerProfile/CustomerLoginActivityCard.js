import moment from 'moment'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import constants from '../../utils/constants'

export default function CustomerLoginActivityCard({ data }) {

  return (
    <div className="card-style data-table beauty-data mt-3">
      <div className="table-head flex-content">
        <h6>
          <FormattedMessage
            id="loginActivity"
            defaultMessage="Login Activity"
          />
        </h6>
      </div>

      <div className="scroll-table">
        <table className="table table-striped ">
          <thead>
            <tr>
              <th className="first-row">
                <FormattedMessage id="no." defaultMessage="No." />
              </th>
              <th>
                <FormattedMessage id="date" defaultMessage="Date" />
              </th>
              <th>
                <FormattedMessage id="time" defaultMessage="Time" />
              </th>
              <th>
                <FormattedMessage
                  id="deviceDetails"
                  defaultMessage="Device Details"
                />
              </th>
              <th>
                <FormattedMessage id="location" defaultMessage="Location" />
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((ele) => (
                  <tr>
                    <td className="first-row">{ele.activity_id}</td>
                    <td>{moment(ele.date).format('MMMM Do YYYY')}</td>
                    <td>{moment(ele.created_on).format('h:mm A')}</td>
                    <td>
                      {ele.device_type === constants['DEVICE_TYPE_ANDROID'] ? (
                        <FormattedMessage id="android" />
                      ) : (
                        <FormattedMessage id="iOS" />
                      )}
                      , {ele.device_name}
                    </td>
                  <td>{ele.location}</td>
                  </tr>
                ))
              : ''}
          </tbody>
        </table>
      </div>
    </div>
  )
}
