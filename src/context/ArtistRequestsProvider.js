import React, { createContext, useContext, useEffect, useState } from 'react'
import { getArtistRequestsAPI } from '../api/api'
import constants from '../utils/constants'
import { convertToUTCDateTime, convertToUTCDateTimeEndDate } from '../utils/date-time'
import DEFAULTS from '../utils/DEFAULTS'
import { AccessTokenContext } from './AccessTokenProvider'
import { LanguageContext } from './LanguageContextProvider'

export const ArtistRequestsContext = createContext()

export default function ArtistRequestsProvider(props) {
  const [loader,setLoader] = useState(false)
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const { isLoading, setIsLoading } = useState(false)
  const [artistRequests, setArtistRequests] = useState([])
  const [totalEntries, setTotalEntries] = useState('')
  const [limit, setLimit] = useState(DEFAULTS['LISTING_ENTRIES_NUM'])
  const [currentPage, setCurrentPage] = useState(1)
  const [resultNum, setResultNum] = useState(0)
  const [filters, setFilters] = useState({})
  const [artistType, setArtistType] = useState(constants['ARTIST_TYPE_REGULAR'])
  const [requestType, setRequestType] = useState(
    constants['ARTIST_REQUEST_TYPE_PENDING'],
  )
  const [sort, setSort] = useState({
    field: DEFAULTS['SORT_FIELD_ARTISTREQUESTS'],
    order: DEFAULTS['SORT_ORDER_ARTISTREQUESTS'],
  })
  const [requestCount, setRequestCount] = useState({
    pending: '',
    disapproved: '',
    rejected: '',
  })
  const [offset, setOffset] = useState(0)
  const [reloadFlag, setReloadFlag] = useState(false)

  useEffect(() => {
    const newOffset = (currentPage - 1) * limit
    setOffset(newOffset)
  }, [currentPage])

  useEffect(() => {
    const pageNum = Math.floor(offset / limit) + 1
    setCurrentPage((prevState) => {
      if (pageNum === prevState) {
        reloadData()
      }
      return pageNum
    })
  }, [limit])

  useEffect(() => {
    setOffset((prevState) => {
      if (prevState === 0) {
        reloadData()
      }
      return 0
    })
  }, [artistType])

  useEffect(() => {
    setOffset((prevState) => {
      if (prevState === 0) {
        reloadData()
      }
      return 0
    })
  }, [requestType])

  useEffect(() => {
    setOffset((prevState) => {
      if (prevState === 0) {
        reloadData()
      }
      return 0
    })
  }, [sort])

  useEffect(() => {
    reloadData()
  }, [offset])

  function reloadData() {
    setLoader(true)
    setReloadFlag((prevState) => !prevState)
  }

  function handleSortChange(newSortField) {
    //Check if sort field has changed
    if (sort.field !== newSortField) {
      setSort({ field: newSortField, order: 0 })
    } else {
      setSort((prevState) => {
        let newOrder
        if (prevState.order === 0) newOrder = 1
        else newOrder = 0

        return {
          ...prevState,
          order: newOrder,
        }
      })
    }
  }

  function handleFiltersChange(e) {
    const { name, value } = e.target
    setFilters((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  function handleFilterSubmit(searchParams) {
    getArtistRequests(searchParams)
  }

  function getArtistRequests() {
    const filtersObj = {}
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key == 'sign_up_date_start') {
          filtersObj[key] = convertToUTCDateTime(filters[key])
        } else if (key == 'sign_up_date_end') {
          filtersObj[key] = convertToUTCDateTimeEndDate(filters[key])
        } else {
          filtersObj[key] = filters[key]
        }
      }
    })

    const reqObj = {
      language,
      limit,
      offset,
      request_type: requestType,
      artist_type: artistType,
      search_params: filtersObj,
      sorting_field: sort.field,
      sorting_order: sort.order,
    }

    getArtistRequestsAPI(reqObj, accessToken).then((res) => {
      setLoader(false);
      if (res.success !== false) {
        console.log(res.data.data)
        const {
          requests,
          total_results: totalEntries,
          request_count,
        } = res.data.data
        setArtistRequests(requests)

        if (offset === 0) {
          setTotalEntries(totalEntries)
          setRequestCount(request_count)
        }
        setResultNum(requests.length)
      }
    })
  }

  return (
    <ArtistRequestsContext.Provider
      value={{
        artistRequests,
        setRequestType,
        loader,
        getArtistRequests,
        limit,
        offset,
        artistType,
        requestType,
        sort,
        totalEntries,
        setLimit,
        resultNum,
        filters,
        handleFilterSubmit,
        handleFiltersChange,
        setFilters,
        requestCount,
        handleSortChange,
        currentPage,
        setCurrentPage,
        reloadFlag,
        setArtistType
      }}
    >
      {props.children}
    </ArtistRequestsContext.Provider>
  )
}
