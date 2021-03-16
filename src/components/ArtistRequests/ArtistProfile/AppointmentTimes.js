import React from 'react'

export default function AppointmentTimes() {
  return (
   
      <div className="card-style education-sec gallery-data mt-3">
        <div className="table-head flex-content">
          <h6>Appointment Times</h6>
          <button
            type="button"
            className="btn btn-default theme-button ml-auto"
          >
            {' '}
            <i className="fas fa-plus"></i> Add
          </button>
        </div>
        <div className="card-text p-2">
          <div className="calender"></div>

          <div className="avaliable-booking flex-content">
            <h6>Avaliable for booking</h6>
            <label className="switch ml-auto">
              <input type="checkbox" checked />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="avaliable-times-slider">
            <ul style={{ justifyContent: 'center;' }} className="flex-content">
              <li className="slide-arrow">
                <a href="#" className="left">
                  <i className="fas fa-angle-left"></i>
                </a>
            </li>
            
              <li className="time-tab">
                <a href="#" className="">
                  2:00 PM - 3:00 PM
                </a>
              </li>
              <li className="time-tab">
                <a href="#" className="">
                  2:00 PM - 3:00 PM
                </a>
              </li>
              <li className="slide-arrow ml-auto">
                <a href="#" className="right">
                  <i className="fas fa-angle-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    
  )
}
