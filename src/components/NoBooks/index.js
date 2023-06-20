import './index.css'

const NoBooks = ({searchText}) => (
  <div className="no-book-container">
    <img
      src="https://res.cloudinary.com/djugcf64d/image/upload/v1687151339/Groupbooknotfound_ubvyhw.png"
      className="no-book"
      alt="no book"
    />
    <p className="no-book-description">
      Your search for <span>{searchText}</span> did not find any matches.
    </p>
  </div>
)

export default NoBooks
