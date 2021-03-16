import React from 'react'
import { FormattedMessage } from 'react-intl'

export default function SocialMedia(props) {
  const { website, fb, instagram, youtube, pinterest, handleChange } = props
  return (
    <div className="card-style education-sec  social-media mt-3">
      <div className="table-head">
        <h6><FormattedMessage id="socialMedia" defaultMessage="Social Media"/></h6>
      </div>
      <form>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>
                <span>
                  <i className="fab fa-facebook-f"></i>
                </span>{' '}
                <FormattedMessage id="facebook" defaultMessage="Facebook"/>
              </label>
              <input
                name="facebook_link"
                value={fb}
                type="text"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                <span>
                  <i className="fab fa-instagram"></i>
                </span>{' '}
                <FormattedMessage id="instagram" defaultMessage="Instagram"/>
              </label>
              <input
                name="instagram_link"
                value={instagram}
                type="text"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label>
                <span>
                  <i className="fab fa-pinterest-p"></i>
                </span>{' '}
                <FormattedMessage id="pinterest" defaultMessage="Pinterest"/>
              </label>
              <input
                name="pinterest_link"
                value={pinterest}
                type="text"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>
                <span>
                  <i className="fab fa-youtube"></i>
                </span>{' '}
                <FormattedMessage id="youtube" defaultMessage="Youtube"/>
              </label>
              <input
                name="youtube_link"
                value={youtube}
                type="text"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="col-md-12">
            <div className="form-group">
              <label>
                <span>
                  <i className="fas fa-globe"></i>
                </span>{' '}
                <FormattedMessage id="website" defaultMessage="Website"/>
              </label>
              <input
                name="website_link"
                value={website}
                type="text"
                className="form-control"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
