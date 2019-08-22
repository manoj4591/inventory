import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import BookView from './books/BooksView'
import CategoryView from './books/CategoryView'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <Switch>
            <Route exact path="/"  component={BookView} />
            <Route path="/category" component={CategoryView} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;