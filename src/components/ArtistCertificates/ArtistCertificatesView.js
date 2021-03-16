import React from 'react'
import { FormattedMessage } from 'react-intl'
import ArtistCertificatesHeader from './ArtistCertificatesHeader'

export default function ArtistCertificatesView({
  certificates,
  fileSelector,
  handleFileSelect,
  handleFileSelectClick,
  handleCheckboxToggle,
  numChecked,
  handleConfirmModalShow,
  handleImagePreviewShow,
  artistId
}) {
  return (
    <div class="container-fluid">
      <div class="certificates parent-div mt-4">
        <div class="card-style packages-cards m-3">
          <ArtistCertificatesHeader
            fileSelector={fileSelector}
            handleFileSelect={handleFileSelect}
            handleFileSelectClick={handleFileSelectClick}
            numChecked={numChecked}
            handleConfirmModalShow={handleConfirmModalShow}
            artistId={artistId}
          />
          <div class="cards-scroll">
            <div class="row">
              {certificates.map((certificate, index) => (
                <div class="col-md-3 text-center pb-3" key={index}>
                  <div class="document flex-content">
                    <img
                      src={certificate.url}
                      className="cursor-pointer"
                      onClick={() => {
                        handleImagePreviewShow(certificate.url)
                      }}
                    />
                  </div>
                  <input
                    class="mt-2"
                    data-id={index}
                    type="checkbox"
                    checked={certificate.isChecked}
                    onClick={handleCheckboxToggle}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
