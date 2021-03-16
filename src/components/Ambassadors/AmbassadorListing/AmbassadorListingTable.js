import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import constants from '../../../utils/constants'
import moment from 'moment'

export default function AmbassadorListingTable({
  ambassadors,
  sortField,
  sortOrder,
  handleSortChange,
}) {
  return (
    <div className="data-table">
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="no." defaultMessage="No." />
            </th>
            <th
              onClick={() => {
                handleSortChange('name')
              }}
            >
              <FormattedMessage id="name" defaultMessage="Name" />
              {'  '}
              {sortField === 'name' ? (
                <i
                  className={`fas fa-angle-${
                    sortOrder === constants['SORT_ORDER_ASC'] ? 'up' : 'down'
                  }`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th
              onClick={() => {
                handleSortChange('ambassador_id')
              }}
            >
              <FormattedMessage
                id="ambassadorID"
                defaultMessage="Ambassador ID"
              />
              {'  '}
              {sortField === 'ambassador_id' ? (
                <i
                  className={`fas fa-angle-${
                    sortOrder === constants['SORT_ORDER_ASC'] ? 'up' : 'down'
                  }`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th
              onClick={() => {
                handleSortChange('email')
              }}
            >
              <FormattedMessage id="email" defaultMessage="Email" />
              {'  '}
              {sortField === 'email' ? (
                <i
                  className={`fas fa-angle-${
                    sortOrder === constants['SORT_ORDER_ASC'] ? 'up' : 'down'
                  }`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th
              onClick={() => {
                handleSortChange('phone')
              }}
            >
              <FormattedMessage id="phoneNo" defaultMessage="Phone No." />{' '}
              {'  '}
              {sortField === 'phone' ? (
                <i
                  className={`fas fa-angle-${
                    sortOrder === constants['SORT_ORDER_ASC'] ? 'up' : 'down'
                  }`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th
              onClick={() => {
                handleSortChange('created_on')
              }}
            >
              <FormattedMessage
                id="dateCreated"
                defaultMessage=" Date Created"
              />
              {'  '}
              {sortField === 'created_on' ? (
                <i
                  className={`fas fa-angle-${
                    sortOrder === constants['SORT_ORDER_ASC'] ? 'up' : 'down'
                  }`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th
              onClick={() => {
                handleSortChange('expiry_on')
              }}
            >
              <FormattedMessage id="expiryDate" defaultMessage="Expiry Date" />
              {'  '}
              {sortField === 'expiry_on' ? (
                <i
                  className={`fas fa-angle-${
                    sortOrder === constants['SORT_ORDER_ASC'] ? 'up' : 'down'
                  }`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th
              onClick={() => {
                handleSortChange('total_profit')
              }}
            >
              <FormattedMessage
                id="totalProfitEarned"
                defaultMessage="Total Profit Earned"
              />
              {'  '}
              {sortField === 'total_profit' ? (
                <i
                  className={`fas fa-angle-${
                    sortOrder === constants['SORT_ORDER_ASC'] ? 'up' : 'down'
                  }`}
                ></i>
              ) : (
                ''
              )}
            </th>
            <th>
              <FormattedMessage
                id="promoCodesLinkedWithAmbassador"
                defaultMessage="Promo Codes Linked with Ambassador"
              />{' '}
            </th>
          </tr>
        </thead>
        <tbody>
          {ambassadors.map((ambassador, index) => (
            <tr key={ambassador.ambassador_id}>
              <td>{index + 1}</td>
              <td>
               
                  <span style={{ fontWeight: '600', color: '#000' }}>
                    {ambassador.name}
                  </span>
               
              </td>
              <td>{ambassador.ambassador_id}</td>
              <td>{ambassador.email} </td>
              <td>{`+${ambassador.country_code} ${ambassador.phone}`}</td>
              <td>
                {moment(ambassador.created_on).format('Do MMMM YYYY')}{' '}
                <p className="span-text">
                  {moment(ambassador.created_on).format('h:mm A')}{' '}
                </p>
              </td>
              <td>
                {moment(ambassador.expiry_on).format('Do MMMM YYYY')}{' '}
                <p className="span-text">
                  {' '}
                  {moment(ambassador.expiry_on).format('h:mm A')}{' '}
                </p>
              </td>
              <td>${ambassador.total_profit}</td>
              <td>
                {ambassador.promo_count > 1 ? (
                  <Link
                    to={`/ambassadors/${ambassador.ambassador_id}/promo-codes`}
                  >
                    <FormattedMessage id="view" defaultMessage="View" />
                  </Link>
                ) : ambassador.promo_count === 0 ? (
                  'No Promo Code'
                ) : (
                  <Link
                    to={`/ambassadors/${ambassador.ambassador_id}/promo-codes`}
                  >
                    {ambassador.promo_code}
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
