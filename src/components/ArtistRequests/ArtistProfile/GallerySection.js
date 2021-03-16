import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

export default function Gallery({ media, artistId }) {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card-style education-sec gallery-data mt-3">
          <div className="table-head flex-content">
            <h6>
              <FormattedMessage id="gallery" defaultMessage="Gallery" />{' '}
              {media.length ? `(${media.length})` : ''}
            </h6>
            <Link
              to={`/artist-management/${artistId}/profile/gallery`}
              className="ml-auto"
            >
              <button
                type="button"
                className="btn btn-default theme-button ml-auto"
              >
                {' '}
                <i className="fas fa-pencil-alt"></i>{' '}
                <FormattedMessage id="edit" defaultMessage="Edit" />
              </button>
            </Link>
          </div>

          <div
            style={{ overflowY: 'scroll', height: '200px' }}
            className="gallery-images"
          >
            <ul className="flex-content flex-wrap">
              {media.map((ele) => (
                <li key={ele.media_id} style={{ marginBottom: '10px' }}>
                  <img src={ele.thumbnail_link} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
