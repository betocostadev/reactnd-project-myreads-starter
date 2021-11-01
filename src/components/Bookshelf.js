import React, { Component } from 'react'
import BooksGrid from './BooksGrid'

class Bookshelf extends Component {
  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.section}</h2>
        {
          this.props.books && this.props.books.length > 0 
          ?
            <div className="bookshelf-books">
              <BooksGrid books={this.props.books} />
            </div>
          : 
            <p>There are no books in this list yet.</p>
        }
      </div>
    )
  }
}

export default Bookshelf