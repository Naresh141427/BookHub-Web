import {Link, withRouter} from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const BooksSlider = props => {
  const {booksData} = props
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
        breakpoint: 770,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 354,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Slider {...settings} className="slider-container">
      {booksData.map(each => {
        const {id, coverPic, authorName, title} = each
        return (
          <li className="slider-item" key={id}>
            <Link to={`/books/${id}`} className="slider-book-item">
              <img className="logo-image" src={coverPic} alt={authorName} />
              <h1 className="book-title">{title}</h1>
              <p className="book-author">{authorName}</p>
            </Link>
          </li>
        )
      })}
    </Slider>
  )
}

export default withRouter(BooksSlider)
