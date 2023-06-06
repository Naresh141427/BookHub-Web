import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrMsg: false, errMsg: ''}

  onEnteringUsername = event => {
    this.setState({username: event.target.value})
  }

  onEnteringUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessFormSubmission = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureFormSubmission = errMsg => {
    this.setState({errMsg, showErrMsg: true})
  }

  onSubmittingForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    console.log(userDetails)

    const loginApi = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApi, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccessFormSubmission(data.jwt_token)
    } else {
      this.onFailureFormSubmission(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrMsg, errMsg} = this.state

    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        {/* Mobile Login page */}
        <div className="mobile-login-container">
          <div className="login-container">
            <div className="image-container">
              <img
                src="https://res.cloudinary.com/djugcf64d/image/upload/v1680919798/Rectangle_1467_q0eddi.png"
                height="100%"
                className="login-image"
                alt="login logo"
              />
            </div>

            <form className="form-container" onSubmit={this.onSubmittingForm}>
              <div className="website-logo-container">
                <img
                  src="https://res.cloudinary.com/djugcf64d/image/upload/v1680943074/Group_7730_moxigd.png"
                  className="bookhub-logo"
                  alt="website logo"
                />
                <p className="logo-text">OOK HUB</p>
              </div>

              <div className="input-container">
                <label htmlFor="username" className="mb-label">
                  Username*
                </label>
                <input
                  id="username"
                  type="text"
                  className="mb-input"
                  placeholder="Enter the username"
                  value={username}
                  onChange={this.onEnteringUsername}
                />
              </div>

              <div className="input-container">
                <label htmlFor="username" className="mb-label">
                  Password*
                </label>
                <input
                  id="username"
                  type="password"
                  className="mb-input"
                  placeholder="Enter the password"
                  value={password}
                  onChange={this.onEnteringUserPassword}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              <div className="errmsg-container">
                {showErrMsg ? <p className="error-msg">{errMsg}</p> : null}
              </div>
            </form>
          </div>
        </div>
        {/* laptop LoginPage */}
        <div className="laptop-login-container">
          <img
            src="https://res.cloudinary.com/djugcf64d/image/upload/v1680919798/Rectangle_1467_q0eddi.png"
            className="lg-login-image"
            alt="login"
          />

          <div className="lg-form-container">
            <form className="form-container" onSubmit={this.onSubmittingForm}>
              <div className="website-logo-container">
                <img
                  src="https://res.cloudinary.com/djugcf64d/image/upload/v1680943074/Group_7730_moxigd.png"
                  className="bookhub-logo"
                  alt="website logo"
                />
                <p className="logo-text">OOK HUB</p>
              </div>

              <div className="input-container">
                <div className="input-container">
                  <label htmlFor="username" className="mb-label">
                    Username*
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="mb-input"
                    placeholder="Enter the username"
                    value={username}
                    onChange={this.onEnteringUsername}
                  />
                </div>

                <label htmlFor="username" className="mb-label">
                  Password*
                </label>
                <input
                  id="username"
                  type="password"
                  className="mb-input"
                  placeholder="Enter the password"
                  value={password}
                  onChange={this.onEnteringUserPassword}
                />
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              <div className="errmsg-container">
                {showErrMsg ? <p className="error-msg">{errMsg}</p> : null}
              </div>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login
