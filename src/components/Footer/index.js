import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-section">
    <div className="social-apps-container">
      <FaGoogle className="social-app" />
      <FaTwitter className="social-app" />
      <FaInstagram className="social-app" />
      <FaYoutube className="social-app" />
    </div>
    <h2 className="contact-title">Contact Us</h2>
  </div>
)
export default Footer
