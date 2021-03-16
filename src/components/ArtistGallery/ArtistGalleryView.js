import React from 'react'
import constants from '../../utils/constants'
import Breadcrumbs from '../common/Breadcrumbs'
import './ArtistGallery.css'
import GalleryHeader from './GalleryHeader'
import GalleryNav from './GalleryNav'
import MediaContent from './MediaContent'

export default function ArtistGalleryView({
  pendingMedia,
  approvedMedia,
  rejectedMedia,
  currentSection,
  setCurrentSection,
  handleToggle,
  handleActionClick,
  handleNavChange,
  mediaCount,
  handleMultipleActionClick,
  handleMediaItemClick,
  breadcrumbsText,
  fileUploader,
  handleFileSelectClick,
  handleFileSelect,
  artistId
}) {
  let media
  if (currentSection === constants[constants['PENDING_MEDIA_SECTION']]) {
    media = pendingMedia
  } else if (currentSection === constants['APPROVED_MEDIA_SECTION']) {
    media = approvedMedia
  } else if (currentSection === constants['REJECTED_MEDIA_SECTION']) {
    media = rejectedMedia
  }

  return (
    <div class="container-fluid">
      <div class="packages parent-div mt-4">
        <div className="artist-gallery-main">
          <Breadcrumbs text={breadcrumbsText} />
          <div class="card-style-gallery m-3">
            <GalleryHeader
              currentSection={currentSection}
              mediaCount={mediaCount.total}
              handleMultipleActionClick={handleMultipleActionClick}
              handleFileSelectClick={handleFileSelectClick}
              fileUploader={fileUploader}
              handleFileSelect={handleFileSelect}
              artistId={artistId}
            />
            <GalleryNav
              currentSection={currentSection}
              handleNavChange={handleNavChange}
              mediaCount={mediaCount}
            />
            <MediaContent
              media={media}
              handleToggle={handleToggle}
              handleActionClick={handleActionClick}
              handleMediaItemClick={handleMediaItemClick}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
