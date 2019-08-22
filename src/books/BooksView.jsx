import React, { Component } from 'react';
import { Table, Container, Row, Col, Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import axios from 'axios';
import _ from 'lodash';
import {getRepos} from './bookService'

class BooksView extends React.Component {

    constructor() {
        super()
        document.title = 'Books';
        this.state ={
            category : null,
            books: null,
            selectedBooks: null,
            modal: false
        }
    }

    // componentWillMount() {
    //     this.getcategoryData();
    //   }

    //   getcategoryData() {
    //     getRepos()
    //       .then(({res}) => {
    //         this.getcategory(res);
    //         this.setState({books : res});
    //       });
    //   }

    componentDidMount() {
        axios.get(`/bookStore.json`)
        .then(res => {
          this.getcategory(res.data);
          this.setState({books : res.data});
        })
    }

    getcategory(data){
        console.log(data);
        // let box = data.reduce((r, a) => {
        //     if (a['categoryName']) {
        //     r[a.categoryName] = r[a.categoryName] || [];
        //     r[a.categoryName].push(a);
        //     }
        //     return r;
        //     }, Object.create(null));
        // console.log(box);
        
        let uniCategories = _.uniq(_.map(data, 'categoryName'));
        let result = _.pick(_.countBy(data, 'categoryName'),  uniCategories);
        console.log(result);
        let category = [];
        for( let b in result) {
            let obj = {
                name : b,
                count : result[b]
            };
          category.push( obj ); 
        }
        this.setState({category});
    }

    opensubtable(value){
        const {books} = this.state;
        let booksByCat = [];
        books.map(x =>{
            if(x.categoryName === value){
                booksByCat.push(x);
            }
        })
        this.setState({selectedBooks : booksByCat})
    }

    deleteCategory = (value) =>{
        const {category, books} = this.state;
        let booksByCat = [];
        let categoryDelete = [];
        category.map(x =>{
            if(x.name !== value){
                categoryDelete.push(x);
            }
        })
        books.map(x =>{
            if(x.categoryName !== value){
                booksByCat.push(x);
                this.setState({selectedBooks : null})
            }
        })
        this.setState({category: categoryDelete });
    }

    render() {
        let {category, selectedBooks} = this.state;
        return (
            <>
                <Container className="py-4">
                    <Row className="py-3">
                        <h3>Public library</h3>
                    </Row>
                    <Row className="py-3">
                        <Col xs="6">
                        <h4 className="py-1">Book Categories</h4>
                        </Col>
                        <Col xs="6" className="text-right">
                        <a className="btn btn-info" href="/category">Create Category</a>
                        </Col>
                        <Table striped bordered responsive hover>
                            <thead>
                                <tr>
                                <th>Category</th>
                                <th>Number of Books</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {category && category.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td onClick={() => this.opensubtable(val['name'])}><Badge href="#" color="light">{val['name']}</Badge></td>
                                            <td>{val['count']}</td>
                                            <td><Button className="btn btn-primary">Edit</Button></td>
                                            <td><Button className="btn btn-danger" onClick={() => this.deleteCategory(val['name'])}>Delete</Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Row>
                    {selectedBooks &&
                    <Row className="py-3">
                        <Col xs="12">
                        <h4 className="py-1">Books</h4>
                        </Col>
                        <Table striped bordered responsive hover>
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedBooks && selectedBooks.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val['bookName']}</td>
                                            <td>{val['price']}</td>
                                            <td>{val['categoryName']}</td>
                                            <td><Button className="btn btn-danger">Delete</Button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Row>}
                </Container>
            </>
        );
    }
}

export default BooksView;
