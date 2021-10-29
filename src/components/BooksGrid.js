import React from 'react'
import Book from './Book'

const BooksGrid = ({ books }) => {
  if (!books || !books.length) {
    return null
  }
  
  return (
    <ol className="books-grid">
      { books.map(book => (
        <Book key={book.id} book={book} />
      ))}
    </ol>
  )
}

export default BooksGrid