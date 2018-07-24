import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import BookList from './pages/BookList'
import AddAuthor from './pages/AddAuthor'
import AddBook from './pages/AddBook'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route path="/" exact component={BookList} />
            <Route path="/addAuthor" exact component={AddAuthor} />
            <Route path="/addBook" exact component={AddBook} />
          </Switch>
        </Router>
      </ApolloProvider>
    )
  }
}

export default App
