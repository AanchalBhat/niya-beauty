import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
export default function PromosHeadbar() {
  return (
    <div className="head-bar flex-content">
      <h6 style={{ fontWeight: '600' }} className="mr-1">
        <FormattedMessage id="promoCodes" defaultMessage="Promo Codes" />
      </h6>

      <div className="filter-search ml-auto">
        <form className="flex-content ml-4">
          <div className="form-group mb-0 ml-2">
            <button type="button" className="btn btn-default theme-button">
              <FormattedMessage id="apply" defaultMessage="Apply" />
            </button>
            <button type="button" className="btn btn-default grey-button">
              <FormattedMessage id="clearAll" defaultMessage="Clear All" />
            </button>
            <Link to="/promocode/add">
              <button type="button" className="btn btn-default theme-button">
                <FormattedMessage id="add" defaultMessage="Add" />
              </button>
            </Link>
           
            <button type="button" className="btn btn-default theme-button">
              <FormattedMessage id="filters" defaultMessage="Filters" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
