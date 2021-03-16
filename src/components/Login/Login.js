import React from 'react'
import logo from '../../assets/images/logo.jpg'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import './Login.css'
import { login, resendToken, verifyAuthToken } from '../../api/api'
import {  setAccessTokenCookie } from '../../utils/auth'
import {AccessTokenContext} from '../../context/AccessTokenProvider'

export default class Login extends React.Component {
  static contextType = AccessTokenContext
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      step: 1,
      authTokenOne: '',
      authTokenTwo: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitOne = this.handleSubmitOne.bind(this)
    this.handleSubmitTwo = this.handleSubmitTwo.bind(this)
    this.handleGoBack = this.handleGoBack.bind(this)
    this.setErrorTrue = this.setErrorTrue.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  handleSubmitOne(e) {
    e.preventDefault()
    login(this.state.email, this.state.password).then((res) => {
      if (res.success !== false) {
        const authOne = res.data.data.auth_token
        resendToken(authOne).then((res) => {
          if (res.success !== false) {
            const {
              auth_token: authTokenTwo,
              otp_phone: otpPhone,
              otp_email: otpEmail,
            } = res.data.data

            this.setState((prevState) => {
              return {
                ...prevState,
                authTokenTwo,
                otpPhone,
                otpEmail,
                error : false,
                step: 2,
              }
            })
          }
        })
      } else {
        console.log('error')
        this.setErrorTrue()
      }
    })
  }

  handleSubmitTwo(e) {
    e.preventDefault()
    verifyAuthToken(
      this.state.authTokenTwo,
      this.state.otpPhone,
      this.state.otpEmail,
    ).then((res) => {
      if (res.success !== false) {
        const accessToken = res.data.data.access_token
        const { setAccessToken } = this.context
        setAccessToken(accessToken)
        setAccessTokenCookie(accessToken)
        // console.log(getAccessToken())
        // window.location.reload(false);
         this.props.history.push('/user-management')
        //this.props.history.push('/artist-requests')
      } else {
        this.setErrorTrue()
      }
    })
  }

  handleGoBack() {
    this.setState((prevState) => ({
      ...prevState,
      step: 1,
      error: false,
    }))
  }

  setErrorTrue() {
    this.setState((prevState) => {
      return {
        ...prevState,
        error: true,
      }
    })
  }

  render() {
    return (
      <div class="login m-3 mb-0">
        <div class="container">
          <div class="cover-div">
            <div class="row">
              <div class="col-md-6 text-center">
                <img src={logo} />
              </div>
              {this.state.step === 2 ? (
                <StepTwo
                  otpPhone={this.state.otpPhone}
                  otpEmail={this.state.otpEmail}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmitTwo}
                  error={this.state.error}
                  handleBackToLogin = {this.handleGoBack}
                />
              ) : (
                <StepOne
                  email={this.state.email}
                  password={this.state.password}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmitOne}
                  error={this.state.error}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
