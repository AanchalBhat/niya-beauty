import React from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import Pagination from '../../../common/Pagination'

export default function PromoBasicDetails({
  promoIDs,
  selectedPromoCode,
  handleSelectedPromoCodeChange,
  promoUsageDetails,
  promoUsageTotalCodesUsed,
  promoUsageCurrentPage,
  promoUsageLimit,
  promoUsageTotalResults,
  setPromoUsageCurrentPage,
}) {
  console.log(promoUsageTotalResults)
  let promoCodeOptions = []
  if (promoIDs && promoIDs.length) {
    promoCodeOptions = promoIDs.map((promoCode) => (
      <option value={promoCode.promo_id}>{promoCode.promo_code}</option>
    ))
  }
  return (
    <div id="basicdetails">
      <div class="data-table">
        {promoUsageTotalCodesUsed ? (
          <p class="mb-3" style={{ color: '#975E4A', fontWeight: 600 }}>
            <FormattedMessage
              id="totalPromoCodeUsed"
              defaultMessage="Total Promo Code Used"
            />
            : {promoUsageTotalCodesUsed}
          </p>
        ) : (
          ''
        )}
        <form class="codes">
          <div class="form-group">
            <div class="form-group select position-relative mb-3">
              <label>
                <FormattedMessage id="promoCode" defaultMessage="Promo Code" />
              </label>
              <i class="fas fa-angle-down"></i>
              <select
                class="form-control"
                value={selectedPromoCode}
                onChange={handleSelectedPromoCodeChange}
              >
                {promoIDs.length ? (
                  promoCodeOptions
                ) : (
                  <FormattedMessage id="noPromoCodes">
                    {(text) => <option value="">{text}</option>}
                  </FormattedMessage>
                )}
              </select>
            </div>
          </div>
        </form>
        <table class="table table-striped ">
          <thead>
            <tr>
              <th>
                <FormattedMessage id="no." defaultMessage="No." />
              </th>
              <th>
                <FormattedMessage id="usedBy" defaultMessage="Used By" />
              </th>
              <th>
                <FormattedMessage id="userID" defaultMessage="User ID" />
              </th>
              <th>
                <FormattedMessage id="email" defaultMessage="Email" />
              </th>
              <th>
                <FormattedMessage id="usedOn" defaultMessage="Used On" />
              </th>
              <th>
                <FormattedMessage
                  id="ambassadorProfitInPercent"
                  defaultMessage="Ambassador Profit (In %)"
                />
              </th>
              <th>
                {' '}
                <FormattedMessage
                  id="profitEarned"
                  defaultMessage="Profit Earned"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {promoUsageDetails.map((ele) => (
              <tr>
                <td>{ele.promo_id}</td>
                <td>{ele.full_name}</td>
                <td>{ele.user_id}</td>
                <td>{ele.email}</td>
                <td>
                  {moment(ele.created_on).format('Do MMMM, YYYY')}
                  <p class="span-text">
                    {moment(ele.created_on).format('h:mm A')}
                  </p>
                </td>
                <td>{ele.ambassador_share_percentage}</td>
                <td>
                  {ele.ambassador_share} <FormattedMessage id="usd" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={promoUsageCurrentPage}
        limit={promoUsageLimit}
        totalCount={promoUsageTotalResults}
        setCurrentPage={setPromoUsageCurrentPage}
      />
    </div>
  )
}
