import React, { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { LanguageContext } from '../../context/LanguageContextProvider'
import { AccessTokenContext } from '../../context/AccessTokenProvider'
import {
  changeMediaStatusAPI,
  getArtistProfileAPI,
  uploadArtistGalleryMediaAPI,
} from '../../api/api'
import ConfirmationPopup from '../common/ConfirmationPopup/ConfirmationPopup'
import ArtistGalleryView from './ArtistGalleryView'
import constants from '../../utils/constants'
import ImagePreviewModal from './ImagePreviewModal/ImagePreviewModal'
import { FormattedMessage } from 'react-intl'
import UploadModal from './UploadModal/UploadModal'
import UploadProgressModal from './UploadProgressModal/UploadProgressModal'
import AlertPopup from '../common/AlertPopup/AlertPopup'
import audioIcon from '../../assets/images/audio.svg'
import videoIcon from '../../assets/images/video.svg'
import axios from 'axios'

export default function ArtistGallery() {
  const uploadSource = axios.CancelToken.source()
  const { artistId } = useParams()
  const { language } = useContext(LanguageContext)
  const { accessToken } = useContext(AccessTokenContext)
  const [media, setMedia] = useState([])
  const [pendingMedia, setPendingMedia] = useState([])
  const [approvedMedia, setApprovedMedia] = useState([])
  const [rejectedMedia, setRejectedMedia] = useState([])
  const [previewUrl, setPreviewUrl] = useState('')
  const [previewShow, setPreviewShow] = useState(false)
  const [mediaFormat, setMediaFormat] = useState(false)
  const breadcrumbsText = (
    <FormattedMessage
      id="am.profile.gall"
      values={{
        b: (text) => <b>{text}</b>,
      }}
    />
  )

  const [mediaCount, setMediaCount] = useState({
    pending: '',
    approved: '',
    rejected: '',
    total: '',
  })
  const [currentSection, setCurrentSection] = useState(
    constants['PENDING_MEDIA_SECTION'],
  )
  const [confirmModalShow, setConfirmModalShow] = useState(false)
  const [confirmModalMessage, setConfirmModalMessage] = useState(false)
  const [mediaAction, setMediaAction] = useState({
    userId: '',
    mediaId: '',
    action: '',
  })
  const fileUploader = useRef(null)
  const moreFilesSelector = useRef(null)
  const [filesToUpload, setFilesToUpload] = useState([])
  const [uploadModalShow, setUploadModalShow] = useState(false)
  const [previewUrls, setPreviewUrls] = useState([])
  const [uploadModalSelected, setUploadModalSelected] = useState(0)
  const [alertShow, setAlertShow] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [currentUploadNum, setCurrentUploadNum] = useState(1)
  const [totalUploadNum, setTotalUploadNum] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadProgressModalShow, setUploadProgressModalShow] = useState(false)
  const [uplSource, setUplSource] = useState(uploadSource)
  const allowedFileFormats =
    constants['ALLOWED_FILE_FORMATS_GALLERY'] ||
    '.jpeg, .jpg, .png, .mp4, .mov, .avi, .mpeg, .flv, .heic,'
  //const [cancelUpload, setCancelUpload] = useState(false)
  let cancelUpload = false

  useEffect(() => {
    getMedia()
  }, [])

  useEffect(() => {
    setMediaData()
  }, [media])

  useEffect(() => {
    setMediaData()
  }, [currentSection])

  useEffect(() => {
    console.log(mediaAction)
  }, [mediaAction])

  useEffect(() => {
    console.log(mediaFormat)
  }, [mediaFormat])

  function getMedia() {
    const reqObj = {
      user_id: artistId,
      language,
    }

    getArtistProfileAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        const { media } = res.data.data
        setMedia(media)
      }
    })
  }

  function setMediaData() {
    let pending = []
    let approved = []
    let rejected = []

    media.forEach((element) => {
      let mediaItem = { ...element, isChecked: false }
      if (mediaItem.is_approved === 0) {
        pending.push(mediaItem)
      } else if (mediaItem.is_approved === 1) {
        approved.push(mediaItem)
      } else if (mediaItem.is_approved === 2) {
        rejected.push(mediaItem)
      }
    })

    setPendingMedia(pending)
    setRejectedMedia(rejected)
    setApprovedMedia(approved)
    setMediaCount({
      pending: pending.length,
      approved: approved.length,
      rejected: rejected.length,
      total: pending.length + approved.length + rejected.length,
    })
  }

  function handleActionClick(confirmModalMessage, mediaId, userId, action) {
    setConfirmModalMessage(confirmModalMessage)
    setMediaAction({
      mediaId: mediaId ? mediaId.toString() : '',
      userId,
      action,
    })
    setConfirmModalShow(true)
  }

  function handleConfirmModalClose() {
    setConfirmModalMessage('')
    setMediaAction({})
    setConfirmModalShow(false)
  }

  function handleCheckboxToggle(e) {
    const { id } = e.target.dataset
    if (currentSection === constants['PENDING_MEDIA_SECTION']) {
      let pendingCopy = [...pendingMedia]
      pendingCopy[id]['isChecked'] = !pendingCopy[id]['isChecked']
      setPendingMedia(pendingCopy)
    } else if (currentSection === constants['APPROVED_MEDIA_SECTION']) {
      let approvedCopy = [...approvedMedia]
      approvedCopy[id]['isChecked'] = !approvedCopy[id]['isChecked']
      setApprovedMedia(approvedCopy)
    } else if (currentSection === constants['REJECTED_MEDIA_SECTION']) {
      let copy = [...rejectedMedia]
      copy[id]['isChecked'] = !copy[id]['isChecked']
      setRejectedMedia(copy)
    }
  }

  function handleMultipleActionClick(confirmModalMessage, action) {
    let mediaIds = []
    if (currentSection === constants['PENDING_MEDIA_SECTION']) {
      pendingMedia.forEach((ele) => {
        if (ele.isChecked) {
          mediaIds.push(ele.media_id)
        }
      })
    } else if (currentSection === constants['APPROVED_MEDIA_SECTION']) {
      approvedMedia.forEach((ele) => {
        if (ele.isChecked) {
          mediaIds.push(ele.media_id)
        }
      })
    } else if (currentSection === constants['REJECTED_MEDIA_SECTION']) {
      rejectedMedia.forEach((ele) => {
        if (ele.isChecked) {
          mediaIds.push(ele.media_id)
        }
      })
    }
    if (mediaIds.length) {
      setConfirmModalMessage(confirmModalMessage)
      setConfirmModalShow(true)
      setMediaAction({
        action,
        userId: artistId,
        mediaId: mediaIds.join(','),
      })
    }
  }

  function performAction() {
    const reqObj = {
      user_id: mediaAction.userId,
      media_id: mediaAction.mediaId,
      action: mediaAction.action,
      language,
    }
    changeMediaStatusAPI(reqObj, accessToken).then((res) => {
      if (res.success !== false) {
        console.log(res.data.data)
        getMedia()
      }
    })
  }

  function handleNavChange(section) {
    setCurrentSection(section)
  }

  //Preview the media item
  function handleMediaItemClick(mediaUrl, format) {
    setPreviewUrl(mediaUrl)
    setMediaFormat(format)
    setPreviewShow(true)
  }

  function handlePreviewClose() {
    setPreviewShow(false)
    //setPreviewUrl('')
  }

  function handleFileSelectClick(e) {
    e.preventDefault()
    fileUploader.current.click()
  }

  function handleFileSelect(e) {
    cancelUpload = false
    const source = axios.CancelToken.source()
    setUplSource(source)
    let mediaFiles = []
    let urls = []
    const { files } = e.target
    
    if (files.length > constants['MEDIA_UPLOAD_LIMIT']) {
      //Show alert 5 or less media allowed
      const message = (
        <FormattedMessage
          id="alert.upload.numFiles"
          defaultMessage={`Cannot upload more than ${constants['MEDIA_UPLOAD_LIMIT']}`}
          values={{ fileLimit: constants['MEDIA_UPLOAD_LIMIT'] }}
        />
      )
      handleAlertShow(message)
    } else {
      for (let i = 0; i < files.length; i++) {
        let type
        if (files[i].type.match('image')) {
          type = constants['UPLOAD_FORMAT_IMAGE']
          mediaFiles.push(files[i])
          urls.push({
            index: i,
            url: URL.createObjectURL(files[i]),
            type,
            thumbnail: URL.createObjectURL(files[i]),
          })
        } else if (files[i].type.match('video')) {
          console.log(files[i].type)
          type = constants['UPLOAD_FORMAT_VIDEO']
          mediaFiles.push(files[i])
          urls.push({
            index: i,
            url: URL.createObjectURL(files[i]),
            type,
            thumbnail: videoIcon,
          })
        }
        // } else if (files[i].type.match('audio')) {
        //   console.log(files[i].type)
        //   type = constants['UPLOAD_FORMAT_AUDIO']
        //   mediaFiles.push(files[i])
        //   urls.push({
        //     index: i,
        //     url: URL.createObjectURL(files[i]),
        //     type,
        //     thumbnail: audioIcon,
        //   })
        // }

        setFilesToUpload([...mediaFiles])
        setPreviewUrls(urls)
      }

      if (urls.length) {
        setUploadModalSelected(0)
        setUploadModalShow(true)
      }
    }
  }

  useEffect(() => {
    console.log(uploadProgress)
  }, [uploadProgress])

  function handlePreviewSelect(index) {
    console.log(index)
    setUploadModalSelected(index)
  }

  async function handleUpload() {
    if (filesToUpload.length) {
      setTotalUploadNum(filesToUpload.length)
      const onUploadProgress = function (progressEvent) {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        )
        setUploadProgress(percentCompleted)
      }
      let currentFileNum = 0
      setUploadModalShow(false)
      setUploadProgressModalShow(true)

      while (currentFileNum < filesToUpload.length && !cancelUpload) {
        if (cancelUpload) break
        //console.log('UPLOADING' + currentFileNum)
        setCurrentUploadNum(currentFileNum + 1)

        let formData = new FormData()
        formData.append('media_type', constants['MEDIA_TYPE_GALLERY'])
        // formData.append(
        //   'upload_type',
        //   constants['UPLOAD_TYPE_ARTIST_PROFILE_MEDIA'],
        // )
        formData.append('artist_id', artistId)
        formData.append('format', previewUrls[currentFileNum].type)
        formData.append('language', language)
        formData.append('height', 400)
        formData.append('width', 400)
        formData.append('ref_file', filesToUpload[currentFileNum])
        //console.log(previewUrls[currentFileNum].type)

        const res = await uploadArtistGalleryMediaAPI(
          formData,
          accessToken,
          onUploadProgress,
          uplSource.token,
        )
        if (res.success !== false) {
          setUploadProgress(0)
          console.log(res.data.data)
          currentFileNum++
          if (currentFileNum >= filesToUpload.length) {
            handleUploadProgressModalClose()
            getMedia()
          }
        } else {
          currentFileNum++
        }
      }
    }
  }

  function handleSelectMoreMediaClick(e) {
    e.preventDefault()
    if (filesToUpload.length < constants['MEDIA_UPLOAD_LIMIT']) {
      moreFilesSelector.current.click()
    }
    // else {
    //   const message = (
    //     <FormattedMessage
    //       id="alert.upload.numFiles"
    //       defaultMessage={`Cannot upload more than ${constants['MEDIA_UPLOAD_LIMIT']}`}
    //       values={{ fileLimit: constants['MEDIA_UPLOAD_LIMIT'] }}
    //     />
    //   )
    //   handleAlertShow(message)
    // }
  }

  function handleSelectMoreMedia(e) {
    let mediaFiles = []
    let urls = []
    const { files } = e.target

    const moreAllowedNum =
      constants['MEDIA_UPLOAD_LIMIT'] - filesToUpload.length
    //console.log(moreAllowedNum,'MORE MEDIA ITEMS ALLOWED')

    for (let i = 0; i < files.length && i < moreAllowedNum; i++) {
      let type
      if (files[i].type.match('image')) {
        type = constants['UPLOAD_FORMAT_IMAGE']
        mediaFiles.push(files[i])
        urls.push({
          index: i + filesToUpload.length,
          url: URL.createObjectURL(files[i]),
          type,
          thumbnail: URL.createObjectURL(files[i]),
        })
      } else if (files[i].type.match('video')) {
        type = constants['UPLOAD_FORMAT_VIDEO']
        mediaFiles.push(files[i])
        urls.push({
          index: i + filesToUpload.length,
          url: URL.createObjectURL(files[i]),
          type,
          thumbnail: videoIcon,
        })
      }
      // else if (files[i].type.match('audio')) {
      //   console.log(files[i].type)
      //   type = constants['UPLOAD_FORMAT_AUDIO']
      //   mediaFiles.push(files[i])
      //   urls.push({
      //     index: i + filesToUpload.length,
      //     url: URL.createObjectURL(files[i]),
      //     type,
      //     thumbnail: audioIcon,
      //   })
      // }
    }
    setFilesToUpload((prevState) => {
      return [...prevState, ...mediaFiles]
    })
    setPreviewUrls((prevState) => {
      return [...prevState, ...urls]
    })
  }

  function handleUploadModalClose() {
    setUploadModalShow(false)
  }

  function handleAlertShow(message) {
    setAlertMessage(message)
    setAlertShow(true)
  }

  function handleAlertClose() {
    setAlertShow(false)
    setAlertMessage('')
  }

  function handleUploadProgressModalClose() {
    setUploadProgress(0)
    setTotalUploadNum(0)
    setCurrentUploadNum(0)
    setUploadProgressModalShow(false)
  }

  function handleUploadCancel() {
    //console.log('Cancelling')
    uplSource.cancel()
    cancelUpload = true
    setFilesToUpload([])
    handleUploadProgressModalClose()
    setCurrentUploadNum(0)
    setUploadProgress(0)
  }

  return (
    <>
      <ArtistGalleryView
        pendingMedia={pendingMedia}
        approvedMedia={approvedMedia}
        rejectedMedia={rejectedMedia}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        handleToggle={handleCheckboxToggle}
        handleActionClick={handleActionClick}
        handleNavChange={handleNavChange}
        mediaCount={mediaCount}
        handleMultipleActionClick={handleMultipleActionClick}
        handleMediaItemClick={handleMediaItemClick}
        breadcrumbsText={breadcrumbsText}
        fileUploader={fileUploader}
        handleFileSelectClick={handleFileSelectClick}
        handleFileSelect={handleFileSelect}
        artistId={artistId}
      />
      <ConfirmationPopup
        modalShow={confirmModalShow}
        performAction
        modalMessage={confirmModalMessage}
        handleClose={handleConfirmModalClose}
        performAction={performAction}
      />
      <ImagePreviewModal
        previewUrl={previewUrl}
        show={previewShow}
        handleClose={handlePreviewClose}
        mediaFormat={mediaFormat}
      />
      <UploadModal
        show={uploadModalShow}
        previewUrls={previewUrls}
        selected={uploadModalSelected}
        handleUpload={handleUpload}
        handleClose={handleUploadModalClose}
        handleSelect={handlePreviewSelect}
        handleAddMoreMedia={handleSelectMoreMedia}
        handleAddMoreClick={handleSelectMoreMediaClick}
        moreFilesSelector={moreFilesSelector}
        allowedFileFormats={allowedFileFormats}
      />
      <AlertPopup
        show={alertShow}
        message={alertMessage}
        handleClose={handleAlertClose}
      />
      <UploadProgressModal
        total={totalUploadNum}
        current={currentUploadNum}
        progress={uploadProgress}
        show={uploadProgressModalShow}
        handleClose={handleUploadProgressModalClose}
        handleCancel={handleUploadCancel}
      />
    </>
  )
}
