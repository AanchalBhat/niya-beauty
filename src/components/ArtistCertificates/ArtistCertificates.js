import React, { useEffect, useState, useRef, useContext } from 'react'
import ArtistCertificatesView from './ArtistCertificatesView'
import { useLocation, useParams } from 'react-router-dom'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import axios from 'axios'
import './ArtistCertificates.css'
import constants from '../../utils/constants'
import ImagePreviewModal from '../ArtistGallery/ImagePreviewModal/ImagePreviewModal'
import UploadModal from '../ArtistGallery/UploadModal/UploadModal'
import UploadProgressModal from '../ArtistGallery/UploadProgressModal/UploadProgressModal'
import {
  getArtistProfileAPI,
  updateArtistAPI,
  uploadArtistCertificateAPI,
} from '../../api/api'
import ConfirmationPopup from '../common/ConfirmationPopup/ConfirmationPopup'

export default function ArtistCertificates() {
  const { artistId } = useParams()
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const location = useLocation()
  const fileSelector = useRef(null)
  const moreFilesSelector = useRef(null)
  const [certificates, setCertificates] = useState([])
  const [uploadSource, setUploadSource] = useState(axios.CancelToken.source())
  const allowedFileFormats =
    constants['ALLOWED_FILE_FORMATS_CERTIFICATES'] || '.jpeg, .jpg, .png'
  let certificatesList = []
  let cancelUpload = false

  const [uploadModalShow, setUploadModalShow] = useState(false)
  const [uploadProgressModalShow, setUploadProgressModalShow] = useState(false)
  const [filesToUpload, setFilesToUpload] = useState([])
  const [previewUrls, setPreviewUrls] = useState([])
  //Currently selected image for preview
  const [uploadModalSelected, setUploadModalSelected] = useState(0)
  const [currentUploadNum, setCurrentUploadNum] = useState(1)
  const [totalUploadNum, setTotalUploadNum] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [numChecked, setNumChecked] = useState(0)
  //Confirm modal show/hide
  const [confirmModalShow, setConfirmModalShow] = useState(false)
  const [confirmModalMessage, setConfirmModalMessage] = useState('')
  //Image preview State
  const [imagePreviewShow, setImagePreviewShow] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(false)

  useEffect(() => {
    if (location.state) {
      certificatesList = location.state.certificatesList
      const cerfificatesData = certificatesList.map((ele) => ({
        url: ele,
        isChecked: false,
      }))
      setCertificates(cerfificatesData)
    } else {
      getCertificates()
    }
  }, [])

  useEffect(() => {
    let numCheckedItems = 0
    certificates.forEach((certificate) => {
      if (certificate.isChecked) {
        numCheckedItems++
      }
    })
    setNumChecked(numCheckedItems)
  }, [certificates])

  function handleFileSelectClick(e) {
    e.preventDefault()
    let numUploadAllowed = constants['MEDIA_UPLOAD_LIMIT'] - certificates.length
    console.log(numUploadAllowed)
    if (numUploadAllowed) {
      fileSelector.current.click()
    }
  }

  function handleFileSelect(e) {
    cancelUpload = false
    const uplSource = axios.CancelToken.source()
    setUploadSource(uplSource)
    let certificateFiles = []
    let urls = []
    const { files } = e.target

    let numUploadAllowed = constants['MEDIA_UPLOAD_LIMIT'] - certificates.length
    let addedFileIndex = 0

    if (numUploadAllowed) {
      let endIndex = numUploadAllowed
      if (files.length < numUploadAllowed) endIndex = files.length
      for (let i = 0; i < endIndex; i++) {
        if (files[i].type.match('image')) {
          urls.push({
            index: addedFileIndex,
            url: URL.createObjectURL(files[i]),
            type: constants['UPLOAD_FORMAT_IMAGE'],
            thumbnail: URL.createObjectURL(files[i]),
          })
          certificateFiles.push(files[i])
          addedFileIndex++
        }
      }
      setFilesToUpload(certificateFiles)
      setPreviewUrls(urls)

      if (urls.length) {
        setUploadModalSelected(0)
        setUploadModalShow(true)
      }
    }
  }
  function handleSelectMoreMedia(e) {
    let certificateFiles = []
    let urls = []
    const { files } = e.target

    const numMoreFilesAllowed =
      constants['CERTIFICATES_LIMIT'] -
      (certificates.length + filesToUpload.length)
    let endIndex = numMoreFilesAllowed
    if (files.length < numMoreFilesAllowed) endIndex = files.length
    let addedFileIndex = filesToUpload.length

    for (let i = 0; i < endIndex; i++) {
      if (files[i].type.match('image')) {
        urls.push({
          index: addedFileIndex,
          url: URL.createObjectURL(files[i]),
          type: constants['UPLOAD_FORMAT_IMAGE'],
          thumbnail: URL.createObjectURL(files[i]),
        })
        certificateFiles.push(files[i])
        addedFileIndex++
      }
    }
    setFilesToUpload((prevState) => [...prevState, ...certificateFiles])
    setPreviewUrls((prevState) => {
      return [...prevState, ...urls]
    })
  }

  function handleSelectMoreMediaClick(e) {
    e.preventDefault()
    if (
      certificates.length + filesToUpload.length <
      constants['CERTIFICATES_LIMIT']
    ) {
      moreFilesSelector.current.click()
    }
  }

  function handlePreviewSelect(index) {
    setUploadModalSelected(index)
  }

  function handleUploadModalClose() {
    setUploadModalShow(false)
  }

  async function handleUpload() {
    if (filesToUpload.length) {
      setTotalUploadNum(filesToUpload.length)
      //upload progress handler
      const onUploadProgress = function (progressEvent) {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        )
        setUploadProgress(percentCompleted)
      }

      let currentFileNum = 0
      setUploadModalShow(false)
      setUploadProgressModalShow(true)

      while (currentFileNum < filesToUpload.length) {
        if (cancelUpload) break
        setCurrentUploadNum(currentFileNum + 1)
        let formData = new FormData()
        formData.append('ref_file', filesToUpload[currentFileNum])
        formData.append('artist_id', artistId)
        formData.append('language', language)

        const res = await uploadArtistCertificateAPI(
          formData,
          accessToken,
          onUploadProgress,
          uploadSource.token,
        )

        //Get certificate url if upload success
        if (res.success !== false) {
          const updatedCert = res.data.data.media_info.training_certificate
          const reqObj = {
            language,
            user_id: artistId,
            training_certificate: updatedCert,
          }
          //Update artist profile with new certificates url
          const response = await updateArtistAPI(reqObj, accessToken)
          if (response.success !== false) {
            console.log('updated ' + (currentFileNum + 1))
            //Reresh data if all certificates are uploaded
            if (currentFileNum + 1 === filesToUpload.length) {
              getCertificates()
            }
          }

          currentFileNum++
          if (currentFileNum >= filesToUpload.length) {
            handleUploadProgressModalClose()
          }
          setUploadProgress(0)
        } else {
          handleUploadCancel()
          //setUploadProgress(0)
          currentFileNum++
        }
      }
    }
  }

  function updateCertificates(updatedCertificates) {}

  function handleUploadProgressModalClose() {
    setUploadProgress(0)
    setTotalUploadNum(0)
    setCurrentUploadNum(0)
    setUploadProgressModalShow(false)
  }

  function handleUploadCancel() {
    console.log('Cancelling')
    uploadSource.cancel()
    cancelUpload = true
    setFilesToUpload([])
    handleUploadProgressModalClose()
    setCurrentUploadNum(0)
    setUploadProgress(0)
    getCertificates()
  }

  function handleCheckboxToggle(e) {
    const { id } = e.target.dataset

    setCertificates((prevState) => {
      let certificatesCopy = [...prevState]
      certificatesCopy[id]['isChecked'] = !certificatesCopy[id]['isChecked']
      return certificatesCopy
    })
  }

  function handleDelete() {
    if (numChecked) {
      const result = certificates.reduce((acc, curr) => {
        if (!curr.isChecked) {
          acc.push(curr.url)
        }
        return acc
      }, [])
      const updatedCertificates = result.join(',')
      const reqObj = {
        language,
        user_id: artistId,
        training_certificate: updatedCertificates,
      }
      updateArtistAPI(reqObj, accessToken).then((res) => {
        if (res.success !== false) {
          console.log('Success')
          getCertificates()
        }
      })
    }
  }

  function handleConfirmModalClose() {
    setConfirmModalMessage('')
    setConfirmModalShow(false)
  }

  function handleConfirmModalShow(modalMessage) {
    setConfirmModalMessage(modalMessage)
    setConfirmModalShow(true)
  }

  function performAction() {
    handleDelete()
  }

  function getCertificates() {
    const reqObj = {
      user_id: artistId,
      language,
    }
    getArtistProfileAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        const trainingCertificates =
          res.data.data.beauty_profile_data.training_certificate
        console.log(trainingCertificates)
        const cerfificatesData = trainingCertificates.map((ele) => ({
          url: ele,
          isChecked: false,
        }))
        setCertificates(cerfificatesData)
      }
    })
  }

  function handleImagePreviewClose() {
    setImagePreviewShow(false)
    setPreviewUrl('')
  }

  function handleImagePreviewShow(url) {
    setPreviewUrl(url)
    setImagePreviewShow(true)
  }

  return (
    <>
      <ArtistCertificatesView
        certificates={certificates}
        fileSelector={fileSelector}
        handleFileSelect={handleFileSelect}
        moreFilesSelector={moreFilesSelector}
        handleFileSelectClick={handleFileSelectClick}
        handleCheckboxToggle={handleCheckboxToggle}
        numChecked={numChecked}
        handleDelete={handleDelete}
        handleConfirmModalShow={handleConfirmModalShow}
        handleImagePreviewShow={handleImagePreviewShow}
        artistId={artistId}
      />
      <UploadModal
        show={uploadModalShow}
        previewUrls={previewUrls}
        selected={uploadModalSelected}
        allowedFileFomats={allowedFileFormats}
        handleSelect={handlePreviewSelect}
        handleClose={handleUploadModalClose}
        moreFilesSelector={moreFilesSelector}
        handleAddMoreClick={handleSelectMoreMediaClick}
        handleUpload={handleUpload}
        handleAddMoreMedia={handleSelectMoreMedia}
      />
      <UploadProgressModal
        total={totalUploadNum}
        current={currentUploadNum}
        progress={uploadProgress}
        show={uploadProgressModalShow}
        handleClose={handleUploadProgressModalClose}
        handleCancel={handleUploadCancel}
      />
      <ConfirmationPopup
        modalShow={confirmModalShow}
        modalMessage={confirmModalMessage}
        performAction={performAction}
        handleClose={handleConfirmModalClose}
      />
      <ImagePreviewModal
        show={imagePreviewShow}
        handleClose={handleImagePreviewClose}
        previewUrl={previewUrl}
        mediaFormat={constants['MEDIA_FORMAT_IMAGE']}
      />
    </>
  )
}
