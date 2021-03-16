import React, { useState, useContext, createContext, useEffect } from 'react'
import DEFAULTS from '../utils/DEFAULTS'
import { LanguageContext } from '../context/LanguageContextProvider'
import { AccessTokenContext } from '../context/AccessTokenProvider'
import { getAmbassadorsAPI } from '../api/api'

export const AmbassadorListingContext = createContext()

export default function AmbassadorListingProvider(props) {
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)

  const [ambassadors, setAmbassadors] = useState([])
  const [limit, setLimit] = useState(DEFAULTS['LISTING_ENTRIES_NUM'])
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({
    order: DEFAULTS['SORT_ORDER_AMBASSADORS'],
    field: DEFAULTS['SORT_FIELD_AMBASSADORS'],
  })
  const [totalResults, setTotalResults] = useState(0)


  useEffect(() => {
    const newOffset = (currentPage - 1) * limit
    setOffset(newOffset)
  }, [currentPage])

  function getAmbassadors() {
    let searchParams = {}
    for (let key of Object.keys(filters)) {
      if (filters[key]) searchParams[key] = filters[key]
    }
    const reqObj = {
      language,
      limit,
      offset,
      sorting_field: sort.field,
      sorting_order: sort.order,
      search_params: searchParams,
    }
    getAmbassadorsAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        setAmbassadors(res.data.data.ambassadors)
        if (offset === 0) {
          setTotalResults(res.data.data.total_results)
        }
      }
    })
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
    const { value, name } = e.target
    setFilters((prevState) => ({ ...prevState, [name]: value }))
  }

  function handleFilterReset() {
    setFilters(DEFAULTS['AMBASSADORS_LISTING_FILTERS'])
  }

  return (
    <AmbassadorListingContext.Provider
      value={{
        ambassadors,
        getAmbassadors,
        handleSortChange,
        limit,
        setLimit,
        offset,
        setOffset,
        sort,
        currentPage,
        setCurrentPage,
        filters,
        handleFiltersChange,
        handleFilterReset,
        totalResults,
      }}
    >
      {props.children}
    </AmbassadorListingContext.Provider>
  )
}
