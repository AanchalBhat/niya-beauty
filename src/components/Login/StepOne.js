import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function StepOne({
  email,
  password,
  handleChange,
  handleSubmit,
  error
}) {
  return (
    <div className="col-md-6">
      <div className="login-form">
        <form>
          <h4 style={{ fontWeight: 600 }} className="text-center mb-4">
            Admin Login
          </h4>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              required
              className="form-control"
              placeholder="admin@niya.com"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              required
              className="form-control"
              placeholder="*******"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            {error ?<p className="err-msg"> Invalid credentials. Please try again.</p> : null}
          </div>

          

          <div className="form-group">
            <div className="captcha">
              <div className="spinner">
                <label className="mb-0">
                  <input
                    className="login-checkbox"
                    type="checkbox"
                    onclick="$(this).attr('disabled','disabled');"
                  />
                  <span className="checkmark">
                    <span>&nbsp;</span>
                  </span>
                </label>
              </div>
              <div className="text">I'm not a robot</div>
              <div className="logo">
                <img src="https://forum.nox.tv/core/index.php?media/9-recaptcha-png/" />
                <p>reCAPTCHA</p>
                <small>Privacy - Terms</small>
              </div>
            </div>
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-default login-btn theme-button"
              onClick={handleSubmit}
            >
              <Spinner animation="border" /> Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
