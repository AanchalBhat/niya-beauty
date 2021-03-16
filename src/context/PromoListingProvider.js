import React, { useState, useContext, createContext, useEffect } from 'react'
import DEFAULTS from '../utils/DEFAULTS'
import { LanguageContext } from '../context/LanguageContextProvider'
import { AccessTokenContext } from '../context/AccessTokenProvider'
import { getPromoCodesAPI } from '../api/api'

export const PromoListingContext = createContext()

export default function PromoListingProvider(props) {
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)

  const [promoCodes, setPromoCodes] = useState([])
  const [limit, setLimit] = useState(DEFAULTS['LISTING_ENTRIES_NUM'])
  const [offset, setOffset] = useState({ offset: 0, reload: false })
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState({
    order: DEFAULTS['SORT_ORDER_PROMOS'],
    field: DEFAULTS['SORT_FIELD_PROMOS'],
  })
  const [totalResults, setTotalResults] = useState(0)

  async function getPromoCodes() {
    console.log('getting')
    let searchParams = {}
    for (let key of Object.keys(filters)) {
      if (filters[key]) searchParams[key] = filters[key]
    }
    const reqObj = {
      language,
      limit,
      offset: offset.offset,
      sorting_field: sort.field,
      sorting_order: sort.order,
      search_params: searchParams,
    }

    const res = await getPromoCodesAPI(reqObj, accessToken)
    if (res.success !== false) {
      setPromoCodes(res.data.data.promo_codes)
      if (offset === 0) {
        setTotalResults(res.data.data.total_results)
      }
    }
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
    setOffset((prevState) => ({ offset: 0, reload: !prevState.reload }))
  }

  function handleFiltersChange(e) {
    const { value, name } = e.target
    setFilters((prevState) => ({ ...prevState, [name]: value }))
  }

  function handleFilterReset() {
    setFilters(DEFAULTS['AMBASSADORS_LISTING_FILTERS'])
  }

  function handleFiltersApply() {
    setOffset((prevState) => ({ offset: 0, reload: !prevState }))
  }

  return (
    <PromoListingContext.Provider
      value={{
        promoCodes,
        getPromoCodes,
        offset,
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
    </PromoListingContext.Provider>
  )
}
