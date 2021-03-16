import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

export default function AmbassadorListingHeadBar({
  toggleFilterVisibility,
  isFilterVisible,
  getAmbassadors,
  handleFilterReset,
}) {
  return (
    <div className="head-bar flex-content">
      <h6 style={{ fontWeight: '600' }} className="mr-1">
        <FormattedMessage
          id="niyaAmbassador"
          defaultMessage="Niya Ambassador"
        />
      </h6>

      <div className="filter-search ml-auto">
        <form className="flex-content ml-4">
          <div className="form-group mb-0 ml-2">
            <Link to="/ambassadors/add">
              <button type="button" className="btn btn-default theme-button">
                <FormattedMessage id="add" defaultMessage="Add" />
              </button>
            </Link>
            {isFilterVisible ? (
              <>
                {' '}
                <button
                  type="button"
                  className="btn btn-default theme-button"
                  onClick={getAmbassadors}
                >
                  <FormattedMessage id="apply" defaultMessage="Apply" />
                </button>
                <button
                  type="button"
                  className="btn btn-default grey-button"
                  onClick={handleFilterReset}
                >
                  <FormattedMessage id="clearAll" defaultMessage="Clear All" />
                </button>
              </>
            ) : (
              ''
            )}

            <button
              type="button"
              className={`btn btn-default ${
                isFilterVisible ? 'theme' : 'white'
              }-button`}
              onClick={toggleFilterVisibility}
            >
              <FormattedMessage id="filter" defaultMessage="Filter" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
