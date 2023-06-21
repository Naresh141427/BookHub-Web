import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

import {IoIosSearch} from 'react-icons/io'

import Header from '../Header'
import BookItem from '../BookItem'
import NoBooks from '../NoBooks'
import Footer from '../Footer'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
    isClicked: true,
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
    isClicked: false,
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
    isClicked: false,
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
    isClicked: false,
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Shelf = () => {
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [categories, setCategories] = useState(bookshelvesList)
  const [bookshelfName, setBookshelfName] = useState(bookshelvesList[0].value)
  const [searchText, setSearchText] = useState('')
  const [bookShelvesData, setBookShelvesData] = useState([])
  const [loaderCount, setLoaderCount] = useState(0)
  const [retryCount, setRetryCount] = useState(0)
  const [bookCategory, setBookCategory] = useState(bookshelvesList[0].label)

  useEffect(() => {
    const fetching = async () => {
      try {
        if (bookShelvesData.length === 0 && loaderCount === 0) {
          setApiStatus(apiStatusConstants.inProgress)
          setLoaderCount(prevCount => prevCount + 1)
        }
        const token = Cookies.get('jwt_token')
        const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
        const options = {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

        const response = await fetch(apiUrl, options)
        const data = await response.json()
        const updateData = data.books.map(each => ({
          id: each.id,
          title: each.title,
          coverPic: each.cover_pic,
          authorName: each.author_name,
          AvgRating: each.rating,
          status: each.read_status,
        }))
        setBookShelvesData(updateData)
        setApiStatus(apiStatusConstants.success)
      } catch (e) {
        console.log(e.message)
        setApiStatus(apiStatusConstants.failure)
      }
    }
    fetching()
  }, [
    searchText,
    bookshelfName,
    retryCount,
    loaderCount,
    bookShelvesData.length,
  ])

  const onSelectingCategory = e => {
    const filteredCategories = bookshelvesList.map(each => {
      if (each.label === e.target.textContent) {
        setBookshelfName(each.value)
        setBookCategory(each.label)
        return {...each, isClicked: true}
      }
      return {...each, isClicked: false}
    })
    setCategories(filteredCategories)
  }

  const onSearch = e => {
    setSearchText(e.target.value)
  }

  const renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  const renderFailureViewForSmallDevices = () => {
    const handleRetry = () => {
      setRetryCount(prevCount => prevCount + 1)
      setApiStatus(apiStatusConstants.inProgress)
    }
    return (
      <div className="sm-main-section">
        <div className="search-bar-container">
          <input
            type="search"
            className="sm-search-bar"
            placeholder="Search"
            onChange={onSearch}
            value={searchText}
          />
          <button className="search-button" type="button">
            <IoIosSearch className="sm-search-icon" />
          </button>
        </div>
        <h1 className="shelf-title">BookShelves</h1>
        <div className="bookshelves-tabs-container">
          {categories.map(tab => (
            <li
              className={
                tab.isClicked ? 'active-bookshelf-button' : 'bookshelf-button'
              }
              type="button"
              key={tab.id}
              onClick={onSelectingCategory}
            >
              {tab.label}
            </li>
          ))}
        </div>
        <div className="wrong-container">
          <img
            src="https://res.cloudinary.com/djugcf64d/image/upload/v1682071963/Group_7522_jdxurd.png"
            alt="something wrong"
            className="wrong-image"
          />
          <p className="wrong-message">
            Something went wrong, Please try again.
          </p>
          <button
            type="button"
            className="try-again-button"
            onClick={handleRetry}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  console.log(bookCategory)

  const renderFailureViewForLargeDevices = () => {
    const handleRetry = () => {
      setRetryCount(prevCount => prevCount + 1)
      setApiStatus(apiStatusConstants.inProgress)
    }
    return (
      <div className="lg-shelf-main-section">
        <div className="bookshelves-container">
          <h1 className="bookshelf-title">Bookshelves</h1>
          <ul className="lg-tabs-container">
            {categories.map(each => (
              <li
                className={
                  each.isClicked ? 'active-lg-tab-item' : 'lg-tab-item'
                }
                key={each.id}
                onClick={onSelectingCategory}
              >
                {each.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg-books-result-container">
          <div className="read-books-container">
            <h1 className="read-books-title">{bookCategory} Books</h1>
            <div className="lg-search-bar-container">
              <input
                type="search"
                className="lg-input-bar"
                placeholder="Search"
                onChange={onSearch}
                value={searchText}
              />
              <button type="button" className="lg-search-icon-button">
                <IoIosSearch className="lg-search-icon" />
              </button>
            </div>
          </div>
          <div className="wrong-container">
            <img
              src="https://res.cloudinary.com/djugcf64d/image/upload/v1682071963/Group_7522_jdxurd.png"
              alt="something wrong"
              className="wrong-image"
            />
            <p className="wrong-message">
              Something went wrong, Please try again.
            </p>
            <button
              type="button"
              className="try-again-button"
              onClick={handleRetry}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderBookItemsForSmallDevices = () => (
    <div className="sm-main-section">
      <div className="search-bar-container">
        <input
          type="search"
          className="sm-search-bar"
          placeholder="Search"
          onChange={onSearch}
          value={searchText}
        />
        <button className="search-button" type="button">
          <IoIosSearch className="sm-search-icon" />
        </button>
      </div>
      <h1 className="shelf-title">BookShelves</h1>
      <div className="bookshelves-tabs-container">
        {categories.map(tab => (
          <li
            className={
              tab.isClicked ? 'active-bookshelf-button' : 'bookshelf-button'
            }
            type="button"
            key={tab.id}
            onClick={onSelectingCategory}
          >
            {tab.label}
          </li>
        ))}
      </div>
      {bookShelvesData.length ? (
        <>
          <ul className="lg-books-container">
            {bookShelvesData.map(each => (
              <BookItem booksDetails={each} key={each.id} />
            ))}
          </ul>
          <Footer />
        </>
      ) : (
        <NoBooks searchText={searchText} />
      )}
    </div>
  )
  const renderBookItemsForLargeDevices = () => (
    <div className="lg-shelf-main-section">
      <div className="bookshelves-container">
        <h1 className="bookshelf-title">Bookshelves</h1>
        <ul className="lg-tabs-container">
          {categories.map(each => (
            <li
              className={each.isClicked ? 'active-lg-tab-item' : 'lg-tab-item'}
              key={each.id}
              onClick={onSelectingCategory}
            >
              {each.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="lg-books-result-container">
        <div className="read-books-container">
          <h1 className="read-books-title">{bookCategory} Books</h1>
          <div className="lg-search-bar-container">
            <input
              type="search"
              className="lg-input-bar"
              placeholder="Search"
              onChange={onSearch}
              value={searchText}
            />
            <button type="button" className="lg-search-icon-button">
              <IoIosSearch className="lg-search-icon" />
            </button>
          </div>
        </div>
        {bookShelvesData.length ? (
          <>
            <ul className="lg-books-container">
              {bookShelvesData.map(each => (
                <BookItem booksDetails={each} key={each.id} />
              ))}
            </ul>
            <Footer />
          </>
        ) : (
          <NoBooks searchText={searchText} />
        )}
      </div>
    </div>
  )

  const renderBookItems = () => (
    <>
      {renderBookItemsForSmallDevices()}
      {renderBookItemsForLargeDevices()}
    </>
  )

  const renderFailureView = () => (
    <>
      {renderFailureViewForSmallDevices()}
      {renderFailureViewForLargeDevices()}
    </>
  )
  const renderBookItemsData = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderBookItems()
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
      {renderBookItemsData()}
    </>
  )
}

export default Shelf
