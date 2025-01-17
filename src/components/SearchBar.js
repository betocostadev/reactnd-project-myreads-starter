import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBar extends Component {
  state = {
    searchTerm: ''
  }

  handleChange = event => {
    const { value } = event.target

    setTimeout(() => {
      if (value === this.state.searchTerm) {
        this.props.onSearch(this.state.searchTerm)
      }
    }, 600)

    this.setState(() => ({
      searchTerm: value
    }))
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
      </div>
    )
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
}

export default SearchBar