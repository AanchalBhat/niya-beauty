import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import constants from '../../../utils/constants'

export default function PromoCodesHeadbar({
  ambassadorID,
  isFilterVisible,
  toggleFilterVisibility,
  handleApply,
  handleReset,
  activeSection,
}) {
  return (
    <div className="head-bar flex-content">
      <Link to="/ambassadors">
        <button type="button" className="btn btn-default back">
          <i className="fas fa-chevron-left"></i>
        </button>
      </Link>
      <h6 style={{ fontWeight: 600 }} className="mr-1">
        <FormattedMessage id="ambassadorID" />: {ambassadorID}
      </h6>
      <div className="filter-search ml-auto">
        <form className="flex-content ml-4">
          <div className="form-group mb-0 ml-2">
            {activeSection === constants['PROMO_CODES_SECTION'] &&
            isFilterVisible ? (
              <>
                <button
                  type="button"
                  className="btn btn-default theme-button"
                  onClick={handleApply}
                >
                  <FormattedMessage id="apply" defaultMessage="Apply" />
                </button>
                <button
                  type="button"
                  className="btn btn-default grey-button"
                  onClick={handleReset}
                >
                  <FormattedMessage id="clearAll" defaultMessage="Clear All" />
                </button>
              </>
            ) : (
              ''
            )}

            {activeSection === constants['PROMO_CODES_SECTION'] ? (
              <button
                type="button"
                className={`btn btn-default ${
                  isFilterVisible ? 'theme' : 'white'
                }-button`}
                onClick={toggleFilterVisibility}
              >
                <FormattedMessage id="filter" defaultMessage="Filter" />
              </button>
            ) : (
              ''
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
