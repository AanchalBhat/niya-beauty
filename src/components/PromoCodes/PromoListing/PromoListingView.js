import React from 'react'
import PromosFilters from './PromosFilters'
import PromosHeadbar from './PromosHeadbar'
import PromoTable from './PromoTable'

export default function PromoListingView(props) {
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
    toggleFilterVisibility
  } = props
  console.log(promoCodes)
  return (
    <div className="container-fluid">
      <div className="promo-codes parent-div mt-4">
        <PromosHeadbar />
        <PromosFilters />
        <PromoTable promoCodes={promoCodes} />
      </div>
    </div>
  )
}
