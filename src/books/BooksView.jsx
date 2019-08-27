import React, { Component } from 'react';
import { Table, Container, Row, Col, Button, Badge, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import axios from 'axios';
import _ from 'lodash';
import CategoryView from './CategoryView'
import AddBookModal from "./AddBookModal";

class BooksView extends React.Component {

    constructor() {
        super()
        document.title = 'Books';
        this.state = {
            addcategorystate: false,
            editCategoryName: null,
            books: null,
        }
    }

    componentDidUpdate(){
        const { bookStore } = this.props;
        if(bookStore && !this.state.categoryData){
            this.getcategory(bookStore);
        }
    }

    getcategory = (data) => {
        if(data !== null){
            let uniCategories = _.uniq(_.map(data, 'categoryName'));
            let result = _.pick(_.countBy(data, 'categoryName'),  uniCategories);
            let category = [];
            for( let b in result) {
                let obj = {
                    name : b,
                    count : result[b]
                };
              category.push( obj ); 
            }
            this.setState({categoryData: category, books: data});
        }
    }

    addNewCategory(value){
        const {category} = this.state;
        category.push(value);
        this.setState({category});
    }

    opensubtable = (value) => {
        const { books } = this.state;
        let booksByCat = [];
        books.map(x =>{
            if(x.categoryName === value){
                booksByCat.push(x);
            }
        })
        this.setState({selectedBooks : booksByCat})
    }

    deleteCategory = (value, categoryData) => {
        const { books } = this.state;
        let booksByCat = [];
        let categoryDelete = [];
        categoryData.map(x =>{
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
        this.setState({categoryData: categoryDelete });
    }

    createCategory = () =>{
       this.setState({addcategorystate : true});
    }

    addNewCategory = (value) => {
        const {categoryData} = this.state;
        categoryData.push(value);
        this.setState({addcategorystate : false, categoryData: categoryData});
    }

    editCategory = (value) => {
        this.setState({addcategorystate : true, editCategoryName: value});
    }

    editcatbyName = (value) => {
        const {categoryData, books} = this.state;
        categoryData.map(x => {
            if(x.name == this.state.editCategoryName){
                x.name = value;
            }
        })
        books.map(x =>{
            if(x.categoryName === this.state.editCategoryName){
                x.categoryName = value;
            }
        })
        this.setState({addcategorystate : false, categoryData: categoryData, books: books});
    }

    _addBook = () => {
        console.log('here');
        this.setState({showBookActionModal: true});
    };

    _modalToggle = () => {
        this.setState(prevState => {
            return {showBookActionModal: !prevState.showBookActionModal};
        });
    };

    addnewBook = (value) => {
        const { books } = this.state;
        books.push(value);
        this.setState({showBookActionModal: false, books: books});
    }

    render() {
        const { bookStore } = this.props;
        const { selectedBooks, categoryData } = this.state;
        return (
            <>
                {!this.state.addcategorystate && <Container className="py-4">
                    <Row className="py-3">
                        <h3>Public library</h3>
                    </Row>
                    <Row className="py-3">
                        <Col xs="6">
                        <h4 className="py-1">Book Categories</h4>
                        </Col>
                        <Col xs="6" className="text-right">
                        <a className="btn btn-info m-2" onClick={this.createCategory}>Create Category</a>
                        <a className="btn btn-info m-2" onClick={this._addBook}>Add Book</a>
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
                                {categoryData && categoryData.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td onClick={() => this.opensubtable(val['name'])}><Badge href="#" color="light">{val['name']}</Badge></td>
                                            <td>{val['count']}</td>
                                            <td><Button className="btn btn-primary" onClick={() => this.editCategory(val['name'], categoryData)}>Edit</Button></td>
                                            <td><Button className="btn btn-danger" onClick={() => this.deleteCategory(val['name'], categoryData)}>Delete</Button></td>
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
                                </tr>
                            </thead>
                            <tbody>
                                {selectedBooks && selectedBooks.map((val, key) => {
                                    return (
                                        <tr key={key}>
                                            <td>{val['bookName']}</td>
                                            <td>{val['price']}</td>
                                            <td>{val['categoryName']}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Row>}
                </Container>}
                {this.state.addcategorystate && <CategoryView addNewCategory = {this.addNewCategory} editCat={this.editcatbyName} categoryNameEdit={this.state.editCategoryName} /> }
                {this.state.showBookActionModal &&
                    <AddBookModal toggle={this._modalToggle} modalOpen={this.state.showBookActionModal} categoryList={this.state.categoryData} addBook={this.addnewBook} />}
            </>
        );
    }
}

export default BooksView;
