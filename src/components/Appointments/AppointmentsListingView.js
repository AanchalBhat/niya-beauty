import React from "react";
import Pagination from "../common/Pagination";
import { FormattedMessage } from "react-intl";
import constants from "../../utils/constants";
import DEFAULTS from "../../utils/DEFAULTS";
import "./Appointments.css";
import AppointmentsFilters from "./AppointmentsFilters";
import AppointmentsTable from "./AppointmentsTable";
import AppointmentDetailsModal from "./AppointmentDetailsModal/AppointmentDetailsModal";

export default function AppointmentsListingView({
  bookings,
  sort,
  handleSortChange,
  setLimit,
  setCurrentPage,
  currentPage,
  limit,
  totalCount,
  totalResults,
  isFilterVisible,
  toggleFilter,
  filters,
  handleFiltersChange,
  handleFilterSubmit,
  handleFiltersReset,
  packageOptions,
  handleActionClick,
  bookingDetailsModalShow,
  handleBookingModalViewClick,
  handleBookingDetailsModalHide,
}) {
  const packageDropdownOptions = packageOptions
    ? packageOptions.map((ele) => (
        <FormattedMessage
          id="appointmentFilters.dropdownOption.package"
          values={{
            duration: ele.duration_in_min,
            price: ele.total_price,
          }}
        >
          {(searchText) => (
            <option value={`${ele.duration_in_min},${ele.total_price}`}>
              {searchText}
            </option>
          )}
        </FormattedMessage>
      ))
    : "";
  const changeCurrentPage = (numPage) => {
    setCurrentPage(numPage);
  };
  return (
    <div class="appointments-listing">
      <div class="container-fluid">
        <div class="artist-request parent-div mt-4">
          <div class="head-bar flex-content">
            <div class="showing flex-content">
              <h6 style={{ fontWeight: 600 }} class="mr-1">
                <FormattedMessage id="appointments" />
              </h6>

              <form class="show-enteries flex-content ml-4">
                <p>
                  <FormattedMessage id="showEntries" />
                </p>
                <div class="form-group select mb-0 ml-2 position-relative">
                  <i class="fas fa-angle-down"></i>
                  <select
                    class="form-control"
                    id=""
                    onChange={(e) => {
                      setLimit(e.target.value);
                    }}
                  >
                    {constants["LISTING_ENTRIES_NUM_OPTIONS"].map((num) => (
                      <option value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </form>
            </div>

            <div class="filter-search ml-auto">
              <form class="flex-content ml-4">
                <div class="form-group mb-0 ml-2">
                  <button
                    type="button"
                    class="btn btn-default theme-button"
                    onClick={handleFilterSubmit}
                  >
                    <FormattedMessage id="apply" defaultMessage="Apply" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-default white-button"
                    onClick={handleFiltersReset}
                  >
                    <FormattedMessage
                      id="clearAll"
                      defaultMessage="Clear All"
                    />
                  </button>
                  <button
                    type="button"
                    class={`btn btn-default ${
                      isFilterVisible ? "theme" : "white"
                    }-button`}
                    onClick={() => {
                      toggleFilter((prevState) => !prevState);
                    }}
                  >
                    <FormattedMessage id="filter" defaultMessage="Clear All" />
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* Filters */}
          {isFilterVisible ? (
            <AppointmentsFilters
              filters={filters}
              handleFiltersChange={handleFiltersChange}
              packageDropdownOptions={packageDropdownOptions}
            />
          ) : (
            ""
          )}

          {/* -----Table----- */}
          <AppointmentsTable
            bookings={bookings}
            sortField={sort.field}
            sortOrder={sort.order}
            handleSortChange={handleSortChange}
            handleActionClick={handleActionClick}
            handleBookingModalViewClick={handleBookingModalViewClick}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalResults}
            changeCurrentPage={changeCurrentPage}
            // theme="bottom-border"
          />
        </div>
      </div>
    </div>
  );
}
