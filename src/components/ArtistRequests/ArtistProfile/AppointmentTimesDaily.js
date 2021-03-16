import React from 'react'

export default function AppointmentTimesDaily() {
    return (
        
          <div className="card-style education-sec gallery-data mt-3">
            <div className="table-head flex-content">
              <h6>Appointment Times Daily</h6>
              <button
                type="button"
                className="btn btn-default theme-button ml-auto"
              >
                {' '}
                <i className="fas fa-pencil-alt"></i> Edit
              </button>
            </div>

            <div
              style={{ overflowY: 'scroll', height: '200px' }}
              className="data-table"
            >
              <table
                style={{ borderBottom: '1px solid #F5EEE7;' }}
                className="table"
              >
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>
                      Monday
                      <div className="flex-content switch-action">
                        <label className="switch">
                          <input type="checkbox"  />
                          <span className="slider round"></span>
                        </label>
                        <button type="button" className="btn btn-default add">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </th>
                    <th>
                      Tuesday
                      <div className="flex-content switch-action">
                        <label className="switch">
                          <input type="checkbox" checked />
                          <span className="slider round"></span>
                        </label>
                        <button type="button" className="btn btn-default add">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </th>
                    <th>
                      Wednesday
                      <div className="flex-content switch-action">
                        <label className="switch">
                          <input type="checkbox" checked />
                          <span className="slider round"></span>
                        </label>
                        <button type="button" className="btn btn-default add">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </th>
                    <th>
                      Thursday
                      <div className="flex-content switch-action">
                        <label className="switch">
                          <input type="checkbox" checked />
                          <span className="slider round"></span>
                        </label>
                        <button type="button" className="btn btn-default add">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </th>
                    <th>
                      Friday
                      <div className="flex-content switch-action">
                        <label className="switch">
                          <input type="checkbox" checked />
                          <span className="slider round"></span>
                        </label>
                        <button type="button" className="btn btn-default add">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </th>
                    <th>
                      Saturday
                      <div className="flex-content switch-action">
                        <label className="switch">
                          <input type="checkbox" checked/>
                          <span className="slider round"></span>
                        </label>
                        <button type="button" className="btn btn-default add">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </th>
                    <th>
                      Sunday
                      <div className="flex-content switch-action">
                        <label className="switch">
                          <input type="checkbox" />
                          <span className="slider round"></span>
                        </label>
                        <button type="button" className="btn btn-default add">
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>9:00 AM - 10:00 AM</td>
                    <td>9:00 AM - 10:00 AM</td>
                    <td>9:00 AM - 10:00 AM</td>
                    <td>9:00 AM - 10:00 AM</td>
                    <td>9:00 AM - 10:00 AM</td>
                    <td>Not Avaliable</td>
                    <td>Not Avaliable </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
     
    )
}
