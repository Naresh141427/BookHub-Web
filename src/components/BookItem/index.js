import {withRouter} from 'react-router-dom'
import {BsFillStarFill} from 'react-icons/bs'

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
          <p className="rating">Avg Rating</p>
          <p>
            <BsFillStarFill className="rating-star" />
          </p>
          <p className="rating-count">{AvgRating}</p>
        </div>
        <div className="status-container">
          <p className="status">
            Status: <span className="status-text">{status}</span>
          </p>
        </div>
      </div>
    </li>
  )
}

export default withRouter(BookItem)
