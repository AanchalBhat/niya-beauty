import React from 'react'
import MediaItem from './MediaItem'

export default function MediaContent({
  media,
  handleToggle,
  handleActionClick,
  handleMediaItemClick,
}) {
  return (
    <div>
      <div class="tab-content">
        <div id="approved" class="tab-pane active">
          <div class="gallery-images">
            <ul class="flex-content-gallery">
              {media.map((mediaItem, index) => (
                <MediaItem
                  mediaItem={mediaItem}
                  key={mediaItem.id}
                  index={index}
                  handleToggle={handleToggle}
                  handleActionClick={handleActionClick}
                  handleMediaItemClick={handleMediaItemClick}
                />
              ))}
            
            </ul>
          </div>
        </div>

        {/* <div id="rejected" class="tab-pane fade">
          <div class="gallery-images">
            <ul class="flex-content-gallery">
              <li>
                <div class="selector-image text-center">
                  <img src="./imgs/pro.jpg" />
                  <button type="button" class="btn btn-default camera">
                    <i class="fas fa-camera"></i>
                  </button>
                  <input class="mr-1" type="checkbox" />
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div id="pending" class="tab-pane fade">
          <div class="gallery-images">
            <ul class="flex-content-gallery">
              <li>
                <div class="selector-image text-center">
                  <img src="./imgs/pro.jpg" />
                  <button type="button" class="btn btn-default camera">
                    <i class="fas fa-camera"></i>
                  </button>
                  <input class="mr-1" type="checkbox" />
                </div>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  )
}
