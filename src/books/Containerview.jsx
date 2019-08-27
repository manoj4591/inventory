import React from "react";
import axios from 'axios';
import _ from 'lodash';
import {getRepos} from './bookService';
import BooksView from './BooksView.jsx'


class Containerview extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
        books: null,
    }
  }

  componentDidMount() {
    axios.get(`/bookStore.json`)
    .then(res => {
      this.setState({books : res.data});
    })
 }

  render() {
    return (
        <BooksView bookStore={this.state.books} />
    )
  }
}

export default Containerview;