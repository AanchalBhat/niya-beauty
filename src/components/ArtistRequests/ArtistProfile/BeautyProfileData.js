import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useRouteMatch } from 'react-router-dom'

export default function BeautyProfileData({ data, artistId }) {
  const { url } = useRouteMatch()
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card-style beauty-data mt-3">
          <div className="table-head flex-content">
            <h6>
              <FormattedMessage
                id="beautyProfileData"
                defaultMessage="Beauty Profile Data"
              />
            </h6>
            <Link
              className="ml-auto"
              to={`/artist-management/${artistId}/profile/beauty-profile`}
            >
              <button
                type="button"
                className="btn btn-default theme-button ml-auto"
              >
                {' '}
                <i className="fas fa-pencil-alt"></i> Edit
              </button>
            </Link>
          </div>

          <div className="question-cards flex-content-scroll">
            {data.map((item, i) => (
              <li key={i}>
                <div
                  className={`card ${
                    item.answered ? 'select' : 'unselect'
                  }-show`}
                >
                  <div className="flex-content">
                    <h5>{item.index}</h5>
                    <h5 className="ml-auto">
                      <i className="fas fa-check-circle"></i>
                    </h5>
                  </div>
                  <h6>
                    {item.msg.length > 50
                      ? item.msg.substring(0, 50) + '..'
                      : item.msg}
                  </h6>

                  <div className="end-portion flex-content">
                    <p>{item.val}</p>
                    {/* <button
                      type="button"
                      className="btn btn-default edit-card ml-auto"
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button> */}
                  </div>
                </div>
              </li>
            ))}

           
          </div>
        </div>
      </div>
    </div>
  )
}
