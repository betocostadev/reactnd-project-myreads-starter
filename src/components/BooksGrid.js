import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BooksGrid = ({ books, onChangeShelf }) => {
  if (!books || !books.length) {
    return null
  }
  
  return (
    <ol className="books-grid">
      { books.map(book => (
        <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
      ))}
    </ol>
  )
}

BooksGrid.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default BooksGrid