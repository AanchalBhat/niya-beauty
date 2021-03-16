import React, { useContext, useEffect, useState } from 'react'
import AmbassadorListingView from './AmbassadorListingView'
import { AmbassadorListingContext } from '../../../context/AmbassadorListingProvider'
import './AmbassadorListing.css'

export default function AmbassadorListing() {
  const {
    ambassadors,
    getAmbassadors,
    sort,
    handleSortChange,
    limit,
    offset,
    setOffset,
    currentPage,
    setCurrentPage,
    filters,
    handleFiltersChange,
    handleFilterReset,
    totalResults,
  } = useContext(AmbassadorListingContext)

  const [isFilterVisible, setIsFilterVisible] = useState(false)

  useEffect(() => {
    getAmbassadors()
  }, [sort,getAmbassadors])

  function toggleFilterVisibility() {
    setIsFilterVisible((prevState) => !prevState)
  }

  return (
    <AmbassadorListingView
      ambassadors={ambassadors}
      sort={sort}
      handleSortChange={handleSortChange}
      limit={limit}
      offset={offset}
      setOffset={setOffset}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      filters={filters}
      handleFiltersChange={handleFiltersChange}
      isFilterVisible={isFilterVisible}
      toggleFilterVisibility={toggleFilterVisibility}
      getAmbassadors={getAmbassadors}
      handleFilterReset={handleFilterReset}
      totalResults={totalResults}
    />
  )
}
