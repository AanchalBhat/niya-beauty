import React from 'react'
import reportsIcon from '../../assets/images/reports-ic.png'

export default function ReportsSection() {
  return (
    <div className="red-card gray-card education-sec position-relative mt-3" style={{ backgroundColor : "#b8e2f2"}}>
      <img src={reportsIcon} />
      <div className="flex-content">
        <h6>Reports</h6>
        <button type="button" className="btn btn-default next-arrow ml-auto">
          {' '}
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
      <div className="center-portion">
        <h1 style={{ fontWeight: 600 }}>02</h1>
        <p>Submitted</p>
      </div>
      <div className="end-portion">
        <h4>03</h4>
        <p>Resolved</p>
      </div>
    </div>
  )
}
