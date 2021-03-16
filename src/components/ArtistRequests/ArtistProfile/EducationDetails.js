import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'

export default function EducationDetails(props) {
  const {
    education,
    isLoading,
    handleChange,
    handleEducationReset,
    addEducation,
    removeEducation,
  } = props
  const [isEdited, setIsEdited] = useState([])
  const [backupState, setBackupState] = useState([])

  useEffect(() => {
    setIsEdited(education.map((e) => false))
  }, [isLoading])

  // useEffect(() => {
  //   console.log('----Backup State Changed-----')
  //   console.log(backupState)
  // }, [backupState])

  return (
    <div className="card-style education-sec mt-3">
      <div className="table-head flex-content">
        <h6>
          <FormattedMessage id="education" defaultMessage="Education" />
        </h6>
        <button
          type="button"
          className="btn btn-default theme-button ml-auto"
          onClick={addEducation}
        >
          <i className="fas fa-plus"></i>{' '}
          <FormattedMessage id="add" defaultMessage="Add" />
        </button>
      </div>

      <form>
        {education.map((ele, index) => (
          <div className="partition-div" key={index}>
            <div className="row">
              <div className="col-md-3 pr-0">
                <div className="form-group">
                  <label>
                    <FormattedMessage
                      id="companyName"
                      defaultMessage="Company Name"
                    />
                  </label>
                  <input
                    name="company_name"
                    type="text"
                    value={ele.company_name}
                    data-id={index}
                    className="form-control"
                    onChange={handleChange}
                    readOnly={isEdited[index] ? false : true}
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="form-group">
                  <label>
                    {' '}
                    <FormattedMessage
                      id="dateRange"
                      defaultMessage="Date Range"
                    />
                  </label>
                  <div className="flex-content position-relative">
                    <i className="fas fa-arrow-right"></i>
                    <input
                      name="start_date"
                      type="date"
                      max={new Date().toISOString().substring(0, 10)}
                      value={ele.start_date}
                      data-id={index}
                      className="form-control width-40 mr-4"
                      readOnly={isEdited[index] ? false : true}
                      onChange={handleChange}
                    />
                    <input
                      name="end_date"
                      type="date"
                      min={ele.start_date}
                      max={new Date().toISOString().substring(0, 10)}
                      value={ele.end_date}
                      data-id={index}
                      className="form-control width-40 mr-4"
                      readOnly={isEdited[index] ? false : true}
                      onChange={handleChange}
                    />
                    {isEdited[index] ? (
                      <React.Fragment>
                        <button
                          data-id={index}
                          style={{
                            backgroundColor: '#975E4A',
                            color: '#fff',
                            boxShadow: '0 6px 12px 0 rgba(151, 94, 74, 0.49); ',
                          }}
                          type="button"
                          className="btn btn-default mr-3 action-btn"
                          onClick={() => {
                            let copyIsEdited = [...isEdited]
                            copyIsEdited[index] = false
                            setIsEdited(copyIsEdited)
                          }}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                        <button
                          style={{
                            backgroundColor: '#ff0707',
                            color: '#fff',
                            boxShadow: '0 6px 12px 0 rgba(255, 7, 7, 0.33)',
                          }}
                          type="button"
                          className="btn btn-default action-btn"
                          onClick={() => {
                            handleEducationReset(index, backupState)
                            let copyIsEdited = [...isEdited]
                            copyIsEdited[index] = false
                            setIsEdited(copyIsEdited)
                          }}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <button
                          style={{
                            backgroundColor: '#975E4A',
                            color: '#fff',
                            boxShadow: '0 6px 12px 0 rgba(151, 94, 74, 0.49) ',
                          }}
                          type="button"
                          className="btn btn-default mr-3 action-btn"
                          onClick={
                            //Edit button is clicked  1) Set isEdited(index) = true 2) Copy the current //state for backup backupState(index) = education[index]
                            () => {
                              //Copying edu data for backup

                              const backup = [...backupState]
                              backup[index] = Object.assign(
                                {},
                                education[index],
                              )
                              setBackupState(backup)
                              let copyIsEdited = [...isEdited]
                              copyIsEdited[index] = true
                              setIsEdited(copyIsEdited)
                            }
                          }
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          data-id={index}
                          style={{
                            backgroundColor: '#ff0707',
                            color: '#fff',
                            boxShadow: '0 6px 12px 0 rgba(255, 7, 7, 0.33)',
                          }}
                          type="button"
                          className="btn btn-default action-btn"
                          onClick={removeEducation}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </form>
    </div>
  )
}
