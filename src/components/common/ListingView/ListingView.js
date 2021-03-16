import React from "react";
import DataTable from "../ArtistsUsersDataTable";
import DropdownMenu from "../ActionDropdownMenu/ListingDropdown";
import Header from "../../ArtistRequests/ARHeader";
import Pagination from "../Pagination";
// import ReactPaginate from 'react-paginate'
import "../../ArtistRequests/ArtistRequests.css";
import Filters from "../Filter";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";

export default function ListingView({
  artists,
  sort,
  handleSortChange,
  handleActionClick,
  totalEntries,
  toggleFilter,
  limit,
  totalCount,
  isFilterVisible,
  setLimit,
  artistType,
  setArtistType,
  resultNum,
  offset,
  setCurrentPage,
  currentPage,
  modalShow,
  performAction,
  modalMessage,
  handleClose,
  dropdownValues,
  filters,
  setFilters,
  totalResults,
  handleFilterChange,
  handleFilterSubmit,
  type,
}) {
  const changeCurrentPage = (numPage) => {
    setCurrentPage(numPage);
  };
  return (
    <div className="container-fluid">
      <div className="artist-request parent-div mt-4">
        <Header
          totalEntries={totalEntries}
          toggleFilter={toggleFilter}
          limit={limit}
          isFilterVisible={isFilterVisible}
          setLimit={setLimit}
          artistType={artistType}
          setArtistType={setArtistType}
          resultNum={resultNum}
          offset={offset}
        />
        {isFilterVisible ? (
          <Filters
            dropdownValues={dropdownValues}
            filters={filters}
            handleChange={handleFilterChange}
            handleSubmit={handleFilterSubmit}
            setFilters={setFilters}
          />
        ) : (
          ""
        )}
        <DataTable
          dropdownMenu={DropdownMenu}
          users={artists}
          handleSortChange={handleSortChange}
          sortField={sort.field}
          sortOrder={sort.order}
          handleActionClick={handleActionClick}
          type={type}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalResults}
          changeCurrentPage={changeCurrentPage}
          // theme="bottom-border"
        />
       
        <ConfirmationPopup
          modalShow={modalShow}
          performAction={performAction}
          modalMessage={modalMessage}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
}
