import React from 'react'
import { Route, Switch } from 'react-router-dom'
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
      { section: 'currentlyReading', label: 'Currently Reading', books: [
        { "title":"Artificial Intelligence","subtitle":"A Modern Approach","authors":["Stuart Jonathan Russell","Peter Norvig"],"publisher":"Prentice Hall","publishedDate":"2010","description":"Artificial intelligence: A Modern Approach, 3e,is ideal for one or two-semester, undergraduate or graduate-level courses in Artificial Intelligence. It is also a valuable resource for computer professionals, linguists, and cognitive scientists interested in artificial intelligence. The revision of this best-selling text offers the most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence.","industryIdentifiers":[{"type":"ISBN_13","identifier":"9780136042594"},{"type":"ISBN_10","identifier":"0136042597"}],"readingModes":{"text":false,"image":false},"pageCount":1132,"printType":"BOOK","categories":["Computers"],"averageRating":4.5,"ratingsCount":10,"maturityRating":"NOT_MATURE","allowAnonLogging":false,"contentVersion":"preview-1.0.0","imageLinks":{"smallThumbnail":"http://books.google.com/books/content?id=8jZBksh-bUMC&printsec=frontcover&img=1&zoom=5&source=gbs_api","thumbnail":"http://books.google.com/books/content?id=8jZBksh-bUMC&printsec=frontcover&img=1&zoom=1&source=gbs_api"},"language":"en","previewLink":"http://books.google.com/books?id=8jZBksh-bUMC&q=artificial+intelligence&dq=artificial+intelligence&hl=&cd=1&source=gbs_api","infoLink":"http://books.google.com/books?id=8jZBksh-bUMC&dq=artificial+intelligence&hl=&source=gbs_api","canonicalVolumeLink":"https://books.google.com/books/about/Artificial_Intelligence.html?hl=&id=8jZBksh-bUMC","id":"8jZBksh-bUMC" }
      ] },
      { section: 'wantToRead', label: 'Want to Read', books: [] },
      { section: 'read', label: 'Read', books: [] }
    ]
  }

  changeBookShelf = (targetShelf, book) => {
    const shelfWithBook = this.state.bookShelves.find(el => el.books.find(e => e.id === book.id))
    if (shelfWithBook && shelfWithBook.section === targetShelf) {
      return
    }
    
    const sectionToAddBook = this.state.bookShelves.find(el => el.section === targetShelf)
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
        return shelf.section !== updatedShelf.section ? shelf : updatedShelf
      })
  
      this.setState(() => ({
        bookShelves: [ ...updatedState ]
      }))
    }

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
