import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContextProvider";
import { AccessTokenContext } from "../../context/AccessTokenProvider";
import ListingView from "../common/ListingView/ListingView";
import constants from "../../utils/constants";
import { changeUserStatusAPI } from "../../api/api";
import { UserListingContext } from "../../context/UserListingProvider";
import Spinner from "../common/LoadingSpinner/LoadingSpinner";

export default function UserListing({ dropdownValues }) {
  const {
    users,
    getUsers,
    loader,
    sort,
    handleSortChange,
    totalResults,
    limit,
    setLimit,
    offset,
    filters,
    resultNum,
    currentPage,
    setCurrentPage,
    setFilters,
    handleFiltersChange,
    handleFilterSubmit,
    setReloadFlag,
    reloadFlag,
  } = useContext(UserListingContext);
  const { language } = useContext(LanguageContext);
  const { accessToken } = useContext(AccessTokenContext);

  const [userId, setUserId] = useState("");
  const [actionCode, setActionCode] = useState("");

  const [isFilterVisible, toggleFilter] = useState(false);
  const [actionLoader, SetActionLoader] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getUsers();
  }, [reloadFlag]);

  function handleActionClick(userId, actionCode, modalMessage = "") {
    setModalMessage(modalMessage);
   
    setUserId(userId);
    setActionCode(actionCode);
    setModalShow(true);
  }

  function handleClose() {
    setModalShow(false);
    setModalMessage("");
    setActionCode("");
  }

  function performAction() {
    SetActionLoader(true);
    const reqObj = {
      user_id: userId,
      action: actionCode,
      language,
    };
    changeUserStatusAPI(reqObj, accessToken).then((res) => {
      SetActionLoader(false);
      if (res.success !== false) {
       
        setReloadFlag((prevState) => !prevState);
      }
    });
  }

  return (
    <>
    
      <ListingView
        artists={users}
        sort={sort}
        handleSortChange={handleSortChange}
        handleActionClick={handleActionClick}
        totalEntries={totalResults}
        toggleFilter={toggleFilter}
        limit={limit}
        isFilterVisible={isFilterVisible}
        setLimit={setLimit}
        offset={offset}
        resultNum={resultNum}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        modalShow={modalShow}
        performAction={performAction}
        handleClose={handleClose}
        modalMessage={modalMessage}
        isFilterVisible={isFilterVisible}
        dropdownValues={dropdownValues}
        filters={filters}
        setFilters={setFilters}
        handleFilterChange={handleFiltersChange}
        handleFilterSubmit={handleFilterSubmit}
        type={constants["TABLE_USER_LISTING"]}
      />
      {loader === true || actionLoader === true ? <Spinner /> : null}
    </>
  );
}
