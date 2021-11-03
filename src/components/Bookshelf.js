import React from 'react'
import BooksGrid from './BooksGrid'
import PropTypes from 'prop-types'

const Bookshelf = ({ shelf, books, onChangeShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      {
        books && books.length > 0 
        ?
          <div className="bookshelf-books">
            <BooksGrid books={books} onChangeShelf={onChangeShelf} />
          </div>
        : 
          <p>There are no books in this list yet.</p>
      }
    </div>
  )
}

Bookshelf.propTypes = {
  shelf: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default Bookshelf