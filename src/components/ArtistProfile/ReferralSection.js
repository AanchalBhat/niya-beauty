import React from 'react'

export default function ReferralSection() {
  return (
    <div className="card-style education-sec gallery-data mt-3">
      <div className="table-head flex-content">
        <h6>Reffered By</h6>
      </div>

      <div
        style={{ overflowY: 'scroll', height: '200px' }}
        className="data-table"
      >
        <table style={{ borderBottom: '1px solid #F5EEE7' }} className="table">
          <thead>
            <tr>
              <th style={{ fontSize: '14px' }}>Person Name</th>
              <th style={{ fontSize: '14px' }}>Reference Code</th>
              <th style={{ fontSize: '14px' }}>Date Referral Code Applied</th>
              <th style={{ fontSize: '14px' }}>SignUp Date of Artist</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>john Deo</td>
              <td>FFGV12487</td>
              <td>January 23rd, 2011</td>
              <td>January 23rd, 2011</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
