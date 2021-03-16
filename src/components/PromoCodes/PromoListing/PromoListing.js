import React, { useContext, useEffect, useState } from 'react'
import PromoListingView from './PromoListingView'
import './PromoListing.css'
import { PromoListingContext } from '../../../context/PromoListingProvider'

export default function PromoListing() {
  const contextVal = useContext(PromoListingContext)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const {
    promoCodes,
    getPromoCodes,
    offset,
    handleSortChange,
    limit,
    setLimit,
    setOffset,
    sort,
    currentPage,
    setCurrentPage,
    filters,
    handleFiltersChange,
    handleFilterReset,
    totalResults,
  } = contextVal

  useEffect(() => {
    getPromoCodes()
  }, [offset])

  function toggleFilterVisibility() {
    setIsFilterVisible((prevState) => !prevState)
  }

  return (
    <PromoListingView
      {...contextVal}
      toggleFilterVisibility={toggleFilterVisibility}
    />
  )
}
