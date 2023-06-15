import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import {
  FaGoogle,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'

import Header from '../Header'

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

  onSucessfullGetFetch = data => {
    const updateBooksData = data.map(each => ({
      id: each.id,
      coverPic: each.cover_pic,
      authorName: each.author_name,
    }))

    this.setState({booksData: updateBooksData})
    this.setState({apiStatus: apiStatusConstants.success})
  }

  getTopBooks = async () => {
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
    console.log(data)
    if (response.ok) {
      this.onSucessfullGetFetch(data.books)
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
    const {booksData} = this.state
    const onFindingBooks = () => {
      const {history} = this.props
      history.replace('/shelf')
    }

    const settings = {
      dots: false,
      infinite: false,
      arrows: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 460,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    const renderSlider = () => (
      <Slider {...settings}>
        {booksData.map(each => {
          const {id, coverPic, authorName} = each
          return (
            <Link to={`/books/${id}`} className="slick-item" key={id}>
              <img className="logo-image" src={coverPic} alt={authorName} />
            </Link>
          )
        })}
      </Slider>
    )

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
            <h2 className="top-books-title">Top Rated Books</h2>
            <div className="slick-container">{renderSlider()}</div>
          </div>
          <div className="footer-section">
            <div className="social-apps-container">
              <FaGoogle className="social-app" />
              <FaTwitter className="social-app" />
              <FaInstagram className="social-app" />
              <FaYoutube className="social-app" />
            </div>
            <h2 className="contact-title">Contact Us</h2>
          </div>
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
              <h2 className="top-books-title">Top Rated Books</h2>
              <button
                type="button"
                className="find-books-button"
                onClick={onFindingBooks}
              >
                Find Books
              </button>
            </div>
            <div className="slick-container">{renderSlider()}</div>
          </div>
          <div className="footer-section">
            <div className="social-apps-container">
              <FaGoogle className="social-app" />
              <FaTwitter className="social-app" />
              <FaInstagram className="social-app" />
              <FaYoutube className="social-app" />
            </div>
            <h2 className="contact-title">Contact Us</h2>
          </div>
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <>
      <Header />
    </>
  )

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
