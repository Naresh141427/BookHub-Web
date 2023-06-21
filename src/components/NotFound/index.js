import {withRouter, Link} from 'react-router-dom'
import './index.css'

const NotFound = props => {
  const onGoBackHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/djugcf64d/image/upload/v1687244321/Group_7484page_not_found_v4cini.png"
        className="not-found-image"
        alt="not found"
      />
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button
          type="button"
          className="back-home-button"
          onClick={onGoBackHome}
        >
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}

export default withRouter(NotFound)
