import React, { useEffect, useState, useContext } from 'react'
import { Route, useLocation, useHistory } from 'react-router-dom'
import {
  changeArtistVerificationStatusAPI,
  getArtistRequestsAPI,
 
} from '../../api/api'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { ArtistRequestsContext } from '../../context/ArtistRequestsProvider'
import DataTable from './DataTable'
import Filter from './RequestsFilter'
import RowDropdownMenu from './DropDownMenuPending'
import ARHeader from './ARHeader'
import './ArtistRequests.css'
import DisapproveModal from './DisapproveModal'
import RequestType from './Navigation'
import DEFAULTS from '../../utils/DEFAULTS'
import Pagination from '../common/Pagination'
import ConfirmationPopup from '../common/ConfirmationPopup/ConfirmationPopup'
import constants from '../../utils/constants'
import { convertToUTCDateTime, convertToUTCDateTimeEndDate } from '../../utils/date-time'
import LoadingSpinner from '../common/LoadingSpinner/LoadingSpinner'
import Spinner from '../common/LoadingSpinner/LoadingSpinner'

export default function ArtistRequests({dropdownValues}) {
  const { accessToken } = useContext(AccessTokenContext)
  const { language } = useContext(LanguageContext)
  const {
    artistRequests,
    setRequestType,
    getArtistRequests,
    limit,
    loader,
    offset,
    artistType,
    requestType,
    sort,
    totalResults,
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
  } = useContext(ArtistRequestsContext)
  const history = useHistory()

  const [isFilterVisible, toggleFilter] = useState(false)
 
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
  const [disapproveRejectButtonText, setDisapproveRejectButtonText] = useState('disapprove')

  const { pathname } = useLocation()
  const [actionLoader,setActionLoader] = useState(false)

  useEffect(() => {
    if (pathname.split('/')[2] === 'disapproved') {
      setRequestType(constants['DISAPPROVE_ARTIST'])
    }
    if (pathname.split('/')[2] === 'rejected') {
      setRequestType(constants['REJECT_ARTIST'])
    }

    getArtistRequests()
  }, [limit, offset, artistType, requestType, sort])




  function handleActionClick(artistId, actionCode, modalMessage = '') {
   
    setModalMessage(modalMessage)
    setArtistId(artistId)
    setActionCode(actionCode)
    if (actionCode === constants['DISAPPROVE_ARTIST']) {
      setDisapproveRejectButtonText('disapprove')
      setDisapproveModalShow(true)
    }
    else if (actionCode === constants['REJECT_ARTIST']) {
      setDisapproveRejectButtonText('reject')
      setDisapproveModalShow(true)
    } 
    else setConfirmationModalShow(true)
  }

  function performAction(rejectionReason = '') {
    setActionLoader(true)
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
        setActionLoader(false)
        
        history.push('/temp')
        history.goBack()
      }
    })
    setArtistId('')
    setConfirmationModalShow(false)
    setModalMessage('')
    setActionCode('')
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
  const changeCurrentPage = (numPage) => {
    setCurrentPage(numPage);
  };
  return (
    <>
  
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

        <Pagination
            currentPage={currentPage}
            totalPages={totalResults}
            changeCurrentPage={changeCurrentPage}
            // theme="bottom-border"
          />
        <DisapproveModal
          modalShow={disapproveModalShow}
          handleClose={handleDisapproveModalClose}
          performAction={performAction}
          buttonText={disapproveRejectButtonText}
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
    {loader === true ||actionLoader === true ? <Spinner /> : null}
    </>  
  )
}

// Get artist requests and set state accordingly
