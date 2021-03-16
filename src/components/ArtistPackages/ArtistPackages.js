import React, { useContext, useEffect, useState } from 'react'
import './ArtistPackages.css'
import ArtistPackagesView from './ArtistPackagesView.'
import { useParams } from 'react-router-dom'
import { getArtistPackagesAPI, updatePackageAPI } from '../../api/api'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import ConfirmationPopup from '../common/ConfirmationPopup/ConfirmationPopup'
import { FormattedMessage } from 'react-intl'

export default function ArtistPackages(props) {
  const { availableServices } = props
  const { artistId } = useParams()
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const [originalState, setOriginalState] = useState([])
  const [packages, setPackages] = useState([])
  const [errors, setErrors] = useState([])
  const [confirmationModalShow, setConfirmationModalShow] = useState(false)
  const [confirmModalMessage, setConfirmModalMessage] = useState('')
  const [packageIndex, setPackageIndex] = useState('')
 const [loader,setLoader] = useState(false)
  useEffect(() => {
    getPackagesData()
  }, [])

  useEffect(() => {
    console.log(errors)
  }, [errors])

  useEffect(() => {
    console.log(originalState)
  }, [packages])

  async function getPackagesData() {
    const reqParams = { artist_id: artistId, language }
    const response = await getArtistPackagesAPI(reqParams, accessToken)
    if (response.success !== false) {
      console.log(response.data.data)
      const packageData = response.data.data.packages

      const packagesCopy = packageData.map((packageItem) => ({
        ...packageItem,
        service_ids: [...packageItem.service_ids],
      }))


      setOriginalState(packagesCopy)
      setPackages(packageData)
      setErrors(
        packageData.map((packageItem) => ({
          price: false,
          message: 'blank',
          error: false,
        })),
      )
    }
  }

  function handleServiceToggle(packageIndex, id) {
    console.log(packageIndex, id)
    const serviceId = id.toString()

    setPackages((prevPackagesState) => {
      let packagesCopy = [...prevPackagesState]
      let services = packagesCopy[packageIndex]['service_ids']

      if (services.includes(serviceId)) {
        console.log('Present')
        const index = services.indexOf(serviceId)
        services.splice(index, 1)
      } else {
        services.push(serviceId)
      }

      return packagesCopy
    })
  }

  function handleChange(event, packageIndex) {
    const { name, value } = event.target
    if (name === 'is_enabled') {
      setPackages((prevState) => {
        let packagesCopy = [...prevState]
        let isEnabled = packagesCopy[packageIndex]['is_enabled']
        if (isEnabled === 1) {
          isEnabled = 0
        } else {
          isEnabled = 1
        }
        packagesCopy[packageIndex]['is_enabled'] = isEnabled
        return packagesCopy
      })
    } else {
      setPackages((prevState) => {
        let packagesCopy = [...prevState]
        packagesCopy[packageIndex][name] = value
        let isNum = /^([1-9]\d*)(\.\d+)?$/gm.test(value)
        if (!isNum) {
          setErrors((prevState) => {
            let errorsCopy = [...prevState]
            errorsCopy[packageIndex] = {
              price: true,
              message: 'error.invalidPrice',
              error: true,
            }
            return errorsCopy
          })
        } else {
          if (parseInt(value) > 0) {
            setErrors((prevState) => {
              let errorsCopy = [...prevState]
              errorsCopy[packageIndex] = {
                price: false,
                message: 'blank',
                error: false,
              }
              return errorsCopy
            })
          } else {
            setErrors((prevState) => {
              let errorsCopy = [...prevState]
              errorsCopy[packageIndex] = {
                price: true,
                message: 'error.invalidPrice',
                error: true,
              }
              return errorsCopy
            })
          }
        }
        return packagesCopy
      })
    }
  }

  async function updatePackageData() {
   setLoader(true)
    if (packageIndex !== '') {
      if (!errors[packageIndex].error) {
        //Check the changes made
        let serviceChange = []
        const originalServicesState = originalState[packageIndex]['service_ids']
        const newServicesState = packages[packageIndex]['service_ids']
        
        //Check services disabled
        originalServicesState.forEach((service) => {
          if (!newServicesState.includes(service)) {
            serviceChange.push({
              service_id: service,
              is_enabled: 0,
            })
          }
        })
        //Check services enabled
        newServicesState.forEach((service) => {
          if (!originalServicesState.includes(service)) {
            serviceChange.push({
              service_id: service,
              is_enabled: 1,
            })
          }
        })

        console.log(serviceChange)
        let reqObj = {
          package_id: packages[packageIndex].package_id,
          package_data: {
            is_enabled: packages[packageIndex].is_enabled,
            price: packages[packageIndex].price,
          },
          language,
        }
        if (serviceChange.length) reqObj['service_data'] = serviceChange
        console.log(reqObj)
        //send update request
        const res = await updatePackageAPI(reqObj, accessToken)
        setLoader(false)
        if (res.success !== false) {
          console.log(res.data.data)
        }
        
      } else {
 
      }
    }
  }

  function handleSaveClick(packageIndex) {
    setLoader(false)
    setPackageIndex(packageIndex)
    handleConfirmModalShow()
  }

  function performAction() {
   
    updatePackageData()
  }

  function handleConfirmModalClose() {
    setPackageIndex('')
    setConfirmationModalShow(false)
  }

  function handleConfirmModalShow() {
    setConfirmModalMessage(
      <FormattedMessage
        id="confirm.update"
        defaultMessage="Are you sure you want to update?"
      />,
    )
    setConfirmationModalShow(true)
  }

  return (
    <>
      <ArtistPackagesView
        packages={packages}
        availableServices={availableServices}
        handleServiceToggle={handleServiceToggle}
        handleChange={handleChange}
        loader = {loader}
        handleSave={handleSaveClick}
        errors={errors}
        artistId={artistId}
      />
      <ConfirmationPopup
        modalShow={confirmationModalShow}
        handleClose={handleConfirmModalClose}
        modalMessage={confirmModalMessage}
        performAction={performAction}
      />
    </>
  )
}
