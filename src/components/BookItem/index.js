import {withRouter} from 'react-router-dom'

import './index.css'

const BookItem = props => {
  const {booksDetails} = props
  const {id, title, coverPic, authorName, AvgRating, status} = booksDetails

  const onSelectingBook = () => {
    const {history} = props
    history.push(`/books/${id}`)
  }

  return (
    <li className="book-item" onClick={onSelectingBook}>
      <img src={coverPic} className="book-image" alt={title} />
      <div className="book-details-container">
        <h1 className="book-name">{title}</h1>
        <p className="author-name">{authorName}</p>
        <div className="rating-container">
          <span className="rating">Avg Rating</span>
          <img
            src="https://res.cloudinary.com/djugcf64d/image/upload/v1686981839/Icon_wlmb7n.png"
            className="rating-star"
            alt="rating"
          />
          <span className="rating-count">{AvgRating}</span>
        </div>
        <div className="status-container">
          <span className="status">Status:</span>
          <span className="status-text">{status}</span>
        </div>
      </div>
    </li>
  )
}

export default withRouter(BookItem)
