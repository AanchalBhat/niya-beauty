import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContextProvider";
import { AccessTokenContext } from "../../context/AccessTokenProvider";
import { ArtistListingContext } from "../../context/ArtistListingProvider";
import ArtistListingView from "../common/ListingView/ListingView";
import constants from "../../utils/constants";
import { getArtistsAPI, changeUserStatusAPI } from "../../api/api";
import Spinner from "../common/LoadingSpinner/LoadingSpinner";

export default function ArtistListing({ dropdownValues }) {
  const {
    artists,
    getArtists,
    sort,
    loader,
    handleSortChange,
    totalResults,
    limit,
    setLimit,
    offset,
    filters,
    setArtistType,
    resultNum,
    artistType,
    currentPage,
    setCurrentPage,
    setFilters,
    handleFiltersChange,
    handleFilterSubmit,
    setReloadFlag,
    reloadFlag,
  } = useContext(ArtistListingContext);
  const { language } = useContext(LanguageContext);
  const { accessToken } = useContext(AccessTokenContext);
  const [artistId, setArtistId] = useState("");
  const [actionCode, setActionCode] = useState("");
  const [isFilterVisible, toggleFilter] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [actionLoader,SetActionLoader] = useState(false)

  useEffect(() => {
    getArtists();
  }, [reloadFlag]);

  function handleActionClick(artistId, actionCode, modalMessage = "") {
    setModalMessage(modalMessage);
    setArtistId(artistId);
    setActionCode(actionCode);
    setModalShow(true);
  }

  function handleClose() {
    setModalShow(false);
    setModalMessage("");
    setActionCode("");
  }

  function performAction() {
    SetActionLoader(true)
    const reqObj = {
      user_id: artistId,
      action: actionCode,
      language,
    };
    changeUserStatusAPI(reqObj, accessToken).then((res) => {
      SetActionLoader(false)
      if (res.success !== false) {
       
       console.log('res',res)
        setReloadFlag((prevState) => !prevState);
      }
    });
  }

  return (
    <>
     
      <ArtistListingView
        artists={artists}
        sort={sort}
        handleSortChange={handleSortChange}
        handleActionClick={handleActionClick}
        totalEntries={totalResults}
        toggleFilter={toggleFilter}
        limit={limit}
        isFilterVisible={isFilterVisible}
        setLimit={setLimit}
        artistType={artistType}
        setArtistType={setArtistType}
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
      />
       {loader === true || actionLoader === true ? <Spinner /> : null}
    </>
  );
}
