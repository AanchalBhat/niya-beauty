import React from 'react'
import { FormattedMessage } from 'react-intl'
import Pagination from '../../../common/Pagination'

export default function PromoCodesList({
  promoCodes,
  currentPage,
  limit,
  totalCount,
  setCurrentPage,
}) {
  return (
    <div id="promocodes">
      <div class="data-table">
        <table class="table table-striped ">
          <thead>
            <tr>
              <th>
                <FormattedMessage id="no." defaultMessage="No." />
              </th>
              <th>
                <FormattedMessage id="promoCode" defaultMessage="Promo Code" />
              </th>
              <th>
                <FormattedMessage id="title" defaultMessage="Title" />
              </th>
              <th>
                <FormattedMessage id="des" defaultMessage="Description" />
              </th>
              <th>
                <FormattedMessage id="status" defaultMessage="Status" />
              </th>
              <th>
                <FormattedMessage
                  id="promoCodeUsageCount"
                  defaultMessage="Promo Code Usage Count"
                />
              </th>
              <th>
                <FormattedMessage
                  id="profitEarned"
                  defaultMessage="Profit Earned"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {promoCodes.map((promoCode) => (
              <tr>
                <td>{promoCode.promo_id}</td>
                <td>{promoCode.promo_code}</td>
                <td>{promoCode.title}</td>
                <td>{promoCode.description}</td>
                {promoCode.is_enabled ? (
                  <td style={{ color: '#278903' }}>
                    <FormattedMessage id="active" defaultMessage="Active" />
                  </td>
                ) : (
                  <td style={{ color: '#ea2121' }}>
                    <FormattedMessage id="expired" defaultMessage="Expired" />
                  </td>
                )}
                <td>{promoCode.usage_count}</td>
                <td>
                  {promoCode.profit}{' '}
                  <FormattedMessage id="usd" defaultMessage="USD" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        limit={limit}
        totalCount={totalCount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}
