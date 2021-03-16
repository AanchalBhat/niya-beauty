import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function FeedbackClientCard({ details, feedbackValues, starValues }) {
  let stars = []
  let feedback = []
  if (details) {
    for (let num = 0; num < details.star_rating; num++) {
      stars.push(<i className="fas fa-star" key={num}></i>)
    }

    feedback = details.feedback.map((val) => (
      <span> {feedbackValues[val]} </span>
    ))
  }

  return (
    <div className="details-card">
      <h6>
        <FormattedMessage
          id="feedbackByClient"
          defaultMessage="Feedback By Client"
        />
      </h6>
      <div className="flex-content">
        <div className="group w-50">
          <label>
            <FormattedMessage id="rating" defaultMessage="Rating" />
          </label>
          <p>{details ? starValues[details.star_rating]: ''}</p>
          <div className="flex-content stars">{stars}</div>
        </div>
      </div>
      <div className="group">
        <label>
          <FormattedMessage id="feedback" defaultMessage="Feedback" />
        </label>
        <div className="tags flex-wrap">{feedback}</div>
      </div>
    </div>
  )
}
