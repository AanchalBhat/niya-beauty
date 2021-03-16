import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function PromosFilters() {
  return (
    <div className="filters">
      <form className="flex-content">
        <div className="form-group">
          <label>
            <FormattedMessage id="promoCode" defaultMessage="Promo Code" />
          </label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Promo Title</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Promo Usage Limit</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>Per User Limit</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group">
          <label>PromoType</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group icon-set-input position-relative">
          <i className="far fa-calendar-alt"></i>
          <label>Date Created</label>
          <input type="text" className="form-control" />
        </div>

        <div className="form-group icon-set-input position-relative">
          <i className="far fa-calendar-alt"></i>
          <label>Expiry Date</label>
          <input type="text" className="form-control" />
        </div>
      </form>
    </div>
  )
}
