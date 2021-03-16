import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function BeautyProfileDataCard({ data }) {
  return (
    <div className="card-style beauty-data mt-3">
      <div className="table-head flex-content">
        <h6>Beauty Profile Data</h6>
      </div>

      <div className="question-cards flex-content-scroll">
        {data.map((ele) => (
          <li>
            <div className="card">
              <h5>{ele.index}</h5>
              <h6>
                <FormattedMessage id={ele.ques} />
              </h6>

              <div className="end-portion flex-content">
                <p><FormattedMessage id={ele.ans} /></p>
              </div>
            </div>
          </li>
        ))}
      </div>
    </div>
  )
}
