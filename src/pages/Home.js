import React from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from '../components/Bookshelf'

const Home = ({ bookShelves, onChangeShelf }) => {
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        {
          bookShelves.map((shelf) => (
            <Bookshelf key={shelf.section} section={shelf.label} books={shelf.books} onChangeShelf={onChangeShelf} />
          ))
        }
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  )
}

export default Home