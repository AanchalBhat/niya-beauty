import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import MonthCodes from '../../../utils/MonthCodes'
import EarningsChart from './EarningsChart'

export default function EarningsSection(props) {
  const { earnings, artistId, wallet } = props

  const data = earnings.map((ele) => ({
    x: MonthCodes[ele.month] + ' ' + ele.year,
    y: ele.earning,
  }))

  return (
    <div class=" education-sec card-style mt-3 earnings">
      <div
        style={{ border: 'none' }}
        class="table-head flex-content earnings-head"
      >
        <h6>
          <FormattedMessage id="earnings" defaultMessage="Earnings" />
        </h6>
        <Link
          className="ml-auto"
          to={{
            pathname: `/artist-management/${artistId}/profile/earnings`,
            state: {
              earningsData: data,
              wallet,
            },
          }}
        >
          <div>
            <button
              type="button"
              className="btn btn-default next-arrow ml-auto transparent-bg"
            >
              <i className="fas fa-angle-right"></i>
            </button>
          </div>
        </Link>
      </div>

      <div class="p-3 d-flex">
        <div class="value">
          <h1 style={{ fontWeight: 600 }}>${wallet}</h1>
          <h6>
            <FormattedMessage id="inWallet" defaultMessage="In Wallet" />
          </h6>
        </div>
        {data.length ? (
          <div class="graph">
            <div id="chartContainer" style={{ width: '100%' }}>
              <EarningsChart data={data} />
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
