import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as searchAPI from '../services/BooksAPI'

import BooksGrid from './BooksGrid'
class SearchBar extends Component {
  state = {
    searchTerm: '',
    loading: false,
    booksFound: []
  }

  handleChange = event => {
    const { value } = event.target

    setTimeout(() => {
      if (value.length > 2 && value === this.state.searchTerm) {
        this.fetchBooks(value)
      }
    }, 600)

    this.setState(() => ({
      searchTerm: value
    }))
  }

  fetchBooks = term => {
    this.setState(() => ({ loading: true}))

    searchAPI.search(term)
      .then(res=> {
        this.setState((currState) => ({
          ...currState,
          booksFound: res,
          loading: false
        }))
      })
  }

  render() {
    const { searchTerm, loading, booksFound } = this.state

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
          { !loading && searchTerm.length < 2
            ? null
            : loading
            ? <p className="search-books-results-warning">Please wait, searching for books</p>
            : !loading && !booksFound.error && searchTerm.length > 1
            ? <BooksGrid books={booksFound} />
            : <p className="search-books-results-warning">Sorry, no results. Please try another search term.</p>
          }
        </div>
      </div>
    )
  }
}

export default SearchBar