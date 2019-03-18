import React, {Component}from 'react';
import {Form, Button, Col } from 'react-bootstrap';
import './reset.css';
import NormalForm from './NormalForm.js/NormalForm';

class Reset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email : ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return(
            <div className="reset-form">
                <Form onSubmit={this.handleSubmit}>
                    {<NormalForm onInputChange = {this.handleInputChange}/>}
                    <Col md="4">
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Col>
                </Form>
                
            </div>
        );
    }


    handleInputChange(event) {
        if(event.target.name === 'email') this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.performPostAction();
        alert(" Si el correo existe, se mando un correo con instrucciones de como resetear su Password.");
    }

    performPostAction(){
        let data = {
            'email' : this.state.email
        };
}

 
}

export default Reset;
