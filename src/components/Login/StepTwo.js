import React from 'react'

export default function StepTwo({
  otpPhone,
  otpEmail,
  handleChange,
  handleSubmit,
  error,
  handleBackToLogin
}) {
  return (
    <div className="col-md-6">
      <div className="otp-form">
        <form>
          <h4 style={{ fontWeight: 600 }} className="text-center mb-4">
            Enter Authorization Passwords
          </h4>
          <div className="form-group">
            <label>Via Email</label>
            <input
              name="otpEmail"
              value={otpEmail}
              onChange={handleChange}
              required
              type="text"
              className="form-control"
              placeholder="****"
            />
          </div>
          <div className="form-group">
            <label>Via Phone Number</label>
            <input
              name="otpPhone"
              value={otpPhone}
              onChange={handleChange}
              required
              type="text"
              className="form-control"
              placeholder="****"
            />
          </div>

          <div className="form-group">
            <button
              type="button"
              className="btn btn-default login-btn theme-button"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <div className="form-group">
            {error ?<p className="err-msg"> Invalid OTP. Please enter valid OTP.</p> : null}
          </div>
          <div className="form-group action-down flex-content">
            <a href="#" className="" onClick={handleBackToLogin}>
              Back to login
            </a>
            <a href="#" className=" ml-auto">
              Resend OTP's
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}
