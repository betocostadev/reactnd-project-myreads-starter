import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

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
            <Bookshelf key={shelf.shelf} shelf={shelf.label} books={shelf.books} onChangeShelf={onChangeShelf} />
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

Home.propTypes = {
  bookShelves: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default Home