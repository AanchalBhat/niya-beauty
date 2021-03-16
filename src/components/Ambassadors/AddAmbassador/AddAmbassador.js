import React, { useContext, useEffect, useState } from 'react'
import AddAmbassadorView from './AddAmbassadorView'
import './AddAmbassador.css'
import {convertToUTCDateTime,convertToUTCDateTimeEndDate} from '../../../utils/date-time'
import { LanguageContext } from '../../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../../context/AccessTokenProvider'
import { addAmbassadorAPI } from '../../../api/api'
import { useHistory } from 'react-router-dom'

export default function AddAmbassador() {
  const history = useHistory()
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const [error, setError] = useState({
    allFieldsNotProvided: false,
    email: false,
    phone: false,
  })

  const defaultState = {
    language,
    name: '',
    email: '',
    country_code: '',
    phone: '',
    started_on: '',
    expiry_on: '',
    profit_percentage: '',
    is_forever: false,
  }
  const [ambassadorDetails, setAmbassadorDetails] = useState(defaultState)

  useEffect(() => {
    console.log(ambassadorDetails)
  }, [ambassadorDetails])

  function handleDetailsChange(e) {
    const { name, value } = e.target
    if (name === 'is_forever') {
      setAmbassadorDetails((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
      }))
    } else {
      setAmbassadorDetails((prevState) => ({ ...prevState, [name]: value }))
    }

    if (name === 'email') {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (emailRegex.test(ambassadorDetails.email)) {
        setError((prevState) => ({ ...prevState, email: false }))
      }
    }
  }

  function handlePhoneChange(value, country) {
    const dialCode = country.dialCode
    let phoneNum
    if (dialCode) phoneNum = value.substring(dialCode.length)
    else phoneNum = value

    setAmbassadorDetails((prevState) => ({
      ...prevState,
      phone: phoneNum,
      country_code: dialCode,
    }))

    if (
      !(
        ambassadorDetails.phone.length < 6 ||
        ambassadorDetails.phone.length > 14
      )
    ) {
      setError((prevState) => ({ ...prevState, phone: false }))
    }
  }

  function emailValidation() {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailRegex.test(ambassadorDetails.email)) {
      setError((prevState) => ({ ...prevState, email: true }))
    } else {
      setError((prevState) => ({ ...prevState, email: false }))
    }
  }

  function phoneValidation() {
    if (
      ambassadorDetails.phone.length < 6 ||
      ambassadorDetails.phone.length > 14
    ) {
      setError((prevState) => ({ ...prevState, phone: true }))
    } else {
      setError((prevState) => ({ ...prevState, phone: false }))
    }
  }

  function runValidations() {
    for (let key of Object.keys(ambassadorDetails)) {
      if (key !== 'is_forever' && key !== 'expiry_on') {
        if (!ambassadorDetails[key]) {
          setError((prevState) => ({
            ...prevState,
            allFieldsNotProvided: true,
          }))
          return false
        }
      }
      if (key === 'expiry_on') {
        if (!ambassadorDetails[key]) {
          if (!ambassadorDetails['is_forever']) {
            setError((prevState) => ({
              ...prevState,
              allFieldsNotProvided: true,
            }))
            return false
          }
        }
      }
    }
    return true
  }

  function handleAddClick(e) {
    e.preventDefault()
    const result = runValidations()
    if (result) {
      setError((prevState) => ({ ...prevState, allFieldsNotProvided: false }))
      if (!error.phone && !error.email) {
        addAmbassador()
      }
    }
  }

  function addAmbassador() {
    let reqObj = {}
    for (let key of Object.keys(ambassadorDetails)) {
      if (ambassadorDetails[key]) {
        if (key == 'started_on') {
          reqObj[key] = convertToUTCDateTime(ambassadorDetails[key])
        } else if( key == 'sign_up_date_end'){ 
          reqObj[key] = convertToUTCDateTimeEndDate(ambassadorDetails[key])
        }else {
          reqObj[key] = ambassadorDetails[key]
        }
      }
    }
    if (reqObj['expiry_on'] && reqObj['is_forever']) {
      delete reqObj.expiry_on
    }
    if (reqObj['is_forever']) {
      reqObj['is_forever'] = 1
    }

    addAmbassadorAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        console.log(res.data.data)
        history.push('/ambassadors')
      }
    })
  }

  return (
    <AddAmbassadorView
      ambassadorDetails={ambassadorDetails}
      handleChange={handleDetailsChange}
      handleAdd={handleAddClick}
      handlePhoneChange={handlePhoneChange}
      error={error}
      phoneValidation={phoneValidation}
      emailValidation={emailValidation}
    />
  )
}
