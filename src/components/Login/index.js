import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errmsg, setErrMsg] = useState('')
  const [userErr, setUserErrMsg] = useState('')
  const [passErr, setPassErrMsg] = useState('')

  const onEnteringUsername = e => {
    setUserErrMsg('')
    setUsername(e.target.value)
  }

  const onEnteringPassword = e => {
    setPassErrMsg('')
    setPassword(e.target.value)
  }

  const onEmptyUserDetails = e => {
    if (!e.target.value) setUserErrMsg('*This field is required')
  }
  const onEmptyPasswordDetails = e => {
    if (!e.target.value) setPassErrMsg('*This field is required')
  }

  const onSuccessFetch = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onFailureFetch = errorMsg => {
    setErrMsg(errorMsg)
  }

  const onSubmittingForm = async e => {
    e.preventDefault()

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      onSuccessFetch(data.jwt_token)
      setUsername('')
      setPassword('')
    }
    onFailureFetch(data.error_msg)
  }

  if (Cookies.get('jwt_token') !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="mobile-login-container">
      <div className="login-image-container">
        <img
          src="https://res.cloudinary.com/djugcf64d/image/upload/v1680919798/Rectangle_1467_q0eddi.png"
          className="login-image"
          alt="login book logo"
        />
      </div>
      <div className="form-container">
        <form className="form" onSubmit={onSubmittingForm}>
          <div className="bookhub-text-container">
            <img
              src="https://res.cloudinary.com/djugcf64d/image/upload/v1680943074/Group_7730_moxigd.png"
              className="bookhub-text"
              alt="bookhub text logo"
            />
            <span className="special-text">ook Hub</span>
          </div>
          <label className="label" htmlFor="username">
            Username*
          </label>
          <input
            type="text"
            id="username"
            className="user-input"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={onEnteringUsername}
            onBlur={onEmptyUserDetails}
          />
          {userErr && <p className="blur-error-msg">{userErr}</p>}
          <label className="label" htmlFor="password">
            Password*
          </label>
          <input
            type="password"
            id="password"
            className="password-input"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={onEnteringPassword}
            onBlur={onEmptyPasswordDetails}
          />
          {passErr && <p className="blur-error-msg">{passErr}</p>}
          <button type="submit" className="login-btn">
            Login
          </button>
          {errmsg && <p className="error-msg">{errmsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
