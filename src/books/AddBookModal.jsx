import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Container, Form, FormGroup, Row, Col, Label, Alert } from 'reactstrap';
import Select from "react-select";

export default class AddBookModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCat: '',
            name: '',
            price: null,
        };
        this.entitySelectorViewRef = React.createRef();
    }

    componentDidMount() {
    }

    selectBookName = (event) => {
        this.setState({name: event.target.value});
    };

    selectBookPrice = (event) => {
        this.setState({price: event.target.value});
    };

    selectedCategory = (value) => {
        this.setState({selectedCat: value});
    }

    submitForm = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const errors = this.validateForm();
        if (errors.length > 0) {
            this.setState({errors: errors});
            return;
        }
        const bookObject = {
            bookName: this.state.name,
            price: this.state.price,
            categoryName: this.state.selectedCat.value
        };
        this.props.addBook(bookObject);
    }

    validateForm = () => {
        const errors = [];

        if (!this.state.name || this.state.name.trim() === '') {
            errors.push('book Name is Required. ');
        }

        if (!this.state.price || this.state.price.trim() === '') {
            errors.push('bookprice is Required. ');
        }

        if (!this.state.selectedCat) {
            errors.push('category is Required. ')
        }

        return errors;
    };


    render() {
            const { toggle, modalOpen, categoryList} = this.props;
            let categoryselected = [];
            categoryList.map(x => {
                let newObject = {
                    label: x.name,
                    value: x.name
                }
                categoryselected.push(newObject);
            })

        return (
                <div>
                <Modal isOpen={this.props.modalOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>Add Book</ModalHeader>
                <ModalBody>
                <div style={{background: "#f2f4f8"}}>
                            <Form>
                                <section className="px-4 py-4">
                                    <Row>
                                        <Col xs={12}>
                                        <FormGroup>
                                        <Label>Book Name</Label>
                                        <Input type="text" name="bookName" placeholder="Enter Book Name"  onChange={e => this.selectBookName(e)}/>
                                        </FormGroup>
                                        </Col>
                                        <Col xs={12}>
                                        <FormGroup>
                                        <Label>Price</Label>
                                        <Input type="number" name="price" id="examplePassword" placeholder="Enter price" onChange={e => this.selectBookPrice(e)}/>
                                        </FormGroup>
                                        </Col>
                                        <Col xs={12}>
                                        <FormGroup>
                                        <Label for="exampleSelect">Select Category</Label>
                                        <Select
                                                className="react-select primary"
                                                classNamePrefix="react-select"
                                                placeholder="Select Country"
                                                name="categorySelected"
                                                value={this.state.selectedCat}
                                                onChange={this.selectedCategory}
                                                options={categoryselected}
                                            />
                                        </FormGroup>
                                        </Col>
                                        <Col>      {this.state.errors && <Alert color="danger">
                                                        {this.state.errors}
        </Alert>}</Col>
                                        <Col xs={12}>
                                        <Button color="primary m-2" onClick={(e) => this.submitForm(e)}>Sumbit</Button>
                                        <Button color="secondary m-2" onClick={this.props.toggle}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </section>
                            </Form>
                        </div>
                </ModalBody>
                </Modal>
                </div>
        );
    }
}


