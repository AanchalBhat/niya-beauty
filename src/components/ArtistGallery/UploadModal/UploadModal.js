import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import './UploadModal.css'
import pic from '../../../assets/images/pro.jpg'
import constants from '../../../utils/constants'
import { FormattedMessage } from 'react-intl'

export default function UploadModal({
  handleClose,
  show,
  previewUrls,
  selected,
  handleUpload,
  handleSelect,
  moreFilesSelector,
  handleAddMoreMedia,
  handleAddMoreClick,
  allowedFileFomats,
}) {
  const selectedType = previewUrls[selected] ? previewUrls[selected].type : ''
  // console.log(previewUrls[selected] ? previewUrls[selected].url : '')
  return (
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
      id="add-media"
    >
      <div className="upload-modal">
        <Modal.Header style={{ justifyContent: 'center' }} closeButton>
          <h5 className="modal-title ">Choose Media</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="choosed-image">
            {selectedType === constants['UPLOAD_FORMAT_IMAGE'] ? (
              <img
                src={previewUrls[selected] ? previewUrls[selected].url : ''}
              />
            ) : (
              ''
            )}

            {selectedType === constants['UPLOAD_FORMAT_VIDEO'] ? (
              <div class="video-view position-relative">
                <video
                  controls={true}
                  key={previewUrls[selected] ? previewUrls[selected].index : ''}
                >
                  <source
                    src={previewUrls[selected] ? previewUrls[selected].url : ''}
                  />
                </video>
              </div>
            ) : (
              ''
            )}
            {selectedType === constants['UPLOAD_FORMAT_AUDIO'] ? (
              <div class="video-view position-relative">
                <div class="audio-added text-center">
                  <i class="fas fa-headphones"></i>
                  <br />
                  <audio
                    controls={true}
                    key={
                      previewUrls[selected] ? previewUrls[selected].index : ''
                    }
                  >
                    <source
                      src={
                        previewUrls[selected] ? previewUrls[selected].url : ''
                      }
                    />
                  </audio>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className="list-images flex-content mt-3">
            <button
              type="button"
              className="btn btn-default slide-btn"
              onClick={() => {
                handleSelect((selected - 1) % previewUrls.length)
              }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <div className="images-box flex-content p-2 ml-auto">
              {previewUrls.map((ele) => {
                console.log(ele.type)

                return (
                  <span
                    className={` ${
                      ele.type === constants['UPLOAD_FORMAT_VIDEO']
                        ? `video position-relative `
                        : ''
                    } ${ele.index === selected ? 'selected-image' : ''}`}
                    onClick={() => {
                      handleSelect(ele.index)
                    }}
                  >
                    {/* {ele.type === constants['UPLOAD_FORMAT_VIDEO'] ? (
                      <span className="play">
                        <i className="far fa-play-circle"></i>
                      </span>
                    ) : (
                      ''
                    )} */}

                    <img src={ele.thumbnail} />
                  </span>
                )
              })}
            </div>
            <button
              type="button"
              className="btn btn-default slide-btn ml-auto"
              onClick={() => {
                handleSelect((selected + 1) % previewUrls.length)
              }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-default white-button"
            onClick={handleAddMoreClick}
          >
            {' '}
            <i className="fas fa-plus"></i>{' '}
            <FormattedMessage id="addMore" defaultMessage="Add More" />
          </button>
          <input
            type="file"
            style={{ display: 'none' }}
            accept={allowedFileFomats}
            multiple={true}
            ref={moreFilesSelector}
            onChange={handleAddMoreMedia}
          />
          <button
            type="button"
            className="btn btn-default white-button"
            data-dismiss="modal"
            onClick={handleClose}
          >
            <FormattedMessage id="cancel" defaultMessage="Cancel" />
          </button>
          <button
            type="button"
            className="btn btn-default theme-button"
            onClick={handleUpload}
          >
            Upload
          </button>
        </Modal.Footer>
      </div>
    </Modal>
  )
}
