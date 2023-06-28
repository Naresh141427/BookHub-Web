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
      <nav className="sm-nav">
        <Link to="/" className="bookhub-logo-container">
          <img
            src="https://res.cloudinary.com/djugcf64d/image/upload/v1680943074/Group_7730_moxigd.png"
            className="bookhub-logo"
            alt="website logo"
          />
          <span className="logo-text">ook Hub</span>
        </Link>
        <AiOutlineMenu className="menu-icon" onClick={toggleMenu} />
        <ul className="nav-items-container">
          <li>
            <Link to="/" className="nav-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shelf" className="nav-item">
              BookShelves
            </Link>
          </li>

          <li>
            <button type="button" className="logout-button" onClick={onLogOut}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <>
        {menuOpen && (
          <ul className="nav-list-container">
            <li>
              <Link to="/" className="nav-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="nav-item">
                BookShelves
              </Link>
            </li>
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
        )}
      </>
    </>
  )
}

export default withRouter(Header)
