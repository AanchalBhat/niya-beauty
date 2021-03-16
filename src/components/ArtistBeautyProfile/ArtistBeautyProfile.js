import React, { useEffect, useState, useContext } from 'react'
import ArtistBeautyProfileView from './ArtistBeautyProfileView'
import ConfirmationPop from '../common/ConfirmationPopup/ConfirmationPopup'
import { useParams } from 'react-router-dom'
import {
  getArtistProfileAPI,
  getBrandsAPI,
  updateArtistAPI,
} from '../../api/api'
import constants from '../../utils/constants'
import { LanguageContext } from '../../context/LanguageContextProvider'
import AlertPopup from '../common/AlertPopup/AlertPopup'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import BrandsPopup from '../BrandsPopup/BrandsPopup'

export default function ArtistBeautyProfile() {
  const [totalCount, setTotalCount] = useState(0)
  const { artistId } = useParams()
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const [modalShow, setModalShow] = useState(false)
  const [alertShow, setAlertShow] = useState(false)
  const [brandsPopupVisible, setBrandsPopupVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState(
    'Please provide complete training data',
  )
  const [fieldsToUpdate, setFieldsToUpdate] = useState([])
  const [modalMessage, setModalMessage] = useState('')
  const [beautyProfileData, setBeautyProfileData] = useState({
    exp_in_years: [],
    specialities: [],
    race_specialization: [],
    client_exp_preference: [],
    brands_worked_with: [],
    preferred_age_group: [],
    licences: [],
    gender_preference: [],
    training_name: '',
    training_date: '',
    training_location: '',
    website_link: '',
    facebook_link: '',
    instagram_link: '',
    youtube_link: '',
    pinterest_link: '',
    brand_list: [],
  })
  const [isBeingEdited, setIsBeingEdited] = useState({
    [constants['FACEBOOK_LINK']]: false,
    [constants['PINTEREST_LINK']]: false,
    [constants['YOUTUBE_LINK']]: false,
    [constants['INSTAGRAM_LINK']]: false,
  })
  // State for add brands popup

  const [brands, setBrands] = useState([])
  const [brandsLoading, setBrandsLoading] = useState(false)
  const [brandsSearchText, setBrandsSearchText] = useState('')
  const [loader,setLoader] = useState(false)
  const BRANDS_LIMIT = 21
  const [brandsReq, setBrandsReq] = useState({
    offset: 0,
    search: '',
  })
  const [brandsBackup, setBrandsBackup] = useState([])
  const [brandsUpdating, setBrandsUpdating] = useState(false)

  useEffect(() => {
    console.log(brandsReq)
    getBrands()
  }, [brandsReq])

  useEffect(() => {
    console.log(brands)
  }, [brands])

  useEffect(() => {
    getArtist()
  }, [])

  useEffect(() => {
    if (!brandsSearchText) {
      setBrandsReq({
        offset: 0,
        search: brandsSearchText,
      })
    }
  },[brandsSearchText])


  function getArtist() {
    const reqObj = {
      user_id: artistId,
      language,
    }
    getArtistProfileAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        const responseData = res.data.data
        const { beauty_profile_data: beautyProfileData } = responseData
        setBeautyProfileData(beautyProfileData)
      }
    })
  }

  function getBrands() {
    setBrandsLoading(true)
    const reqObj = {
      language,
      limit: BRANDS_LIMIT,
      offset: brandsReq.offset,
      search_text: brandsSearchText,
    }

    getBrandsAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        const responseData = res.data.data
        const { suggestions, total_count } = responseData
        if (brandsReq.offset === 0) {
          setTotalCount(total_count)
        }
        if (brandsReq.offset > 0) {
          setBrands((prevState) => [...prevState, ...suggestions])
        } else {
          setBrands(suggestions)
        }
        setBrandsLoading(false)
      }
    })
  }

  function setIsBeingEditedTrue(e) {
    const { name } = e.target
    setIsBeingEdited((prevState) => ({
      ...prevState,
      [name]: true,
    }))
  }

  function setIsBeingEditedFalse(e) {
    const { name } = e.target.dataset
    console.log(name)
    setIsBeingEdited((prevState) => ({
      ...prevState,
      [name]: false,
    }))
  }

  function toggleSelect(e) {
    const {
      propertyname: propertyName,
      propertyval: propertyVal,
    } = e.target.dataset
    console.log(propertyName, propertyVal)
    if (propertyName && propertyVal) {
      if (
        propertyName === 'exp_in_years' ||
        propertyName === 'client_exp_preference'
      ) {
        setBeautyProfileData((prevState) => ({
          ...prevState,
          [propertyName]: [propertyVal],
        }))
      } else if (propertyName === 'gender_preference') {
        if (propertyVal === constants['GENDER_PREF_ALL']) {
          let index
          let copy = [...beautyProfileData[propertyName]]
          if (beautyProfileData[propertyName].includes(propertyVal)) {
            console.log('Present')
            index = beautyProfileData[propertyName].indexOf(propertyVal)
            copy.splice(index, 1)
            setBeautyProfileData((prevState) => ({
              ...prevState,
              [propertyName]: copy,
            }))
          } else {
            setBeautyProfileData((prevState) => ({
              ...prevState,
              [propertyName]: [propertyVal],
            }))
          }
        } else {
          let index
          let copy = [...beautyProfileData[propertyName]]
          if (
            beautyProfileData[propertyName].includes(
              constants['GENDER_PREF_ALL'],
            )
          ) {
            index = beautyProfileData[propertyName].indexOf(
              constants['GENDER_PREF_ALL'],
            )
            copy.splice(index, 1)
          }

          if (beautyProfileData[propertyName].includes(propertyVal)) {
            index = beautyProfileData[propertyName].indexOf(propertyVal)
            copy.splice(index, 1)
          } else {
            copy.push(propertyVal)
          }
          setBeautyProfileData((prevState) => ({
            ...prevState,
            [propertyName]: copy,
          }))
        }
      } else {
        let index
        let copy = [...beautyProfileData[propertyName]]
        if (beautyProfileData[propertyName].includes(propertyVal)) {
          index = beautyProfileData[propertyName].indexOf(propertyVal)
          copy.splice(index, 1)
        } else {
          copy.push(propertyVal)
        }
        setBeautyProfileData((prevState) => ({
          ...prevState,
          [propertyName]: copy,
        }))
      }
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setBeautyProfileData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  function handleSave(fields) {
    setLoader(false)
    console.log('fields',fields)
    setFieldsToUpdate(fields)
  }
 
  function showModal(message) {
    setModalMessage(message)
    setModalShow(true)
  }

  function handleModalClose() {
    setModalShow(false)
  }

  function showAlert() {
    setAlertShow(true)
  }
  function handleAlertClose() {
    setAlertShow(false)
  }

  function runValidations() {
    console.log('running ')
    if (
      fieldsToUpdate.includes('training_name') ||
      fieldsToUpdate.includes('training_location') ||
      fieldsToUpdate.includes('training_date')
    ) {
      console.log('Present')
      if (
        !(
          (beautyProfileData['training_name'] &&
            beautyProfileData['training_location'] &&
            beautyProfileData['training_date']) ||
          (!beautyProfileData['training_name'] &&
            !beautyProfileData['training_location'] &&
            !beautyProfileData['training_date'])
        )
      ) {
        console.log('True')
        showAlert()
        return false
      } else {
        console.log('False')
        return true
      }
    }
  }
const [updatedData,setData]= useState({})
  //Update data
  function performAction(e) {
     setLoader(true)
    let accumulator = {}

    const updatedObj = fieldsToUpdate.reduce((acc, curr) => {
      if (
        curr !== constants['TRAINING_NAME'] &&
        curr !== constants['TRAINING_DATE'] &&
        curr !== constants['TRAINING_LOCATION'] &&
        curr !== constants['WEBSITE_LINK'] &&
        curr !== constants['INSTAGRAM_LINK'] &&
        curr !== constants['PINTEREST_LINK'] &&
        curr !== constants['YOUTUBE_LINK'] &&
        curr !== constants['FACEBOOK_LINK']
      ) {
        acc[curr] = beautyProfileData[curr].join(',')
      } else {
        acc[curr] = beautyProfileData[curr]
      }
      return acc
    }, accumulator)
 setData({updatedObj})
    console.log('dta',updatedObj)
    let reqObj = { user_id: artistId, language }
    Object.keys(updatedObj).forEach((key) => {
      if (updatedObj[key]) {
        reqObj[key] = updatedObj[key]
      }
    })
    updateArtistAPI(reqObj, accessToken).then((res) => {
      setLoader(false)
      if (res.success !== false) {
        console.log('hey',res.data)
      }
    })
  }

  function handleBrandsClose() {
    setBrandsPopupVisible(false)
    setBeautyProfileData((prevState) => ({
      ...prevState,
      brand_list: brandsBackup,
    }))
  }

  function handleBrandsShow() {
    console.log('Show')
    setBrandsPopupVisible(true)
    setBrandsBackup(beautyProfileData.brand_list)
  }

  //Load data if scrolled to bottom
  function handleScroll(e) {
    console.log(totalCount)
    if (brandsReq.offset + BRANDS_LIMIT < totalCount) {
      if (!brandsLoading) {
        const { target } = e
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
          setBrandsLoading(true)
          // setBrandsOffset((prevState) => prevState + BRANDS_LIMIT)
          setBrandsReq((prevState) => ({
            ...prevState,
            offset: prevState.offset + BRANDS_LIMIT,
          }))
        }
      }
    }
  }

  //Update brands in db
  function handleAddBrands() {
    setBrandsBackup(beautyProfileData.brand_list)
    let brands = ''
    brands = beautyProfileData.brand_list.map((ele) => ele.id).join(',')
    const reqObj = {
      brand_list: brands,
      user_id: artistId,
      language,
    }
    setBrandsUpdating(true)
    updateArtistAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        setBrandsUpdating(false)
        console.log(res.data.data)
      } else {
        setBrandsUpdating(false)
      }
    })
  }

  function addToOwnedBrands(brand) {
    const brandToBeAdded = { ...brand }
    setBeautyProfileData((prevState) => ({
      ...prevState,
      brand_list: [...prevState.brand_list, brandToBeAdded],
    }))
  }

  function removeFromOwnedBrands(brandId) {
    const index = beautyProfileData.brand_list.findIndex(
      (ele) => ele.id === brandId,
    )
    let newBrandsOwnedList = [...beautyProfileData.brand_list]
    console.log(index)
    newBrandsOwnedList.splice(index, 1)
    setBeautyProfileData((prevState) => ({
      ...prevState,
      brand_list: newBrandsOwnedList,
    }))
  }

  function handleSearchTextChange(e) {
    e.preventDefault()
    const { value } = e.target
    setBrandsSearchText(value)
  }

  function handleBrandsSearch(e) {
    if (e.keyCode === 13) {
      setBrandsReq({
        offset: 0,
        search: brandsSearchText,
      })
    }
  }

  function handleSearchClick() {
    setBrandsReq({
      offset: 0,
      search: brandsSearchText,
    })
  }

  return (
    <React.Fragment>
      <ArtistBeautyProfileView
        data={beautyProfileData}
        toggleSelect={toggleSelect}
        handleSave={handleSave}
        loader= {loader}
        showModal={showModal}
        handleChange={handleChange}
        runValidations={runValidations}
        isBeingEdited={isBeingEdited}
        setIsBeingEditedFalse={setIsBeingEditedFalse}
        setIsBeingEditedTrue={setIsBeingEditedTrue}
        handleBrandsShow={handleBrandsShow}
        artistId={artistId}
        fieldsToUpdate={fieldsToUpdate}
      />
      <ConfirmationPop
        modalShow={modalShow}
        performAction={performAction}
        handleClose={handleModalClose}
        modalMessage={modalMessage}
      />
      <AlertPopup
        handleClose={handleAlertClose}
        modalMessage={alertMessage}
        modalShow={alertShow}
      />
      <BrandsPopup
        handleClose={handleBrandsClose}
        show={brandsPopupVisible}
        ownedBrands={beautyProfileData.brand_list}
        brands={brands}
        handleScroll={handleScroll}
        brandsLoading={brandsLoading}
        offset={brandsReq.offset}
        addToOwnedBrands={addToOwnedBrands}
        removeFromOwnedBrands={removeFromOwnedBrands}
        handleAddBrands={handleAddBrands}
        handleSearchTextChange={handleSearchTextChange}
        handleBrandsSearch={handleBrandsSearch}
        brandsUpdating={brandsUpdating}
        handleSearchClick={handleSearchClick}
      />
    </React.Fragment>
  )
}
