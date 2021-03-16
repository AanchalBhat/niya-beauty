import ArtistProfileView from './ArtistProfileView'
import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import ConfirmationPopup from '../common/ConfirmationPopup/ConfirmationPopup'
import constants from '../../utils/constants'
import {
  changeArtistVerificationStatusAPI,
  changeUserStatusAPI,
  getArtistProfileAPI,
  updateArtistAPI,
} from '../../api/api'
import { FormattedMessage } from 'react-intl'

//Artist Management Artist Profile Page
export default function AMArtistProfile() {
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const { artistId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [fullName, setFullName] = useState('')
  const [disapproveModalShow, setDisapproveModalShow] = useState(false)
  //
  const [artistProfileData, setArtistProfileData] = useState({
    packages: [],
    media: [],
    rejection_reason: [],
    email_verified: false,
    phone_verified: false,
    is_verified: false,
    exp_in_years: '',
    licences: [],
    specialities: [],
    preferred_age_group: [],
    gender_preference: [],
    client_exp_preference: [],
    brands_worked_with: [],
    race_specialization: [],
    training_name: '',
  })

  const [otherProfileData, setOtherProfileData] = useState({
    packages: [],
    education: [],
    media: [],
    rejection_reason: [],
    training_certificate: [],
    followers: '',
    booking_status: {},
  })
  const [beautyProfileArray, setBeautyProfileArray] = useState([])
  const [confirmationModalShow, setConfirmationModalShow] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [actionCode, setActionCode] = useState('')

  useEffect(() => {
    getArtistProfile()
  }, [])

  useEffect(() => {
    if (isLoading === false) {
      const beautyProfileDataArray = [
        {
          index: '01',
          msg: <FormattedMessage id="ques.artist.experienceInYears" />,
          val: constants[otherProfileData.exp_in_years[0]],
          answered: otherProfileData.exp_in_years.length > 0,
        },
        {
          index: '02',
          msg: <FormattedMessage id="ques.artist.training" />,
          val: otherProfileData.training_name
            ? otherProfileData.training_name
            : '',
          answered: otherProfileData.training_name,
        },
        {
          index: '03',
          msg: <FormattedMessage id="ques.artist.idealClientAge" />,
          val: constants[otherProfileData.preferred_age_group[0]],
          answered: otherProfileData.preferred_age_group.length > 0,
        },
        {
          index: '04',
          msg: <FormattedMessage id="Share your work" />,
          val: '',
          answered: false,
        },
        {
          index: '05',
          msg: <FormattedMessage id="ques.artist.specialities" />,
          val: constants[otherProfileData.specialities[0]],
          answered: otherProfileData.specialities.length > 0,
        },

        {
          index: '06',
          msg: <FormattedMessage id="ques.artist.brandPreference" />,
          val: constants[otherProfileData.brands_worked_with[0]],
          answered: otherProfileData.brands_worked_with.length > 0,
        },
        {
          index: '07',
          msg: <FormattedMessage id="ques.artist.clientExpPreference" />,
          val: constants[otherProfileData.client_exp_preference[0]],
          answered: otherProfileData.client_exp_preference.length > 0,
        },
        {
          index: '08',
          msg: <FormattedMessage id="ques.artist.genderPreference" />,
          val: constants[otherProfileData.gender_preference[0]],
          answered: otherProfileData.gender_preference.length > 0,
        },
        {
          index: '09',
          msg: <FormattedMessage id="ques.artist.raceSpecialization" />,
          val: constants[otherProfileData.race_specialization[0]],
          answered: otherProfileData.race_specialization.length > 0,
        },
      ]

      setBeautyProfileArray(beautyProfileDataArray)
    }
  }, [isLoading])

  function handleChange(e) {
    const { name, value } = e.target

    if (['company_name', 'start_date', 'end_date'].includes(name)) {
      let edu = [...artistProfileData.education]
      const index = e.target.dataset.id
      edu[index][name] = value
      setArtistProfileData((prevState) => {
        return {
          ...prevState,
          education: edu,
        }
      })
    } else {
      setArtistProfileData((prevState) => ({
        ...prevState,
        [name]: value,
      }))
    }
  }

  //Reset changed education to original before changing
  function handleEducationReset(index, educationBackup) {
    console.log(educationBackup, 'backup state received')
    let edu = [...artistProfileData.education]
    edu[index] = educationBackup[index]
    setArtistProfileData((prevState) => {
      return {
        ...prevState,
        education: edu,
      }
    })
  }
  //Add education
  function addEducation(e) {
    e.preventDefault()
    setArtistProfileData((prevState) => {
      return {
        ...prevState,
        education: [
          ...prevState.education,
          {
            company_name: '',
            from_date: '',
            to_date: '',
          },
        ],
      }
    })
  }

  //Remove Education
  function removeEducation(event) {
    let edu = [...artistProfileData.education]
    edu.splice(event.target.dataset.id, 1)
    setArtistProfileData((prevState) => {
      return {
        ...prevState,
        education: edu,
      }
    })
  }

  //Handle confirmation modal close
  function handlePopupClose() {
    setModalMessage('')
    setActionCode('')
    setConfirmationModalShow(false)
  }

  function handleDisapproveModalClose() {
    setDisapproveModalShow(false)
  }

  function performAction() {
    if (actionCode === constants['UPDATE_ARTIST']) {
      const updatedObj = {
        user_id: artistId,
        language,
      }
      Object.keys(artistProfileData).forEach((key) => {
        if (artistProfileData[key]) updatedObj[key] = artistProfileData[key]
      })
      //console.log(updatedObj)
      updateArtistAPI(updatedObj, accessToken).then((res) => {
        if (res.success !== false) {
          console.log(res.data.data)
        }
      })
    } else if (actionCode === constants['ENABLE_DISABLE_USER']) {
      console.log('Changing status')
      const reqObj = {
        user_id: artistId,
        language,
        action: otherProfileData.is_enabled
          ? constants['DISABLE_USER']
          : constants['ENABLE_USER'],
      }
      changeUserStatusAPI(reqObj, accessToken).then((res) => {
        if (res.success !== false) {
          //console.log(res.data.data)
          getArtistProfile()
        }
      })
    }
    setModalMessage('')
    setActionCode('')
  }

  function handleActionClick(actionCode, modalMessage = '') {
    setModalMessage(modalMessage)
    setActionCode(actionCode)
    if (actionCode === constants['DISAPPROVE_ARTIST'])
      setDisapproveModalShow(true)
    else setConfirmationModalShow(true)
  }

  function getArtistProfile() {
    const reqObj = {
      user_id: artistId,
      language,
    }
    getArtistProfileAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        const responseData = res.data.data
        const {
          personal_info: personalInfo,
          details,
          beauty_profile_data: beautyProfileData,
        } = responseData
        const fullName =
          (personalInfo.first_name ? personalInfo.first_name : '') +
          ' ' +
          (personalInfo.last_name ? personalInfo.last_name : '')
        setFullName(fullName)
        const artistProfile = {
          first_name: personalInfo.first_name,
          last_name: personalInfo.last_name,
          email: personalInfo.email,
          phone: personalInfo.phone,
          birth_date: details.birth_date
            ? details.birth_date.substring(0, 10)
            : details.birth_date,
          about: details.about,
          street_address: details.street_address,
          city: details.city,
          zipcode: details.zipcode,
          country: details.country,
          education: details.education,
          facebook_link: beautyProfileData.facebook_link,
          website_link: beautyProfileData.website_link,
          instagram_link: beautyProfileData.instagram_link,
          youtube_link: beautyProfileData.youtube_link,
          pinterest_link: beautyProfileData.pinterest_link,
          profile_image: personalInfo.profile_image,
          hourly_rate: details.hourly_rate,
        }

        const otherData = {
          packages: responseData.packages,
          media: responseData.media,
          rejection_reason: responseData.rejection_reason,
          email_verified: personalInfo.email_verified,
          phone_verified: personalInfo.phone_verified,
          is_verified: personalInfo.is_verified,
          is_enabled: personalInfo.is_enabled,
          is_featured: personalInfo.is_featured,
          exp_in_years: beautyProfileData.exp_in_years,
          licences: beautyProfileData.licences,
          specialities: beautyProfileData.specialities,
          preferred_age_group: beautyProfileData.preferred_age_group,
          gender_preference: beautyProfileData.gender_preference,
          client_exp_preference: beautyProfileData.client_exp_preference,
          brands_worked_with: beautyProfileData.brands_worked_with,
          race_specialization: beautyProfileData.race_specialization,
          training_name: beautyProfileData.training_name,
          followers: responseData.followers,
          training_certificate: beautyProfileData.training_certificate,
          booking_status: responseData.booking_status,
          earnings: responseData.monthly_earning,
          wallet: personalInfo.wallet,
        }

        setArtistProfileData(artistProfile)
        setOtherProfileData(otherData)
        setIsLoading(false)
      }
    })
  }

  if (isLoading) return <div></div>
  else
    return (
      <>
        <ArtistProfileView
          artistProfileData={artistProfileData}
          otherProfileData={otherProfileData}
          handleChange={handleChange}
          isLoading={isLoading}
          handleEducationReset={handleEducationReset}
          addEducation={addEducation}
          removeEducation={removeEducation}
          artistId={artistId}
          beautyProfileArray={beautyProfileArray}
          fullName={fullName}
          handleActionClick={handleActionClick}
        />
        <ConfirmationPopup
          performAction={performAction}
          modalMessage={modalMessage}
          modalShow={confirmationModalShow}
          handleClose={handlePopupClose}
        />
      </>
    )
}
