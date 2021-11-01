import React, { Component } from 'react'
import * as searchAPI from '../services/BooksAPI'

import SearchBar from '../components/SearchBar'
import BooksGrid from '../components/BooksGrid'

class Search extends Component {
  state = {
    loading: false,
    booksFound: []
  }

  handleSearch = term => {
    this.setState(() => ({ loading: true}))

    searchAPI.search(term)
      .then(res=> {
        this.setState(() => ({
          booksFound: res,
          loading: false
      }))
    })
  }

  render() {
    const { loading, booksFound} = this.state

    return (
      <div className="search-books">
        <SearchBar onSearch={this.handleSearch} />
        <div className="search-books-results">
          { !loading && booksFound.error
            ? <p className="search-books-results-warning">Sorry, no results. Please try another search term.</p>
            : loading
            ? <p className="search-books-results-warning">Please wait, searching for books</p>
            : !loading && booksFound && !booksFound.error
            ? <BooksGrid books={booksFound} />
            : null
          }
        </div>
      </div>            
    )
  }
}

export default Search