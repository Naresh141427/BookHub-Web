import {useState} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiOutlineMenu} from 'react-icons/ai'
import {IoIosCloseCircle} from 'react-icons/io'

import './index.css'

const tabs = [
  {
    id: 1,
    name: 'Home',
    path: '/',
    isActive: false,
  },
  {
    id: 12,
    name: 'Bookshelves',
    path: '/shelf',
    isActive: true,
  },
]

const Header = props => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [tabsList, setTabsList] = useState(tabs)

  const onLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const toggleMenu = () => setMenuOpen(prev => !prev)
  const onSelectingTab = name => {
    const updatedTabs = tabs.map(tab => ({
      ...tab,
      isActive: tab.name === name,
    }))

    setTabsList(updatedTabs)
  }

  console.log(tabsList)
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
        <ul className="nav-list-container">
          {tabsList.map(eachTab => (
            <li key={eachTab.id} onClick={() => onSelectingTab(eachTab.name)}>
              <Link to={eachTab.path} className="link-item">
                {eachTab.name}
              </Link>
            </li>
          ))}
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

      {/* large screen nav */}
      <nav className="lg-nav">
        <Link to="/" className="bookhub-logo-container">
          <img
            src="https://res.cloudinary.com/djugcf64d/image/upload/v1680943074/Group_7730_moxigd.png"
            className="bookhub-logo"
            alt="bookhub text logo"
          />
          <span className="logo-text">ook Hub</span>
        </Link>
        <ul className="nav-items-container">
          {tabsList.map(eachTab => (
            <li
              onClick={() => onSelectingTab(eachTab.name)}
              key={eachTab.id}
              className="link"
            >
              <Link className="link-item" to={eachTab.path}>
                {eachTab.name}
              </Link>
            </li>
          ))}

          <li>
            <button type="button" className="logout-button" onClick={onLogOut}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)
