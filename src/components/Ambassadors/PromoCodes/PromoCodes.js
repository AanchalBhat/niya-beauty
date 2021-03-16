import React, { useContext, useEffect, useState } from 'react'
import PromoCodesView from './PromoCodesView'
import './PromoCodes.css'
import { useParams } from 'react-router-dom'
import {
  getAmbassadorPromoCodesAPI,
  getAmbassadorPromoIDsAPI,
  getPromoCodeDetailsAPI,
} from '../../../api/api'
import { LanguageContext } from '../../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../../context/AccessTokenProvider'
import DEFAULTS from '../../../utils/DEFAULTS'
import constants from '../../../utils/constants'

export default function PromoCodes() {
  const { ambassadorID } = useParams()
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const [limit] = useState(DEFAULTS['LISTING_ENTRIES_NUM'])
  const [offset, setOffset] = useState(0)
  const [filters, setFilters] = useState(
    DEFAULTS['AMBASSADOR_PROMO_CODE_FILTERS'],
  )
  const [promoCodesSort, setPromoCodesSort] = useState({
    field: '',
    order: '',
  })
  const [activeSection, setActiveSection] = useState(
    constants['PROMO_CODES_SECTION'],
  )
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [promoCodes, setPromoCodes] = useState([])
  const [totalPromoCodes, setTotalPromoCodes] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  //------State Related to Promo Code Details--------
  //List of all promo codes and their ids
  const [promoIds, setPromoIds] = useState([])
  const [selectedPromoCode, setSelectedPromoCode] = useState('')
  const [promoUsageDetails, setPromoUsageDetails] = useState([])
  const [totalResultsPromoUsage, setTotalResultsPromoUsage] = useState(0)
  const [promoUsageTotalCodesUsed, setPromoUsageTotalCodesUsed] = useState(0)
  const [promoUsageLimit] = useState(
    DEFAULTS['LISTING_ENTRIES_NUM'],
  )
  const [promoUsageOffset, setPromoUsageOffset] = useState({
    offset: 0,
    reloadFlag: true,
  })
  const [promoUsageCurrentPage, setPromoUsageCurrentPage] = useState(1)
  const [basicDetailsSort, setBasicDetailsSort] = useState({
    order: '',
    field: '',
  })

  useEffect(() => {
    getAmbassadorPromoCodes()
  }, [offset,getAmbassadorPromoCodes])

  useEffect(() => {
    getAmbassadorPromoIDs()
  }, [getAmbassadorPromoIDs])

  useEffect(() => {
    if (selectedPromoCode) {
      getPromoCodeDetails()
    }
  }, [promoUsageOffset.reloadFlag, getPromoCodeDetails, selectedPromoCode])

  useEffect(() => {
    const newOffset = (currentPage - 1) * limit
    setOffset(newOffset)
  }, [currentPage,limit])

  useEffect(() => {
    if (promoIds.length) {
      setSelectedPromoCode(promoIds[0]['promo_id'])
    }
  }, [promoIds])

  useEffect(() => {
    if (selectedPromoCode) {
      setPromoUsageOffset((prevState) => ({
        offset: 0,
        reloadFlag: !prevState.reloadFlag,
      }))
    }
  }, [selectedPromoCode])

  useEffect(
    (prevState) => {
      const newOffset = (prevState - 1) * limit
      setPromoUsageOffset((prevState) => ({
        offset: newOffset,
        reloadFlag: !prevState.reloadFlag,
      }))
    },
    [promoUsageCurrentPage, limit],
  )

  //Get listing data
  function getAmbassadorPromoCodes() {
    let searchParams = {}
    for (let key of Object.keys(filters)) {
      if (filters[key]) searchParams[key] = filters[key]
    }

    const reqObj = {
      language,
      ambassador_id: ambassadorID,
      limit,
      offset,
      search_params: searchParams,
    }
    getAmbassadorPromoCodesAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        setPromoCodes(res.data.data.promo_codes)
        if (offset === 0) {
          setTotalPromoCodes(res.data.data.total_results)
        }
      }
    })
  }

  //Get list of all promo code ids
  function getAmbassadorPromoIDs() {
    const reqParams = {
      language,
      ambassador_id: ambassadorID,
    }
    getAmbassadorPromoIDsAPI(reqParams, accessToken).then((res) => {
      if (res.success !== false) {
        setPromoIds(res.data.data.codes)
      }
    })
  }

  function getPromoCodeDetails() {
    const reqObj = {
      language,
      ambassador_id: ambassadorID,
      promo_id: selectedPromoCode,
      limit: promoUsageLimit,
      offset: promoUsageOffset.offset,
    }
    console.log(reqObj)
    getPromoCodeDetailsAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        setPromoUsageDetails(res.data.data.promo_codes)
        if (promoUsageOffset.offset === 0) {
          setTotalResultsPromoUsage(res.data.data.total_results)
          setPromoUsageTotalCodesUsed(res.data.data.total_codes_used)
        }
      }
    })
  }

  function handleSelectedPromoCodeChange(e) {
    const { value } = e.target
    setSelectedPromoCode(value)
  }

  function handleFilterChange(e) {
    const { name, value } = e.target
    setFilters((prevState) => ({ ...prevState, [name]: value }))
  }

  function handleFilterApply() {
    getAmbassadorPromoCodes()
  }

  function handleFilterReset() {
    setFilters(DEFAULTS['AMBASSADOR_PROMO_CODE_FILTERS'])
  }

  function toggleFilterVisibility() {
    setIsFilterVisible((prevState) => !prevState)
  }

  function handlePromoCodesSortChange(newSortField) {
    if (promoCodesSort.field !== newSortField) {
      setPromoCodesSort({ field: newSortField, order: 0 })
    } else {
      setPromoCodesSort((prevState) => {
        let newOrder
        if (prevState.order === 0) newOrder = 1
        else newOrder = 0

        return {
          ...prevState,
          order: newOrder,
        }
      })
    }
  }

  function handleBasicDetailsSortChange(newSortField) {
    if (promoCodesSort.field !== newSortField) {
      setBasicDetailsSort({ field: newSortField, order: 0 })
    } else {
      setBasicDetailsSort((prevState) => {
        let newOrder
        if (prevState.order === 0) newOrder = 1
        else newOrder = 0

        return {
          ...prevState,
          order: newOrder,
        }
      })
    }
  }

  return (
    <div>
      <PromoCodesView
        promoCodes={promoCodes}
        promoIDs={promoIds}
        ambassadorID={ambassadorID}
        filters={filters}
        handleFilterChange={handleFilterChange}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        handleFilterApply={handleFilterApply}
        handleFilterReset={handleFilterReset}
        toggleFilterVisibility={toggleFilterVisibility}
        isFilterVisible={isFilterVisible}
        totalPromoCodes={totalPromoCodes}
        currentPage={currentPage}
        limit={limit}
        setCurrentPage={setCurrentPage}
        selectedPromoCode={selectedPromoCode}
        handleSelectedPromoCodeChange={handleSelectedPromoCodeChange}
        promoUsageDetails={promoUsageDetails}
        totalResultsPromoUsage={totalResultsPromoUsage}
        promoUsageTotalCodesUsed={promoUsageTotalCodesUsed}
        promoUsageCurrentPage={promoUsageCurrentPage}
        promoUsageLimit={promoUsageLimit}
        promoUsageTotalResults={totalResultsPromoUsage}
        setPromoUsageCurrentPage={setPromoUsageCurrentPage}
        promoCodesSort={promoCodesSort}
        basicDetailsSort={basicDetailsSort}
        handlePromoCodesSortChange={handlePromoCodesSortChange}
        handleBasicDetailsSortChange={handleBasicDetailsSortChange}
      />
    </div>
  )
}
