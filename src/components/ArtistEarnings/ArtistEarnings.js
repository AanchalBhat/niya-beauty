import React, { useState, useEffect, useContext } from 'react'
import './ArtistEarnings.css'
import ArtistEarningsView from './ArtistEarningsView'
import moment from 'moment'
import constants from '../../utils/constants'
import { useLocation, useParams } from 'react-router-dom'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import { getArtistEarningsAPI } from '../../api/api'
import MonthCodes from '../../utils/MonthCodes'
import Defaults from '../../utils/DEFAULTS'

export default function ArtistEarnings(props) {
  const { availableServices } = props
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [prevStartDate, setPrevStartDate] = useState()
  const [prevEndDate, setPrevEndDate] = useState()
  const { artistId } = useParams()
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const location = useLocation()
  const [earningsData, setEarningsData] = useState(
    location.state ? location.state.earningsData : [],
  )
  const [wallet, setWallet] = useState(
    location.state ? location.state.wallet : '',
  )
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [error, setError] = useState({ error: false, message: '' })
  const [offset, setOffset] = useState({
    offset: 0,
    reload: false,
  })
  const [limit, setLimit] = useState(Defaults['LISTING_ENTRIES_NUM'])
  const [earningsHistory, setEarningsHistory] = useState([])
  const [totalCountEarningsHistory, setTotalCountEarningsHistory] = useState('')

  useEffect(() => {
    getEarningsData()
  }, [offset.reload])

  useEffect(() => {
    //
  }, [startDate])

  function handleApply(e) {
    e.preventDefault()

    const result = runValidations()
    if (result) {
      if (
        Date.parse(startDate) !== Date.parse(prevStartDate) ||
        Date.parse(endDate) !== Date.parse(prevEndDate)
      ) {
        setPrevStartDate(startDate)
        setPrevEndDate(endDate)
        setOffset((prevState) => ({
          offset: 0,
          reload: !prevState.reload,
        }))
      }
    }
  }

  function handleFilterVisibliltyToggle(e) {
    e.preventDefault()
    setIsFilterVisible((prevState) => !prevState)
  }

  function runValidations() {
    if (!startDate || !endDate) {
      setError({ error: true, message: 'error.missingDate' })
      return false
    } else if (Date.parse(startDate) > Date.parse(endDate)) {
      setError({ error: true, message: 'error.startDateGreater' })
      return false
    } else {
      setError({ error: false, message: 'blank' })
      return true
    }
  }

  function checkIfErrorsRemoved() {
    if (!startDate || !endDate) {
      //Do nothing
    } else if (Date.parse(startDate) > Date.parse(endDate)) {
      //Do nothing
    } else {
      console.log('No errors')
      setError({ error: false, message: 'blank' })
    }
  }

  async function getEarningsData() {
    setIsLoading(true)
    let monthsDiff = 6
    let reqObj = {}

    if (startDate && endDate) {
      monthsDiff = moment(endDate).diff(startDate, 'months', true)
      reqObj = {
        start_date: moment(startDate).format('YYYY-MM'),
        end_date: moment(endDate).format('YYYY-MM'),
        frequency:
          monthsDiff > 11
            ? constants['EARNINGS_YEARLY']
            : constants['EARNINGS_MONTHLY'],
        artist_id: artistId,
        language,
      }
    } else {
      reqObj = {
        artist_id: artistId,
        language,
        offset: offset.offset,
        limit: limit,
      }
    }

    const res = await getArtistEarningsAPI(reqObj, accessToken)
    if (res.success !== false) {
      const {
        earnings,
        wallet,
        earning_history: earningHistory,
      } = res.data.data
      if (offset.offset === 0) {
        setTotalCountEarningsHistory(res.data.data.total_results)
        setEarningsHistory(earningHistory)
        setWallet(wallet)
        if (monthsDiff > 11) {
          const data = earnings.map((ele) => ({
            x: ele.year,
            y: ele.earning,
          }))
          setEarningsData(data)
        } else {
          const data = earnings.map((ele) => ({
            x: MonthCodes[ele.month] + ' ' + ele.year,
            y: ele.earning,
          }))
          setEarningsData(data)
        }
      } else {
        setEarningsHistory((prevState) => [...prevState, ...earningHistory])
      }

      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  }

  function handleScroll(e) {
    if (offset.offset + limit < totalCountEarningsHistory) {
      if (!isLoading) {
        const { target } = e
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
          console.log(offset.offset + limit)
          console.log(totalCountEarningsHistory)
          setIsLoading(true)
          setOffset((prevState) => ({
            offset: prevState.offset + limit,
            reload: !prevState.reload,
          }))
        }
      }
    }
  }

  return (
    <ArtistEarningsView
      setStartDate={setStartDate}
      setEndDate={setEndDate}
      setPrevStartDate={setPrevStartDate}
      setPrevEndDate={setPrevEndDate}
      startDate={startDate}
      endDate={endDate}
      handleApply={handleApply}
      earningsData={earningsData}
      wallet={wallet}
      handleFilterVisibliltyToggle={handleFilterVisibliltyToggle}
      isFilterVisible={isFilterVisible}
      checkIfErrorsRemoved={checkIfErrorsRemoved}
      error={error}
      earningsHistory={earningsHistory}
      availableServices={availableServices}
      handleScroll={handleScroll}
      isLoading={isLoading}
      artistId={artistId}
    />
  )
}
