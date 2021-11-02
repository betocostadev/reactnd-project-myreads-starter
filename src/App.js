import React from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './services/BooksAPI'
// import * as BooksAPI from './BooksAPI'
import './App.css'

import Home from './pages/Home'
import Search from './pages/Search'
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    bookShelves: [
      { shelf: 'currentlyReading', label: 'Currently Reading', books: [] },
      { shelf: 'wantToRead', label: 'Want to Read', books: [] },
      { shelf: 'read', label: 'Read', books: [] }
    ]
  }

  changeBookShelf = (targetShelf, book) => {
    const shelfWithBook = this.state.bookShelves.find(el => el.books.find(e => e.id === book.id))
    if (shelfWithBook && shelfWithBook.shelf === targetShelf) {
      return
    }
    
    const sectionToAddBook = this.state.bookShelves.find(el => el.shelf === targetShelf)
    let shelvesCopy = this.state.bookShelves
    
    if (shelfWithBook) {
      const fixedShelf = { ...shelfWithBook, books: shelfWithBook.books.filter(b => b.id !== book.id)}
      shelvesCopy = shelvesCopy.map(item => {
        return item !== shelfWithBook 
          ? item
          : fixedShelf
      })
    }

    if (sectionToAddBook) {
      const updatedShelf = { ...sectionToAddBook, books: [...sectionToAddBook.books, book]}
      
      const updatedState = shelvesCopy.map(shelf => {
        return shelf.shelf !== updatedShelf.shelf ? shelf : updatedShelf
      })
  
      this.setState(() => ({
        bookShelves: [ ...updatedState ]
      }))
    }
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then((books) => {
        try {
          const newState = this.state.bookShelves.map(shelf => {
            return { ...shelf, books: books.filter(b => b.shelf === shelf.shelf) }
          })
          this.setState((currState) => (
            currState.bookShelves = newState
          ))
        } catch (error) {
          console.log(error)
        }
      })
  }
  

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Home bookShelves={this.state.bookShelves} onChangeShelf={this.changeBookShelf} />
          </Route>
          <Route path="/search">
            <Search onChangeShelf={this.changeBookShelf} />
          </Route>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
