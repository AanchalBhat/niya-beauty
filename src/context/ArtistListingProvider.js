import React, { useState, useContext, createContext, useEffect } from "react";
import DEFAULTS from "../utils/DEFAULTS";
import { LanguageContext } from "../context/LanguageContextProvider";
import { AccessTokenContext } from "../context/AccessTokenProvider";
import { getArtistsAPI } from "../api/api";
import constants from "../utils/constants";

import {
  convertToUTCDateTime,
  convertToUTCDateTimeEndDate,
} from "../utils/date-time";

export const ArtistListingContext = createContext();

export default function ArtistListingProvider(props) {
  const { language } = useContext(LanguageContext);
  const { accessToken } = useContext(AccessTokenContext);
  const { isLoading, setIsLoading } = useState(false);
  const [artists, setArtists] = useState([]);

  const [artistId, setArtistId] = useState("");
  const [actionCode, setActionCode] = useState("");
  const [resultNum, setResultNum] = useState("");
  //Limit is the number of results requested from the server
  const [limit, setLimit] = useState(DEFAULTS["LISTING_ENTRIES_NUM"]);
  //resultNum is the number of results returned by the server
  const [totalResults, setTotalResults] = useState(0);
  //0 -> Regular    1->Featured
  const [artistType, setArtistType] = useState(
    constants["ARTIST_TYPE_REGULAR"]
  );
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({
    field: DEFAULTS["SORT_FIELD_ARTISTS"],
    order: DEFAULTS["SORT_ORDER_ARTISTS"],
  });
  const [offset, setOffset] = useState(0);
  const [reloadFlag, setReloadFlag] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const newOffset = (currentPage - 1) * limit;
    setOffset(newOffset);
  }, [currentPage]);

  useEffect(() => {
    const pageNum = Math.floor(offset / limit) + 1;
    setCurrentPage((prevState) => {
      if (pageNum === prevState) {
        reloadData();
      }
      return pageNum;
    });
  }, [limit]);

  useEffect(() => {
    setOffset((prevState) => {
      if (prevState === 0) {
        reloadData();
      }
      return 0;
    });
  }, [artistType]);

  useEffect(() => {
    setOffset((prevState) => {
      if (prevState === 0) {
        reloadData();
      }
      return 0;
    });
  }, [sort]);

  useEffect(() => {
    reloadData();
  }, [offset]);

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

  function getArtists() {
    const filtersObj = {};
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key == "sign_up_date_start") {
          filtersObj[key] = convertToUTCDateTime(filters[key]);
        } else if (key == "sign_up_date_end") {
          filtersObj[key] = convertToUTCDateTimeEndDate(filters[key]);
        } else {
          filtersObj[key] = filters[key];
        }
      }
    });
    const reqObject = {
      language,
      limit,
      offset,
      artist_type: artistType,
      search_params: filtersObj,
      sorting_field: sort.field,
      sorting_order: sort.order,
    };

    getArtistsAPI(reqObject, accessToken).then((res) => {
      setLoader(false);
      if (res.success !== false) {
        const responseData = res.data.data;

        const { listing, total_results } = responseData;

        setArtists(listing);
        if (offset === 0) {
          setTotalResults(total_results);
        }
        setResultNum(listing.length);
      }
    });
  }

  function handleFiltersChange(e) {
    const { name, value } = e.target;

    setFilters((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function handleFilterSubmit() {
    reloadData();
  }

  function reloadData() {
    setLoader(true);
    setReloadFlag((prevState) => !prevState);
  }

  return (
    <>
      <ArtistListingContext.Provider
        value={{
          artists,
          loader,
          getArtists,
          sort,
          handleSortChange,
          totalResults,
          limit,
          setLimit,
          artistType,
          setArtistType,
          offset: offset,
          resultNum,
          setResultNum,
          currentPage,
          setCurrentPage,
          filters,
          setFilters,
          handleFiltersChange,
          handleFilterSubmit,
          reloadFlag,
          setOffset,
          setReloadFlag,
        }}
      >
        {props.children}
      </ArtistListingContext.Provider>
    </>
  );
}
