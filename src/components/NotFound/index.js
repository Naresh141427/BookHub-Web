import {withRouter} from 'react-router-dom'
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
      <p className="not-found-description">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button type="button" className="back-home-button" onClick={onGoBackHome}>
        Go Back to Home
      </button>
    </div>
  )
}

export default withRouter(NotFound)
