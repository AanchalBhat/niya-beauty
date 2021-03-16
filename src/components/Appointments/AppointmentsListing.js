import React, { useState, useEffect, useContext } from "react";
import AppointmentsListingView from "./AppointmentsListingView";
import { LanguageContext } from "../../context/LanguageContextProvider";
import { AccessTokenContext } from "../../context/AccessTokenProvider";
import ConfirmationPopup from "../common/ConfirmationPopup/ConfirmationPopup";
import CancelAppointmentModal from "./CancelAppointmentModal";

import constants from "../../utils/constants";
import {
  changeBookingStatusAPI,
  getBookingDetailsAPI,
  getBookingsAPI,
} from "../../api/api";

import DEFAULTS from "../../utils/DEFAULTS";
import AppointmentDetailsModal from "./AppointmentDetailsModal/AppointmentDetailsModal";
import Spinner from "../common/LoadingSpinner/LoadingSpinner";
export default function AppointmentsListing({ packageOptions, cancelOptions }) {
  console.log(cancelOptions);
  const { language } = useContext(LanguageContext);
  const { accessToken } = useContext(AccessTokenContext);
  const [isLoading, setIsLoading] = useState(false);
  //Total bookings in db
  const [totalCount, setTotalCount] = useState("");
  const [bookings, setBookings] = useState([]);
  //Listing will be reloaded when value changes
  const [reloadFlag, setReloadFlag] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [bookingDetails, setBookingDetails] = useState(
    DEFAULTS["BOOKING_DETAILS"]
  );
  const [statusCode, setStatusCode] = useState("");
  //Limit is the number of results requested from the server
  const [limit, setLimit] = useState(DEFAULTS["LISTING_ENTRIES_NUM"]);
  const [loader, setLoader] = useState(false);
  const [actionLoader, setActionLoader] = useState(false);
  const [filters, setFilters] = useState({});
  const [isFilterVisible, toggleFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({
    field: DEFAULTS["SORT_FIELD_BOOKINGS"],
    order: DEFAULTS["SORT_ORDER_BOOKINGS"],
  });
  const [confirmationModalMessage, setConfirmationModalMessage] = useState("");
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [cancellationModalShow, setCancellationModalShow] = useState(false);
  //----Booking Details Modal-----
  const [bookingDetailsModalShow, setBookingDetailsModalShow] = useState(false);

  const [offset, setOffset] = useState((currentPage - 1) * limit);

  useEffect(() => {
    getBookings();
  }, [limit, offset, sort, reloadFlag]);

  useEffect(() => {
    const pageNum = Math.floor(offset / limit) + 1;
    setCurrentPage(pageNum);
  }, [limit]);

  useEffect(() => {
    const newOffset = (currentPage - 1) * limit;
    setOffset(newOffset);
  }, [currentPage]);

  function handleSortChange(newSortField) {
    //Check if sort field has changed
    if (sort.field !== newSortField) {
      setSort({ field: newSortField, order: 0 });
    } else {
      setSort((prevState) => {
        let newOrder;
        if (prevState.order === 0) newOrder = 1;
        else newOrder = 0;

        return {
          ...prevState,
          order: newOrder,
        };
      });
    }
  }

  //Show confirmation or cancellation modal depending on user action
  function handleActionClick(bookingId, statusCode, modalMessage = "") {
    console.log("hui");
   
    setConfirmationModalMessage(modalMessage);
    setBookingId(bookingId);
    setStatusCode(statusCode);
    if (statusCode === constants["CODE_BOOKING_CANCELLED"])
      setCancellationModalShow(true);
    else if (statusCode === constants["CODE_BOOKING_COMPLETE"])
      setConfirmationModalShow(true);
  }

  //Hide confirmation modal
  function handleConfirmationClose() {
    setConfirmationModalShow(false);
    setBookingId("");
    setConfirmationModalMessage("");
    setStatusCode("");
  }

  //Hide cancellation modal
  function handleCancellationClose() {
    setCancellationModalShow(false);
    setBookingId("");
  }

  function performAction(reason, reasonID) {
    setActionLoader(true);
    let reqObj = {};
    if (reason) {
      reqObj = {
        booking_id: bookingId,
        status: statusCode,
        language,
        rejection_reason: reason,
        reason_id: reasonID,
      };
    } else {
      reqObj = {
        booking_id: bookingId,
        status: statusCode,
        language,
      };
    }
    console.log(reqObj);
    changeBookingStatusAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        setActionLoader(false);
        console.log("njkkk", res.data.data);
        getBookings();
      }
    });
  }

  function getBookings() {
    const reqObject = {
      language,
      limit,
      offset,
      search_params: filters,
      sorting_field: sort.field,
      sorting_order: sort.order,
    };

    getBookingsAPI(reqObject, accessToken).then((res) => {
      setLoader(false);
      if (res.success !== false) {
      
        const responseData = res.data.data;
        const { bookings } = responseData;
        if (offset === 0) {
          setTotalCount(responseData.total_results);
          console.log(responseData.total_results);
        }
        setBookings(bookings);
      }
    });
  }

  // Filter
  function handleFiltersChange(e) {
    console.log("hu");
    const { name, value } = e.target;
    if (name === "package") {
      const [duration_in_min, total_price] = value.split(",");
      setFilters((prevState) => {
        return {
          ...prevState,
          duration_in_min,
          total_price,
        };
      });
    } else {
      setFilters((prevState) => {
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  }

  function handleFilterSubmit() {
    setLoader(true);
    console.log("submit");
    getBookings();
  }

  function handleFiltersReset() {
    setFilters(DEFAULTS["APPOINTMENTS_LISTING_FILTERS"]);
  }

  //Show booking details modal
  function handleBookingDetailsModalShow() {
    setBookingDetailsModalShow(true);
  }

  //Hide booking details modal
  function handleBookingDetailsModalHide() {
    setBookingDetailsModalShow(false);
    setBookingId("");
    setBookingDetails(DEFAULTS["BOOKING_DETAILS"]);
    setStatusCode("");
  }

  // Get appointment details and show appointment details modal
  function handleBookingModalViewClick(bookingId, data) {
    //const { packageName, price, startTime, endTime } = data

    setBookingId(bookingId);
    setStatusCode(constants["CODE_BOOKING_CANCELLED"]);

    const queryParams = {
      bookingId,
      language,
    };
    setBookingDetails((prevState) => ({ ...prevState, ...data }));
    handleBookingDetailsModalShow();
    getBookingDetailsAPI(queryParams, accessToken).then((res) => {
      if (res.success !== false) {
        const responseData = res.data.data;
        const bookingData = {
          services: responseData.services,
          feedback: responseData.feedback,
          feedbackValues: responseData.feedback_values,
        };
        setBookingDetails((prevState) => ({ ...prevState, ...bookingData }));
      }
    });
  }

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <>
      {loader === true || actionLoader === true ? <Spinner /> : null}
      <AppointmentsListingView
        bookings={bookings}
        sort={sort}
        handleSortChange={handleSortChange}
        setLimit={setLimit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        limit={limit}
        totalCount={totalCount}
        isFilterVisible={isFilterVisible}
        filters={filters}
        handleFiltersChange={handleFiltersChange}
        handleFilterSubmit={handleFilterSubmit}
        toggleFilter={toggleFilter}
        filters={filters}
        handleFiltersReset={handleFiltersReset}
        packageOptions={packageOptions}
        handleActionClick={handleActionClick}
        handleBookingModalViewClick={handleBookingModalViewClick}
        // handleBookingDetailsModalHide={handleBookingDetailsModalHide}
        // bookingDetailsModalShow={bookingDetailsModalShow}
        // bookingDetails={bookingDetails}
      />
      <AppointmentDetailsModal
        handleClose={handleBookingDetailsModalHide}
        modalShow={bookingDetailsModalShow}
        bookingDetails={bookingDetails}
      />
      <ConfirmationPopup
        modalShow={confirmationModalShow}
        modalMessage={confirmationModalMessage}
        performAction={performAction}
        handleClose={handleConfirmationClose}
      />
      <CancelAppointmentModal
        modalShow={cancellationModalShow}
        handleClose={handleCancellationClose}
        performAction={performAction}
        cancelOptions={cancelOptions}
      />
    </>
  );
}
