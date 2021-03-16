import React, { useState, useContext, createContext, useEffect } from 'react'
import DEFAULTS from '../utils/DEFAULTS'
import { LanguageContext } from '../context/LanguageContextProvider'
import { AccessTokenContext } from '../context/AccessTokenProvider'
import { getUsersAPI } from '../api/api'
import constants from '../utils/constants'
import { convertToUTCDateTime, convertToUTCDateTimeEndDate } from '../utils/date-time'

export const UserListingContext = createContext()

export default function UserListingProvider(props) {
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const { isLoading, setIsLoading } = useState(false)
  const [users, setUsers] = useState([])
 const [loader,setLoader] = useState(false)
  const [userId, setUserId] = useState('')
  const [actionCode, setActionCode] = useState('')
  const [resultNum, setResultNum] = useState('')
  //Limit is the number of results requested from the server
  const [limit, setLimit] = useState(DEFAULTS['LISTING_ENTRIES_NUM'])
  //resultNum is the number of results returned by the server
  const [totalResults, setTotalResults] = useState(0)
  //0 -> Regular    1->Featured
  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [sort, setSort] = useState({
    field: DEFAULTS['SORT_FIELD_ARTISTS'],
    order: DEFAULTS['SORT_ORDER_ARTISTS'],
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
  }, [sort])

  useEffect(() => {
    reloadData()
  }, [offset])

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

  function getUsers() {
    const filtersObj = {}
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key == 'sign_up_date_start') {
          filtersObj[key] = convertToUTCDateTime(filters[key])
        } else if( key == 'sign_up_date_end'){ 
          filtersObj[key] = convertToUTCDateTimeEndDate(filters[key])
        }else {
          filtersObj[key] = filters[key]
        }
      }
    })
    const reqObject = {
      language,
      limit,
      offset,
      search_params: filtersObj,
      sorting_field: sort.field,
      sorting_order: sort.order,
    }
    getUsersAPI(reqObject, accessToken).then((res) => {
      setLoader(false);
      if (res.success !== false) {
        const responseData = res.data.data
        const { listing, total_results } = responseData
        setUsers(listing)
        if (offset === 0) {
          setTotalResults(total_results)
        }
        setResultNum(listing.length)
      }
    })
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

  function handleFilterSubmit() {
    reloadData()
  }

  function reloadData() {
    setLoader(true);
    setReloadFlag((prevState) => !prevState)
  }

  return (
    <UserListingContext.Provider
      value={{
        users,
        getUsers,
        sort,
        loader,
        handleSortChange,
        totalResults,
        limit,
        setLimit,
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
    </UserListingContext.Provider>
  )
}
