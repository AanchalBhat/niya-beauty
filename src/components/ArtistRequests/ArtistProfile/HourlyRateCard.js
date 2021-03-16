import React from 'react'

export default function HourlyRateCard() {
  return (
    <div className="col-md-3">
      <div className="theme-card education-sec position-relative mt-3">
        <img src={dollarIcon} />
        <h6 style={{ textAlign: 'left' }}>Hourly Rate</h6>
        <h1 style={{ textAlign: 'left' }}>${hourlyRate}</h1>
        <div style={{ textAlign: 'left' }} className="view">
          <a href="#">
            {' '}
            <i className="fas fa-pencil-alt"></i> Edit
          </a>
        </div>
      </div>
    </div>
  )
}
