import React, { Component } from 'react'
import * as booksAPI from '../services/BooksAPI'

import SearchBar from '../components/SearchBar'
import BooksGrid from '../components/BooksGrid'

class Search extends Component {
  state = {
    loading: false,
    booksFound: [],
    hasSearchTerm: false
  }

  handleSearch = term => {
    this.setState(() => ({ loading: true}))

    booksAPI.search(term)
      .then(res => {
        try {
          const responseItems = !res.error 
            ? res.map(book => {
              return {
                ...book,
                  shelf: this.props.booksInShelves.find(b => b.id === book.id) 
                    ? this.props.booksInShelves.find(b => b.id === book.id).shelf 
                    :'none'
                }
              })
            : []
          this.setState(() => ({
            loading: false,
            booksFound: responseItems,
            hasSearchTerm: term && term.length > 0 ? true : false
          }))

        } catch (error) {
          this.setState(() => ({
            booksFound: [],
            loading: false,
            hasSearchTerm: term && term.length > 0 ? true : false
          }))
        }
    })
  }

  render() {
    const { loading, booksFound, hasSearchTerm } = this.state

    return (
      <div className="search-books">
        <SearchBar onSearch={this.handleSearch} />
        <div className="search-books-results">
          { !loading && booksFound && !booksFound.length && hasSearchTerm
            ? <p className="search-books-results-warning">Sorry, no results. Please try another search term.</p>
            : loading
            ? <p className="search-books-results-warning">Please wait, searching for books</p>
            : !loading && booksFound && !booksFound.error
            ? <BooksGrid books={booksFound} onChangeShelf={this.props.onChangeShelf} />
            : null
          }
        </div>
      </div>            
    )
  }
}

export default Search