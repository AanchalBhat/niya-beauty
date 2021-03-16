import moment from 'moment'
import React from 'react'
import { FormattedMessage } from 'react-intl'
import constants from '../../../utils/constants'

export default function PromoTable(props) {
  const { promoCodes } = props
  return (
    <div className="data-table">
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>
              <FormattedMessage id="no." defaultMessage="No" />
            </th>
            <th>
              <FormattedMessage id="promoCode" defaultMessage="Promo Code" />{' '}
              <i className="fas fa-angle-down"></i>
            </th>
            <th>
              <FormattedMessage id="promoTitle" defaultMessage="Promo Title" />{' '}
              <i className="fas fa-angle-down"></i>
            </th>
            <th className="width-set">
              <FormattedMessage
                id="promoDescription"
                defaultMessage="Promo Description"
              />{' '}
              <i className="fas fa-angle-down"></i>
            </th>
            <th>
              <FormattedMessage
                id="dateCreated"
                defaultMessage="Date Created"
              />{' '}
              <i className="fas fa-angle-down"></i>
            </th>
            <th>
              <FormattedMessage id="expiryDate" defaultMessage="Expiry Date" />{' '}
              <i className="fas fa-angle-down"></i>
            </th>

            <th>
              <FormattedMessage
                id="promoUsageLimit"
                defaultMessage="Promo Usage Limit"
              />{' '}
              <i className="fas fa-angle-down"></i>
            </th>
            <th>
              <FormattedMessage
                id="perUserLimit"
                defaultMessage="Per User Limit"
              />{' '}
              <i className="fas fa-angle-down"></i>
            </th>
            <th>
              <FormattedMessage id="promoType" defaultMessage="Promo Type" />{' '}
              <i className="fas fa-angle-down"></i>
            </th>

            <th className="width-set">
              <FormattedMessage
                id="ambDetailsLinked"
                defaultMessage="Ambassador Details If Promo Code Linked"
              />
            </th>
            <th>
              <FormattedMessage id="status" defaultMessage="Status" />
            </th>
            <th>
              <FormattedMessage id="action" defaultMessage="Action" />
            </th>
          </tr>
        </thead>
        <tbody>
                  {promoCodes.map((promoCode) => {
              
            let promoType = 'normal'
            if (promoCode.promo_type === constants['PROMO_TYPE_AMBASSADOR'])
              promoType = 'ambassador'
            else if (promoCode.promo_type === constants['PROMO_TYPE_GIFT'])
              promoType = 'gift'

                      let promoStatus = 'activated'    
            if(promoCode.is_enabled === constants)          

            return (
              <tr>
                <td>{promoCode.promo_id}</td>
                <td>
                  <a style={{ color: '#000', fontWeight: '600' }} href="#">
                    {promoCode.promo_code}
                  </a>
                </td>
                <td>{promoCode.title}</td>
                <td>{promoCode.description}</td>
                <td>
                  {moment(promoCode.created_on).format('Do MMMM YYYY')}
                  <p className="span-text">
                    {' '}
                    {moment(promoCode.created_on).format('h:mm A')}
                  </p>
                </td>
                <td>
                  {moment(promoCode.expiry).format('Do MMMM YYYY')}{' '}
                  <p className="span-text">
                    {' '}
                    {moment(promoCode.expiry).format('h:mm A')}
                  </p>
                </td>
                <td>{promoCode.total_usage_limit}</td>
                <td>{promoCode.per_user_limit}</td>
                <td>
                  <FormattedMessage id={promoType} />
                </td>
                <td>
                  {promoCode.name ? (
                    promoCode.name
                  ) : (
                    <FormattedMessage id="notLinked" />
                  )}
                </td>
                <td style={{ color: '#B20A0A' }}>Deactivate</td>
                <td className="action">
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-ellipsis-h"></i>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-check"></i> Activate
                      </a>
                      <a className="dropdown-item" href="#">
                        <i className="fas fa-ban"></i> Deactivate
                      </a>
                    </div>
                  </div>
                </td>
              </tr>
            )
          })}

          <tr>
            <td>2</td>
            <td>
              <a style={{ color: '#000', fontWeight: '600' }} href="#">
                J8937FKC
              </a>
            </td>
            <td>John</td>
            <td>Lorem ipsum dolor sit amet, consect etuer adipiscing elit</td>
            <td>
              24th July, 2020 <p className="span-text">10:00 AM</p>
            </td>
            <td>
              24th July, 2020 <p className="span-text">10:00 AM</p>
            </td>
            <td>12</td>
            <td>10</td>
            <td>Normal</td>

            <td>
              <a href="#">John Deo</a>
            </td>
            <td style={{ color: '#069F12' }}>Activate</td>
            <td className="action">
              <div className="dropdown">
                <button
                  className="btn btn-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-check"></i> Activate
                  </a>
                  <a className="dropdown-item" href="#">
                    <i className="fas fa-ban"></i> Deactivate
                  </a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
