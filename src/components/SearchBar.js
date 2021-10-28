import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as searchAPI from '../services/BooksAPI'

import BooksGrid from './BooksGrid'
class SearchBar extends Component {
  state = {
    searchTerm: '',
    booksFound: [ { name: 'uno'}]
  }

  handleChange = event => {
    const { value } = event.target
    const searchTerm = this.state.searchTerm

    this.setState(() => ({
      searchTerm: value
    }))

    if (searchTerm.length > 1) {
      searchAPI.search(searchTerm)
        .then(res=> {
          console.log(res)
        })
    }
  }

  render() {
    const { searchTerm } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" 
              placeholder="Search by title or author" 
              value={searchTerm} 
              onChange={this.handleChange}
            />
          </div>
        </div>

        <div className="search-books-results">
          { this.state.booksFound.length > 0 && <BooksGrid />}
        </div>
      </div>
    )
  }
}

export default SearchBar