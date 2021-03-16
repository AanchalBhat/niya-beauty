import React, { useState, useEffect, useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import ListingView from '../common/ListingView/ListingView'
import constants from '../../utils/constants'
import { getUsersAPI, changeUserStatusAPI } from '../../api/api'

export default function UserListing({dropdownValues}) {
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const { isLoading, setIsLoading } = useState(false)
  const [users, setUsers] = useState([])
  //Listing will be reloaded when value changes
  const [reloadFlag, setReloadFlag] = useState(false)
  const [userId, setUserId] = useState('')
  const [actionCode, setActionCode] = useState('')
  const [totalResults, setTotalResults] = useState('')
  //Limit is the number of results requested from the server
  const [limit, setLimit] = useState(5)
  //resultNum is the number of results returned by the server
  const [resultNum, setResultNum] = useState(0)
  //0 -> Regular    1->Featured

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
    getUsers()
  }, [limit, offset, sort, reloadFlag])

  useEffect(() => {
    const pageNum = Math.floor(offset / limit) + 1
    setCurrentPage(pageNum)
  }, [limit])

  //   useEffect(() => {
  //     console.log(users)
  //   }, [users])

  useEffect(() => {
    const newOffset = (currentPage - 1) * limit

    setOffset(newOffset)
  }, [currentPage])

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

  function handleActionClick(userId, actionCode, modalMessage = '') {
    setModalMessage(modalMessage)
    setUserId(userId)
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
      user_id: userId,
      action: actionCode,
      language,
    }
    changeUserStatusAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        setReloadFlag((prevState) => !prevState)
      }
    })
  }

  function getUsers() {
    const reqObject = {
      language,
      limit,
      offset,
      search_params: filters,
      sorting_field: sort.field,
      sorting_order: sort.order,
    }
    getUsersAPI(reqObject, accessToken).then((res) => {
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
    getUsers()
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
      type={constants['TABLE_USER_LISTING']}
    />
    </>
   
  )
}
