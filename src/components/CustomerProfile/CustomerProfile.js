import React, { useEffect, useState, useContext } from 'react'
import CustomerProfileView from './CustomerProfileView'
import {
  changeUserStatusAPI,
  getCustomerProfileAPI,
  updateCustomerProfileAPI,
} from '../../api/api'
import { useParams } from 'react-router-dom'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import ConfirmationPopup from '../common/ConfirmationPopup/ConfirmationPopup'
import './CustomerProfile.css'
import constants from '../../utils/constants'
import clientIntlCodes from '../../utils/ClientCodeMappingsForLang'

export default function CustomerProfile() {
  const { customerId } = useParams()
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const [isLoading, setIsLoading] = useState(true)

  //profileData data which can be updated from the profile page
  const [profileData, setProfileData] = useState({})
  //nonUpdatableProfileData data  which cannot be updated from the profile page
  const [nonUpdatableProfileData, setNonUpdatableProfileData] = useState({
    bookingStatus: {},
  })

  const [confirmationModalShow, setConfirmationModalShow] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [actionCode, setActionCode] = useState('')
  const [beautyProfileData, setBeautyProfileData] = useState([])

  useEffect(() => {
    getCustomerProfile()
  }, [])

  useEffect(() => {
    if (isLoading === false) {
      const { beautyProfileData } = nonUpdatableProfileData
      console.log(beautyProfileData)
      const beautyData = [
        {
          index: '01',
          ques: 'ques.client.ageGroup',
          ans: beautyProfileData.age_group
            ? clientIntlCodes[beautyProfileData.age_group.split(',')[0]]
            : 'blank',
        },
        {
          index: '02',
          ques: 'ques.client.comfortWithMakeup',
          ans: beautyProfileData.comfort_with_makeup
            ? clientIntlCodes[
                beautyProfileData.comfort_with_makeup.split(',')[0]
              ]
            : 'blank',
        },
        {
          index: '03',
          ques: 'ques.client.numBeautyProducts',
          ans: beautyProfileData.number_of_beauty_products
            ? clientIntlCodes[
                beautyProfileData.number_of_beauty_products.split(',')[0]
              ]
            : 'blank',
        },
        {
          index: '04',
          ques: 'ques.client.typicalMakeup',
          ans: beautyProfileData.typical_makeup
            ? clientIntlCodes[beautyProfileData.typical_makeup.split(',')[0]]
            : 'blank',
        },
        {
          index: '05',
          ques: 'ques.client.brandPreference',
          ans: beautyProfileData.brand_preference
            ? clientIntlCodes[beautyProfileData.brand_preference.split(',')[0]]
            : 'blank',
        },
        {
          index: '06',
          ques: 'ques.client.gender',

          ans: beautyProfileData.gender
            ? clientIntlCodes[beautyProfileData.gender.split(',')[0]]
            : 'blank',
        },
        {
          index: '07',
          ques: 'ques.client.race',
          ans:'blank',
        },
        {
          index: '08',
          ques: 'ques.client.specialitiesInterested',
          ans: beautyProfileData.specialities_interested_in
            ? clientIntlCodes[
                beautyProfileData.specialities_interested_in.split(',')[0]
              ]
            : 'blank',
        },
        {
          index: '09',
          ques: 'ques.client.goalWithArtist',
          ans: beautyProfileData.goal_with_artist
            ? clientIntlCodes[beautyProfileData.goal_with_artist.split(',')[0]]
            : 'blank',
        },
        {
          index: '10',
          ques: 'ques.client.specificInfo',
          ans: 'blank',
        },
      ]
      setBeautyProfileData(beautyData)
    }
  }, [nonUpdatableProfileData])

  useEffect(() => {
    console.log(beautyProfileData)
  }, [beautyProfileData])

  //Get user's confirmation on action click
  function handleActionClick(actionCode, modalMessage = '') {
    setModalMessage(modalMessage)
    setActionCode(actionCode)
    setConfirmationModalShow(true)
  }

  function handleChange(e) {
    const { name, value } = e.target
    console.log(name, value)
    setProfileData((prevState) => ({ ...prevState, [name]: value }))
  }

  function handleConfirmationModalClose() {
    setConfirmationModalShow(false)
    setModalMessage('')
    setActionCode('')
  }

  function performAction() {
    if (actionCode === constants['UPDATE_USER']) {
      let reqObj = {
        language,
        user_id: customerId,
      }

      for (let key of Object.keys(profileData)) {
        if (profileData[key]) reqObj[key] = profileData[key]
      }

      updateCustomerProfileAPI(reqObj, accessToken).then((res) => {
        if (res.success !== false) {
          getCustomerProfile()
        }
      })
    } else if (actionCode === constants['SEND_PUSH_NOTIFICATION']) {
    } else {
      const reqObj = {
        language,
        user_id: customerId,
        action: actionCode,
      }
      changeUserStatusAPI(reqObj, accessToken).then((res) => {
        if (res.success !== false) {
          getCustomerProfile()
        }
      })
    }
  }

  //Get artist profile information
  function getCustomerProfile() {
    const reqObj = {
      user_id: customerId,
      language,
    }
    setIsLoading(true)
    getCustomerProfileAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        setIsLoading(false)
        const responseData = res.data.data
        const {
          personal_info,
          details,
          booking_status,
          activity,
        } = responseData

        const updatableData = {
          first_name: personal_info.first_name,
          last_name: personal_info.last_name,
          email: personal_info.email,
          phone: personal_info.phone,
        }

        const nonUpdatableData = {
          profilePicThumbail: personal_info.profile_image_thumbnail,
          profilePic: personal_info.profile_image,
          emailVerified: personal_info.email_verified,
          phoneVerified: personal_info.phone_verified,
          isEnabled: personal_info.is_enabled,
          bookingStatus: booking_status,
          beautyProfileData: details,
          activityDetails: activity,
        }
        setProfileData(updatableData)
        setNonUpdatableProfileData(nonUpdatableData)
      }
    })
  }

  return (
    <>
      <CustomerProfileView
        profileData={{
          ...profileData,
          profilePicThumbnail: nonUpdatableProfileData.profilePicThumbail,
          profilePic: nonUpdatableProfileData.profilePic,
          emailVerified: nonUpdatableProfileData.emailVerified,
          phoneVerified: nonUpdatableProfileData.phoneVerified,
          isEnabled: nonUpdatableProfileData.isEnabled,
        }}
        beautyProfileData={beautyProfileData}
        activityData={nonUpdatableProfileData.activityDetails}
        bookingStatusData={nonUpdatableProfileData.bookingStatus}
        handleActionClick={handleActionClick}
        handleChange={handleChange}
      />
      <ConfirmationPopup
        modalShow={confirmationModalShow}
        handleClose={handleConfirmationModalClose}
        performAction={performAction}
        modalMessage={modalMessage}
      />
    </>
  )
}
