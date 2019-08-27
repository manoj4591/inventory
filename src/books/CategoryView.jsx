import React, { Component } from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';
import axios from 'axios';
import _ from 'lodash';
class CategoryView extends React.Component {

    constructor() {
        super()
        document.title = 'Category';
        this.state = {
            name: '',
        };
    }

    componentDidMount() {
        const { categoryNameEdit } = this.props;
        if(categoryNameEdit && !this.state.name){
            this.setState({name: categoryNameEdit});
        }
    }

    submitForm = (value, event) => {
        if (!event.target.checkValidity()) {
            return;
          }
        event.preventDefault();

        if(value == 'create'){
            const categoryObject = {
                name: this.state.name,
                count: 0
            };
            this.props.addNewCategory(categoryObject);
        } else {
            this.props.editCat(this.state.name);
        }
        

      }

    setCategoryName = (event) => {
        this.setState({'name': event.target.value});
    };

    render() {

        return (
            <>
                <Container className="py-4">
                    <Row className="py-3">
                        <Col>
                        <h3>Add New Category</h3>
                        </Col>
                    </Row>
                    <Form onSubmit={this.handleSubmit} noValidate>
                    <FormGroup>
                    <Label>Category Name</Label>
                    <Input type="text" name="name" value={this.state.name} placeholder="categoryName" onChange={e => this.setCategoryName(e)} required/>
                    </FormGroup>
                    <Button className="btn btn-primary" onClick={(e) => this.submitForm(this.props.categoryNameEdit ? 'edit' : 'create', e)} >Submit</Button>
                    </Form>
                </Container>
            </>
        );
    }
}

export default CategoryView;
