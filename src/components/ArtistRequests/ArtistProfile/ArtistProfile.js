import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import {
  changeArtistVerificationStatusAPI,
  getArtistProfileAPI,
  updateArtistAPI,
} from '../../../api/api'
import { LanguageContext } from '../../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../../context/AccessTokenProvider'
import AppointmentTimes from './AppointmentTimes'
import AppointmentTimesDaily from './AppointmentTimesDaily'
import ARProfileHeader from './ARProfileHeader'
import ArtistPackages from './PackageSection'
import ArtistPersonalInfo from './ArtistPersonalInfo'
import './ArtistProfile.css'
import BeautyProfileData from './BeautyProfileData'
import EducationDetails from './EducationDetails'
import Gallery from './GallerySection'
import SocialMedia from './SocialMedia'
import constants from '../../../utils/constants'
import ConfirmationPopup from '../../common/ConfirmationPopup/ConfirmationPopup'
import DisapproveModal from '../DisapproveModal'
import RejectionHistorySection from './RejectionHistorySection'
import CertificatesSection from '../../ArtistProfile/CertificatesSection'
import { FormattedMessage } from 'react-intl'

export default function ArtistProfile() {
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const history = useHistory()
  const { artistId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [fullName, setFullName] = useState('')
  const [disapproveModalShow, setDisapproveModalShow] = useState(false)
  const [artistProfileData, setArtistProfileData] = useState({
    packages: [],
    education: [],
    media: [],
    rejection_reason: [],
  })
  const [otherProfileData, setOtherProfileData] = useState({
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
    earnings: [],
    training_name: '',
    training_certificate : []
  })
  const [beautyProfileArray, setBeautyProfileArray] = useState([])
  const [confirmationModalShow, setConfirmationModalShow] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [actionCode, setActionCode] = useState('')
  const [disapproveButtonText, setDisapproveButtonText] = useState('disapprove')
  useEffect(() => {
    getArtistProfile(
      artistId,
      setArtistProfileData,
      setIsLoading,
      setOtherProfileData,
    )
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

  // useEffect(() => {
  //   console.log(actionCode)
  // }, [actionCode])

  useEffect(() => {
    console.log(artistProfileData)
  }, [artistProfileData])

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

  function performAction(rejectionReason = '') {
    if (actionCode === constants['UPDATE_ARTIST']) {
      const updatedObj = {
        user_id: artistId,
        language,
      }
      Object.keys(artistProfileData).forEach((key) => {
        if (artistProfileData[key]) updatedObj[key] = artistProfileData[key]
      })
      console.log(updatedObj)
      updateArtistAPI(updatedObj, accessToken).then((res) => {
        if (res.success !== false) {
          console.log(res.data.data)
        }
      })
    } else {
      const reqObj = {
        user_id: artistId,
        action: actionCode,
        rejection_reason: rejectionReason,
        language,
      }
      changeArtistVerificationStatusAPI(reqObj, accessToken).then((res) => {
        if (res.success !== false) {
         
          history.push('/temp')
          history.goBack()
        }
      })
    }

    setModalMessage('')
    setActionCode('')
  }

  function handleActionClick(actionCode, modalMessage = '') {
    
    setModalMessage(modalMessage)
    setActionCode(actionCode)
    if (actionCode === constants['DISAPPROVE_ARTIST']) {
      setDisapproveButtonText('disapprove')
      setDisapproveModalShow(true)
    } else if (actionCode === constants['REJECT_ARTIST']) {
      setDisapproveButtonText('reject')
      setDisapproveModalShow(true)
    }
    
    else setConfirmationModalShow(true)
  }

  function getArtistProfile(
    artistId,
    setArtistProfileData,
    setIsLoading,
    setOtherProfileData,
  ) {
    const reqObj = {
      user_id: artistId,
      language,
    }
    getArtistProfileAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        const responseData = res.data.data
        // console.log('Profile API', responseData)
        const {
          personal_info: personalInfo,
          details,
          beauty_profile_data: beautyProfileData,
        } = responseData
        const fullName = personalInfo.first_name
          ? personalInfo.first_name
          : '' + personalInfo.last_name
          ? personalInfo.last_name
          : ''
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
          exp_in_years: beautyProfileData.exp_in_years,
          licences: beautyProfileData.licences,
          specialities: beautyProfileData.specialities,
          preferred_age_group: beautyProfileData.preferred_age_group,
          gender_preference: beautyProfileData.gender_preference,
          client_exp_preference: beautyProfileData.client_exp_preference,
          brands_worked_with: beautyProfileData.brands_worked_with,
          race_specialization: beautyProfileData.race_specialization,
          training_name: beautyProfileData.training_name,
          training_certificate : beautyProfileData.training_certificate
        }

        setArtistProfileData(artistProfile)
        setOtherProfileData(otherData)
        setIsLoading(false)
      }
    })
  }

  return (
    <div className="container-fluid">
      <div className="artist-profile parent-div mt-4 ">
        <ARProfileHeader
          isVerified={otherProfileData.is_verified}
          handleActionClick={handleActionClick}
          handleClose={handlePopupClose}
        />
        {/* <!-- personal-Details --> */}
        <ArtistPersonalInfo
          profileData={artistProfileData}
          emailVerified={otherProfileData.email_verified}
          phoneVerified={otherProfileData.phone_verified}
          handleChange={handleChange}
          fullName={fullName}
        />

        {/* <!-- Education & Social Media --> */}
        <div className="row">
          <div className="col-md-9">
            <EducationDetails
              isLoading={isLoading}
              education={artistProfileData.education}
              handleChange={handleChange}
              handleEducationReset={handleEducationReset}
              addEducation={addEducation}
              removeEducation={removeEducation}
            />
          </div>

          <div className="col-md-3">
            <SocialMedia
              website={artistProfileData.website_link}
              fb={artistProfileData.facebook_link}
              instagram={artistProfileData.instagram_link}
              youtube={artistProfileData.youtube_link}
              pinterest={artistProfileData.pinterest_link}
              handleChange={handleChange}
            />
          </div>
        </div>
        <div className="row packages-parent">
          <div className="col-md-12">
            <ArtistPackages
              packages={otherProfileData.packages}
              hourlyRate={artistProfileData.hourly_rate}
              artistId={artistId}
            />
          </div>
        </div>

        <BeautyProfileData data={beautyProfileArray} artistId={artistId} />

        <Gallery media={otherProfileData.media} artistId={artistId} />
        <CertificatesSection
            certificates={otherProfileData.training_certificate}
            artistId={artistId}
          />
        <div className="row">
          <div className="col-md-12">
            <AppointmentTimesDaily />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-4">
            <AppointmentTimes />
          </div>
          <div className="col-md-8">
          {otherProfileData.rejection_reason.length ? (
            <RejectionHistorySection
              reasons={otherProfileData.rejection_reason}
            />
          ) : (
            ''
              )}
              </div>
        </div>

        <ConfirmationPopup
          modalShow={confirmationModalShow}
          setModalShow={setConfirmationModalShow}
          performAction={performAction}
          setModalMessage={setModalMessage}
          modalMessage={modalMessage}
          //setActionCode={setActionCode}
          handleClose={handlePopupClose}
        />
        <DisapproveModal
          modalShow={disapproveModalShow}
          handleClose={handleDisapproveModalClose}
          performAction={performAction}
          buttonText={disapproveButtonText}
        />
      </div>
    </div>
  )
}
