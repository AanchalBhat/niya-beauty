import React from 'react'

import EarningsChart from '../ArtistProfile/EarningsSection/EarningsChart'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import EarningsFilter from './EarningsFilter'
import EarningsHistory from './EarningsHistory'
import MonthCodes from '../../utils/MonthCodes'
import { Link } from 'react-router-dom'

export default function ArtistEarningsView(props) {
  const {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setPrevStartDate,
    setPrevEndDate,
    handleApply,
    earningsData,
    wallet,
    handleFilterVisibliltyToggle,
    isFilterVisible,
    checkIfErrorsRemoved,
    error,
    earningsHistory,
    availableServices,
    handleScroll,
    isLoading,
    artistId,
  } = props

  // const dummyData = [
  //   { year: 2021, month: 2, date: '2021-02', earning: 500 },
  //   { year: 2022, month: 3, date: '2021-02', earning: 600 },
  //   { year: 2023, month: 4, date: '2021-02', earning: 300 },
  //   { year: 2024, month: 5, date: '2021-02', earning: 700 },
  //   { year: 2025, month: 6, date: '2021-02', earning: 300 },
  //   { year: 2026, month: 7, date: '2021-02', earning: 900 },
  //   // { year: 2027, month: 8, date: '2021-02', earning: 500 },
  //   // { year: 2028, month: 9, date: '2021-02', earning: 600 },
  //   // { year: 2029, month: 10, date: '2021-02', earning: 300 },
  //   // { year: 2030, month: 11, date: '2021-02', earning: 700 },
  //   // { year: 2031, month: 12, date: '2021-02', earning: 300 },
  //   // { year: 2032, month: 1, date: '2021-02', earning: 900 },
  // ]

  // const earningsDummyData = dummyData.map((ele) => ({
  //   x: ele.year,
  //   y: ele.earning,
  // }))

  return (
    <div className="container-fluid">
      <div className="earnings-parent parent-div mt-4">
        <div className="head-bar">
          <div className="breadcrumb">
            <Link to={`/artist-management/${artistId}/profile`}>
              <button type="button" className="btn btn-default back">
                <i className="fas fa-chevron-left"></i>
              </button>
            </Link>
            <p>
              <FormattedMessage
                id="breadcrumbs.artistEarnings"
                values={{ b: (text) => <b>{text}</b> }}
              />
            </p>
          </div>
        </div>

        <div className="card-style packages-cards m-3">
          <div className="card-head flex-content">
            <h6>
              <FormattedMessage id="earnings" />
            </h6>
            <div className="filter-drop ml-auto">
              <form className="flex-content ml-4">
                <div className="form-group mb-0 ml-2 filter-buttons">
                  <button
                    className="btn btn-default theme-button"
                    onClick={handleApply}
                  >
                    <FormattedMessage id="apply" defaultMessage="Apply" />
                  </button>
                  <button
                    className={`btn btn-default ${
                      isFilterVisible ? 'theme' : 'white'
                    }-button`}
                    onClick={handleFilterVisibliltyToggle}
                  >
                    <FormattedMessage id="filters" defaultMessage="Filters" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          {isFilterVisible ? (
            <EarningsFilter
              setEndDate={setEndDate}
              setStartDate={setStartDate}
              startDate={startDate}
              endDate={endDate}
              setPrevStartDate={setPrevStartDate}
              setPrevEndDate={setPrevEndDate}
              checkIfErrorsRemoved={checkIfErrorsRemoved}
              error={error}
            />
          ) : (
            ''
          )}

          <div className="cards-scroll">
            <div className="row">
              <div className="col-md-6 border-right">
                <div
                  className="wallet card-color"
                  style={{ overflowY: 'scroll' }}
                >
                  <h4 style={{ fontWeight: '600' }}>
                    <FormattedMessage id="wallet" defaultMessage="Wallet" />
                  </h4>
                  <h1 style={{ fontWeight: '600' }}>
                    {wallet ? `$${wallet}` : ''}
                  </h1>
                  {earningsData.length ? (
                    <div class="graph" style={{ width: '100%' }}>
                      <div
                        id="chartContainer"
                        style={{ height: '200px', width: '100%' }}
                      >
                        <EarningsChart data={earningsData} />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <EarningsHistory
                  earningsHistory={earningsHistory}
                  availableServices={availableServices}
                  handleScroll={handleScroll}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
