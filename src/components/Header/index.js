import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiOutlineMenu} from 'react-icons/ai'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

const Header = props => {
  const [menuOpen, setMenuOpen] = useState(false)

  const onLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <>
      {/* mobile nav */}
      <nav className="sm-nav">
        <Link to="/" className="bookhub-logo-container">
          <img
            src="https://res.cloudinary.com/djugcf64d/image/upload/v1680943074/Group_7730_moxigd.png"
            className="bookhub-logo"
            alt="bookhub text logo"
          />
          <span className="logo-text">ook Hub</span>
        </Link>
        <AiOutlineMenu className="menu-icon" onClick={toggleMenu} />
      </nav>
      {menuOpen && (
        <div className="sm-nav-items-container">
          <ul className="nav-lis-container">
            <Link to="/" className="sm-link">
              <li className="sm-nav-item">Home</li>
            </Link>
            <Link to="/shelf" className="sm-link">
              <li className="sm-nav-item">BookShelves</li>
            </Link>
            <li className="sm-nav-item">
              <button
                type="button"
                className="sm-logout-button"
                onClick={onLogOut}
              >
                Logout
              </button>
            </li>
            <li>
              <IoIosCloseCircle className="close-icon" onClick={toggleMenu} />
            </li>
          </ul>
        </div>
      )}

      {/* largescreen nav */}
      <nav className="lg-nav">
        <div className="bookhub-logo-container">
          <img
            src="https://res.cloudinary.com/djugcf64d/image/upload/v1680943074/Group_7730_moxigd.png"
            className="bookhub-logo"
            alt="bookhub text logo"
          />
          <span className="logo-text">ook Hub</span>
        </div>
        <ul className="nav-items-container">
          <Link className="link" to="/">
            <li>Home</li>
          </Link>
          <Link className="link" to="/shelf">
            <li>Bookshelves</li>
          </Link>
          <Link className="link" to="/">
            <li>
              <button
                type="button"
                className="logout-button"
                onClick={onLogOut}
              >
                Logout
              </button>
            </li>
          </Link>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)
