import React from 'react'
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

export default BooksGrid