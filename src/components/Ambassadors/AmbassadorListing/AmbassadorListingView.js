import React from "react";

import AmbassadorListingFilters from "./AmbassadorListingFilters";
import AmbassadorListingHeadBar from "./AmbassadorListingHeadBar";
import AmbassadorListingTable from "./AmbassadorListingTable";
import Pagination from "../../common/Pagination";

export default function AmbassadorListingView({
  ambassadors,
  sort,
  handleSortChange,
  limit,
  offset,
  setOffset,
  currentPage,
  setCurrentPage,
  filters,
  handleFiltersChange,
  toggleFilterVisibility,
  isFilterVisible,
  getAmbassadors,
  handleFilterReset,
  totalResults,
}) {
  const changeCurrentPage = (numPage) => {
    setCurrentPage(numPage);
  };
  return (
    <div className="container-fluid">
      <div className="niya-ambassador parent-div mt-4">
        <AmbassadorListingHeadBar
          toggleFilterVisibility={toggleFilterVisibility}
          isFilterVisible={isFilterVisible}
          getAmbassadors={getAmbassadors}
          handleFilterReset={handleFilterReset}
        />
        {isFilterVisible ? (
          <AmbassadorListingFilters
            filters={filters}
            handleChange={handleFiltersChange}
          />
        ) : (
          ""
        )}

        <AmbassadorListingTable
          ambassadors={ambassadors}
          sortField={sort.field}
          sortOrder={sort.order}
          handleSortChange={handleSortChange}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalResults}
          changeCurrentPage={changeCurrentPage}
          // theme="bottom-border"
        />
      </div>
    </div>
  );
}
