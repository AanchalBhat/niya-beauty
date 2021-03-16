import React from 'react'
import { FormattedMessage } from 'react-intl'
import constants from '../../utils/constants'
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner'

export default function ARHeader(props) {
  const filterButtonTheme = props.isFilterVisible ? 'grey' : 'theme'
  const artistType = props.artistType

  return (
    <div className="head-bar flex-content">
      <div className="showing flex-content">
        <p>
          <FormattedMessage
            id="resultCount"
            values={{
              start: props.resultNum ? parseInt(props.offset + 1) : 0,
              end: (parseInt(props.resultNum))? (parseInt(props.offset) + parseInt(props.resultNum)) : 0,
              total: props.totalEntries,
            }}
          />
          {/* Showing {props.resultNum ? parseInt(props.offset + 1) : 0}-
          {parseInt(props.offset) + parseInt(props.resultNum)} of{' '}
          {props.totalEntries} */}
        </p>
        <form className="show-enteries flex-content ml-4">
          <p>
            <FormattedMessage
              id="selectResultNum"
              defaultMessage="Show Entries"
            />
          </p>
          <div className="form-group select mb-0 ml-2 position-relative">
            <i className="fas fa-angle-down"></i>
            <select
              className="form-control"
              value={props.limit}
              onChange={(e) => {
                props.setLimit(e.target.value)
              }}
            >
              {constants['LISTING_ENTRIES_NUM_OPTIONS'].map((val,index) => (
                <option key={index} value={val}>{val}</option>
              ))}
            </select>
          </div>
        </form>
      </div>

      <div className="filter-search ml-auto">
        <form className="flex-content ml-4">
         
          {artistType !== undefined ? (
            <div className="form-group mb-0 flex-content">
              <button
                type="button"
                className={`btn btn-default ${
                  artistType === 1 ? 'theme' : 'white'
                }-button`}
                onClick={() => {
                  props.setArtistType(1)
                }}
              >
                <FormattedMessage id="featured" defaultMessage="Featured" />
              </button>
              <button
                type="button"
                className={`btn btn-default ml-2 ${
                  artistType === 0 ? 'theme' : 'white'
                }-button`}
                onClick={() => {
                  props.setArtistType(0)
                }}
              >
                <FormattedMessage id="regular" defaultMessage="Regular" />
              </button>
            </div>
          ) : (
            ''
          )}

          {/* <div className="form-group input-group position-relative ">
            <i className="fas fa-search"></i>
            <input
              type="text"
              className="form-control pl-4"
              placeholder={'Search'}
            />
          </div> */}

          <div className="form-group mb-0">
            <button
              type="button"
              className={`btn btn-default ${filterButtonTheme}-button`}
              onClick={() => {
                props.toggleFilter((prevState) => !prevState)
              }}
            >
              <FormattedMessage id="filter" defaultMessage="Filter" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
