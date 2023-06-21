import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import BooksSlider from '../Slider'
import Footer from '../Footer'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.success,
    booksData: [],
  }

  componentDidMount() {
    this.getTopBooks()
  }

  onSuccessFullGetFetch = data => {
    const updateBooksData = data.map(each => ({
      id: each.id,
      title: each.title,
      coverPic: each.cover_pic,
      authorName: each.author_name,
    }))

    this.setState({booksData: updateBooksData})
    this.setState({apiStatus: apiStatusConstants.success})
  }

  getTopBooks = async () => {
    try {
      this.setState({apiStatus: apiStatusConstants.inProgress})
      const token = Cookies.get('jwt_token')
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await fetch(
        'https://apis.ccbp.in/book-hub/top-rated-books',
        options,
      )
      const data = await response.json()
      this.onSuccessFullGetFetch(data.books)
    } catch (error) {
      console.log(error)
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div className="loader-container" testid="loader">
        <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
      </div>
    </>
  )

  renderHome = () => {
    const onFindingBooks = () => {
      const {history} = this.props
      history.push('/shelf')
    }
    const {booksData} = this.state
    return (
      <>
        <Header />
        <div className="main-section">
          <div className="top-section-container">
            <h1 className="top-section-header">
              Find Your Next Favorite Books?
            </h1>
            <p className="top-section-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button
              type="button"
              className="find-books-button"
              onClick={onFindingBooks}
            >
              Find Books
            </button>
          </div>
          <div className="top-books-container">
            <h1 className="top-books-title">Top Rated Books</h1>
            <BooksSlider booksData={booksData} />
          </div>
          <Footer />
        </div>

        {/* large screen */}
        <div className="lg-main-section">
          <div className="top-section-container">
            <h1 className="top-section-header">
              Find Your Next Favorite Books?
            </h1>
            <p className="top-section-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
          </div>
          <div className="top-books-container">
            <div className="button-container">
              <h1 className="top-books-title">Top Rated Books</h1>
              <button
                type="button"
                className="find-books-button"
                onClick={onFindingBooks}
              >
                Find Books
              </button>
            </div>
            <BooksSlider booksData={booksData} />
          </div>
          <Footer />
        </div>
      </>
    )
  }

  failureComponent = () => {
    const handleRetry = () => {
      this.getTopBooks()
    }
    return (
      <div className="home-wrong-container">
        <img
          src="https://res.cloudinary.com/djugcf64d/image/upload/v1682071963/Group_7522_jdxurd.png"
          alt="failure view"
          className="home-wrong-image"
        />
        <p className="wrong-message">Something went wrong, Please try again.</p>
        <button
          type="button"
          className="home-try-again-button"
          onClick={handleRetry}
        >
          Try Again
        </button>
      </div>
    )
  }

  renderFailureView = () => {
    const onFindingBooks = () => {
      const {history} = this.props
      history.push('/shelf')
    }
    return (
      <>
        <div className="main-section">
          <div className="top-section-container">
            <h1 className="top-section-header">
              Find Your Next Favorite Books?
            </h1>
            <p className="top-section-description">
              You are in the right place. Tell us what titles or genres you have
              enjoyed in the past, and we will give you surprisingly insightful
              recommendations.
            </p>
            <button
              type="button"
              className="find-books-button"
              onClick={onFindingBooks}
            >
              Find Books
            </button>
          </div>
          <div className="top-books-container">
            <h2 className="top-books-title">Top Rated Books</h2>
            {this.failureComponent()}
          </div>
        </div>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHome()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Home
