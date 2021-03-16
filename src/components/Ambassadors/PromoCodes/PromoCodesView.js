import React from 'react'
import constants from '../../../utils/constants'
import PromoBasicDetails from './PromoBasicDetails/PromoBasicDetails'
import PromoCodesFilters from './PromoCodesFilters'
import PromoCodesHeadbar from './PromoCodesHeadbar'
import PromoCodesList from './PromoCodesList/PromoCodesList'
import PromoCodesNav from './PromoCodesNav'
import Pagination from '../../common/Pagination'

export default function PromoCodesView({
  promoCodes,
  ambassadorID,
  filters,
  handleFilterChange,
  activeSection,
  setActiveSection,
  handleFilterApply,
  handleFilterReset,
  isFilterVisible,
  toggleFilterVisibility,
  totalPromoCodes,
  currentPage,
  limit,
  setCurrentPage,
  promoIDs,
  selectedPromoCode,
  handleSelectedPromoCodeChange,
  promoUsageDetails,
  promoUsageTotalCodesUsed,
  promoUsageCurrentPage,
  promoUsageLimit,
  promoUsageTotalResults,
  setPromoUsageCurrentPage,
  promoCodesSort,
  basicDetailsSort,
  handlePromoCodesSortChange,
  handleBasicDetailsSortChange,
}) {
  return (
    <div class="container-fluid">
      <div class="promo-code-details parent-div mt-4">
        <PromoCodesHeadbar
          ambassadorID={ambassadorID}
          handleReset={handleFilterReset}
          handleApply={handleFilterApply}
          isFilterVisible={isFilterVisible}
          toggleFilterVisibility={toggleFilterVisibility}
          activeSection={activeSection}
        />
        {activeSection === constants['PROMO_CODES_SECTION'] &&
        isFilterVisible ? (
          <PromoCodesFilters
            filters={filters}
            handleChange={handleFilterChange}
          />
        ) : (
          ''
        )}
        <PromoCodesNav
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div class="tab-content">
          {activeSection === constants['PROMO_CODES_SECTION'] ? (
            <PromoCodesList
              promoCodes={promoCodes}
              currentPage={currentPage}
              limit={limit}
              totalCount={totalPromoCodes}
              setCurrentPage={setCurrentPage}
              sort={promoCodesSort}
              handleSortChange={handlePromoCodesSortChange}
            />
          ) : (
            <PromoBasicDetails
              promoIDs={promoIDs}
              selectedPromoCode={selectedPromoCode}
              handleSelectedPromoCodeChange={handleSelectedPromoCodeChange}
              promoUsageDetails={promoUsageDetails}
              promoUsageTotalCodesUsed={promoUsageTotalCodesUsed}
              promoUsageCurrentPage={promoUsageCurrentPage}
              promoUsageLimit={promoUsageLimit}
              promoUsageTotalResults={promoUsageTotalResults}
              setPromoUsageCurrentPage={setPromoUsageCurrentPage}
              sort={basicDetailsSort}
              handleSortChange={handleBasicDetailsSortChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}
