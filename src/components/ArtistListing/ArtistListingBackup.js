import React, { useState, useEffect, useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import { ArtistListingContext } from '../../context/ArtistListingContext'
import ArtistListingView from '../common/ListingView/ListingView'
import constants from '../../utils/constants'
import { getArtistsAPI, changeUserStatusAPI } from '../../api/api'

export default function ArtistListing({ dropdownValues }) {
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const { isLoading, setIsLoading } = useState(false)
  const [artists, setArtists] = useState([])
  //Listing will be reloaded when value changes
  const [reloadFlag, setReloadFlag] = useState(false)
  const [artistId, setArtistId] = useState('')
  const [actionCode, setActionCode] = useState('')
  const [totalResults, setTotalResults] = useState('')
  //Limit is the number of results requested from the server
  const [limit, setLimit] = useState(5)
  //resultNum is the number of results returned by the server
  const [resultNum, setResultNum] = useState(0)
  //0 -> Regular    1->Featured
  const [artistType, setArtistType] = useState(0)
  const [filters, setFilters] = useState({})
  const [isFilterVisible, toggleFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sort, setSort] = useState({
    field: 'user_id',
    order: 1,
  })
  const [modalMessage, setModalMessage] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const [offset, setOffset] = useState((currentPage - 1) * limit)

  useEffect(() => {
    console.log(filters)
  }, [filters])

  useEffect(() => {
    getArtists()
  }, [limit, offset, artistType, sort, reloadFlag])


  useEffect(() => {
    const newOffset = (currentPage - 1) * limit
    setOffset(newOffset)
  }, [currentPage])

  useEffect(() => {
    const pageNum = Math.floor(offset / limit) + 1
    setCurrentPage(pageNum)
  }, [limit])

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

  function handleActionClick(artistId, actionCode, modalMessage = '') {
    setModalMessage(modalMessage)
    setArtistId(artistId)
    setActionCode(actionCode)
    setModalShow(true)
  }

  function handleClose() {
    setModalShow(false)
    setModalMessage('')
    setActionCode('')
  }

  function performAction() {
    const reqObj = {
      user_id: artistId,
      action: actionCode,
      language,
    }
    changeUserStatusAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        setReloadFlag((prevState) => !prevState)
      }
    })
  }

  function getArtists() {
    const filtersObj = {}
    Object.keys(filters).forEach((key) => {
      if (filters[key]) filtersObj[key] = filters[key]
    })
    const reqObject = {
      language,
      limit,
      offset,
      artist_type: artistType,
      search_params: filtersObj,
      sorting_field: sort.field,
      sorting_order: sort.order,
    }
    getArtistsAPI(reqObject, accessToken).then((res) => {
   
      if (res.success !== false) {
        const responseData = res.data.data
        const { listing, total_results } = responseData
        setArtists(listing)
        if (offset === 0) {
          setTotalResults(total_results)
        }
        setResultNum(listing.length)
      }
    })
  }
  // Filter
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
    getArtists()
  }

  return (
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
  )
}
