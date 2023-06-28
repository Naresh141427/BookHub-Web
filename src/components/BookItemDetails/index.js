import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const BookItemDetails = props => {
  const [bookData, setBookData] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [retryCount, setRetryCount] = useState(0)

  const updateTheData = data => ({
    id: data.id,
    coverPic: data.cover_pic,
    title: data.title,
    authorName: data.author_name,
    rating: data.rating,
    readStatus: data.read_status,
    aboutAuthor: data.about_author,
    aboutBook: data.about_book,
  })

  useEffect(() => {
    const doFetch = async () => {
      setApiStatus(apiStatusConstants.inProgress)
      try {
        const {match} = props
        const {params} = match
        const {id} = params
        const jwtToken = Cookies.get('jwt_token')
        const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
        const options = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          method: 'GET',
        }
        const response = await fetch(apiUrl, options)
        const data = await response.json()
        const updateData = updateTheData(data.book_details)
        setBookData(updateData)
        setApiStatus(apiStatusConstants.success)
      } catch (error) {
        setApiStatus(apiStatusConstants.failure)
        console.log(error)
      }
    }
    doFetch()
  }, [props, retryCount])

  console.log(bookData)

  const renderBookDetails = () => {
    const {
      coverPic,
      title,
      authorName,
      rating,
      readStatus,
      aboutAuthor,
      aboutBook,
    } = bookData

    return (
      <div className="sm-main-page-section">
        <div className="book-details-section">
          <div className="top-section">
            <img src={coverPic} alt={title} className="book-item-image" />
            <div className="book-image-details-container">
              <h1 className="book-item-title">{title}</h1>
              <p className="book-item-author">{authorName}</p>
              <div className="book-item-rating-container">
                <p className="book-rating-title">Avg Rating</p>
                <BsFillStarFill className="rating-star-image" />
                <p className="book-item-rating">{rating}</p>
              </div>
              <div className="book-item-status-container">
                <p className="book-item-status">
                  Status:
                  <span className="book-item-status-text">{readStatus}</span>
                </p>
              </div>
            </div>
          </div>
          <hr className="hr-rule" />
          <div className="book-item-content-details">
            <h1 className="book-author-title">About Author</h1>
            <p className="book-author-details">{aboutAuthor}.</p>
            <h1 className="about-book-title">About Book</h1>
            <p className="about-book-details">{aboutBook}</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => {
    const handleRetry = () => {
      setRetryCount(prevCount => prevCount + 1)
      setApiStatus(apiStatusConstants.inProgress)
    }
    return (
      <div className="book-wrong-container">
        <img
          src="https://res.cloudinary.com/djugcf64d/image/upload/v1682071963/Group_7522_jdxurd.png"
          className="failure-view"
          alt="failure view"
        />
        <p className="book-wrong-message">
          Something went wrong, Please try again.
        </p>
        <button
          type="button"
          className="book-try-again-button"
          onClick={handleRetry}
        >
          Try Again
        </button>
      </div>
    )
  }

  const renderBookItemDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderBookDetails()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }
  return (
    <>
      <Header />
      {renderBookItemDetails()}
    </>
  )
}
export default BookItemDetails
