import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book, onChangeShelf }) => {
  const smallThumbnail = book && book.imageLinks
    ? book.imageLinks.smallThumbnail
    : ''

  const handleChange = event => {
    event.preventDefault()
    book.shelf = event.target.value
    onChangeShelf(event.target.value, book)
  }

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${smallThumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={handleChange}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {
          book.authors && book.authors.length > 0
          ? <div className="book-authors">{book.authors.map(author => (<span key={author}>{author}</span>))}</div>
          : <div className="book-authors"><span>Unknown</span></div>
        }
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default Book