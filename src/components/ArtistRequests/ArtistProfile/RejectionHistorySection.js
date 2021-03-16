import React from 'react'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'

export default function RejectionHistorySection({ reasons }) {
  return (
    <div className="card-style education-sec reason-history-data mt-3">
      <div className="table-head ">
        <h6>
          <FormattedMessage id="reasonHistory" />
        </h6>
      </div>
      <ul className="p-2">
        {reasons.map((ele, index) => (
          <li className="flex-content mt-3">
            <h3>
              {(index + 1).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false,
              })}
            </h3>
            <div className="reason-content p-3">
              <label>
                <FormattedMessage id="dateTime" defaultMessage="Date/Time" />
              </label>
              <p>{moment(ele.date).format('Do MMMM, YYYY, h:mm A')}</p>
              <div className="reason-description mt-3">
                <label>
                  <FormattedMessage id="reason" defaultMessage="Reason" />
                </label>
                <p>{ele.reason}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
