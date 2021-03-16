import React, { useEffect, useState, useContext } from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'
import {
  changeArtistVerificationStatusAPI,
  getArtistRequestsAPI,
 
} from '../../api/api'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import { LanguageContext } from '../../context/LanguageContextProvider'
import DataTable from './DataTable'
import Filter from './RequestsFilter'
import RowDropdownMenu from './DropDownMenuPending'
import ARHeader from './ARHeader'
import './ArtistRequests.css'
import DisapproveModal from './DisapproveModal'
import RequestType from './Navigation'
import DEFAULTS from '../../utils/DEFAULTS'
import PageIndex from '../common/Pagination'
import ConfirmationPopup from '../common/ConfirmationPopup/ConfirmationPopup'
import constants from '../../utils/constants'
import { convertToUTCDateTime, convertToUTCDateTimeEndDate } from '../../utils/date-time'

export default function ArtistRequests({dropdownValues}) {
  const { accessToken } = useContext(AccessTokenContext)
  const { language } = useContext(LanguageContext)
  const history = useHistory()
  const [artistRequests, setArtistRequests] = useState([])
  const [totalEntries, setTotalEntries] = useState('')
  //Values to be used for dropmdown menu fields
  // const [dropdownValues, setDropdownValues] = useState(
  //   DEFAULTS['DROPDOWN_FIELDS_ARTIST_REQUESTS'],
  // )
  //Limit is the number of results requested from the server
  const [limit, setLimit] = useState(5)
  //resultNum is the number of results returned by the server
  const [resultNum, setResultNum] = useState(0)
  //0 -> Regular    1->Featured
  const [artistType, setArtistType] = useState(0)
  //0-> Pending  2->Disapprove  4->Rejected
  const [requestType, setRequestType] = useState(0)
  const [filters, setFilters] = useState({})
  const [isFilterVisible, toggleFilter] = useState(false)
  const [currentPage, setCurentPage] = useState(1)
  //Disapprove modal visibility
  const [disapproveModalShow, setDisapproveModalShow] = useState(false)

  //Confirmation popup visibility
  const [confirmationModalShow, setConfirmationModalShow] = useState(false)

  //Message to show in modal
  const [modalMessage, setModalMessage] = useState('')

  //artistId to perform actions on
  const [artistId, setArtistId] = useState('')

  //action to be performed
  const [actionCode, setActionCode] = useState('')

  //Field to be sorted on
  const [sort, setSort] = useState({
    field: 'user_id',
    order: 1,
  })
  //Count of each type of request
  const [requestCount, setRequestCount] = useState({
    pending: '',
    disapproved: '',
    rejected: '',
  })
  const [offset, setOffset] = useState((currentPage - 1) * limit)

  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname.split('/')[2] === 'disapproved') {
      setRequestType(constants['DISAPPROVE_ARTIST'])
    }
    if (pathname.split('/')[2] === 'rejected') {
      setRequestType(constants['REJECT_ARTIST'])
    }

    getArtistRequests()
  }, [limit, offset, artistType, requestType, sort])

  // useEffect(() => {
  //   getDropdownValuesAPI().then((res) => {
  //     if (res.success !== false) {
  //       setDropdownValues(res.data.data.fields_values)
  //     }
  //   })
  // }, [])

  useEffect(() => {
    const newOffset = (currentPage - 1) * limit
    console.log(newOffset)
    setOffset(newOffset)
  }, [currentPage])

  // useEffect(() => {
  //   console.log(artistId, modalMessage, actionCode)
  // }, [confirmationModalShow])

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



  //-------Get requests----------
  function getArtistRequests(searchParams = filters) {

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

    const reqBody = {
      language,
      limit,
      offset,
      request_type: requestType,
      artist_type: artistType,
      search_params: filtersObj,
      sorting_field: sort.field,
      sorting_order: sort.order,
    }
  
    getArtistRequestsAPI(reqBody,accessToken)
      .then((res) => {
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

  function handleActionClick(artistId, actionCode, modalMessage = '') {
    setModalMessage(modalMessage)
    setArtistId(artistId)
    setActionCode(actionCode)
    if (actionCode === constants['DISAPPROVE_ARTIST'])
      setDisapproveModalShow(true)
    else setConfirmationModalShow(true)
  }

  function performAction(rejectionReason = '') {
    const reqObj = {
      user_id: artistId,
      action: actionCode,
      rejection_reason: rejectionReason,
      language
    }
    changeArtistVerificationStatusAPI(
      reqObj,
      accessToken
    ).then((res) => {
      if (res.success !== false) {
        console.log(res.data)
        history.push('/temp')
        history.goBack()
      }
    })
    setArtistId('')
    setConfirmationModalShow(false)
    setModalMessage('')
    setActionCode('')
  }

  function handleSortChange(newSortField) {
    console.log('handling sort change')
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

  function handlePopupClose() {
    setArtistId('')
    setConfirmationModalShow(false)
    setModalMessage('')
    setActionCode('')
  }

  function handleDisapproveModalClose() {
    setDisapproveModalShow(false)
    setArtistId('')
  }

  return (
    <div className="container-fluid">
      <div className="artist-request parent-div mt-4">
        <ARHeader
          totalEntries={totalEntries}
          toggleFilter={toggleFilter}
          limit={limit}
          isFilterVisible={isFilterVisible}
          setLimit={setLimit}
          artistType={artistType}
          setArtistType={setArtistType}
          resultNum={resultNum}
          offset={offset}
        />
        {isFilterVisible ? (
          <Filter
            dropdownValues={dropdownValues}
            filters={filters}
            handleChange={handleFiltersChange}
            handleSubmit={handleFilterSubmit}
            setFilters={setFilters}
          />
        ) : (
          ''
        )}
        <RequestType
          requestType={requestType}
          setRequestType={setRequestType}
          requestCount={requestCount}
        />
        <Route path={['/pending', '/']}>
          <DataTable
            dropdownMenu={RowDropdownMenu}
            requests={artistRequests}
            handleSortChange={handleSortChange}
            sortField={sort.field}
            sortOrder={sort.order}
            handleActionClick={handleActionClick}
            requestType={requestType}
          />
        </Route>

        <PageIndex
          currentPage={currentPage}
          setCurrentPage={setCurentPage}
          limit={limit}
          totalCount={totalEntries}
        />
        <DisapproveModal
          modalShow={disapproveModalShow}
          handleClose={handleDisapproveModalClose}
          performAction={performAction}
        />
        <ConfirmationPopup
          modalShow={confirmationModalShow}
          setModalShow={setConfirmationModalShow}
          performAction={performAction}
          setUserId={setArtistId}
          setModalMessage={setModalMessage}
          modalMessage={modalMessage}
          setActionCode={setActionCode}
          handleClose={handlePopupClose}
        />
      </div>
    </div>
  )
}

// Get artist requests and set state accordingly
