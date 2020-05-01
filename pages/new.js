import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from "next/router";
import {Form, Spinner, FormGroup, Input, Label, Col, Button, FormFeedback} from "reactstrap";
import { string, object} from "yup";

let yup = require('yup');

const schema = yup.object().shape({
    title: yup.string().required().max(20),
    description: yup.string().required().max(100)
});

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            errors: [],
            isSubmitting: false,
        }
    }

    handleChang = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        let dataToSubmit = {title: this.state.title, description: this.state.description};
        schema.validate(dataToSubmit, {abortEarly: false}).then(valid => {
            if(valid){
                this.setState({errors: [], isSubmitting: true});
                this.createNote(dataToSubmit);
            }
        }).catch(err => {
            console.log(err.errors[0])

            this.setState({errors: [], isSubmitting: false});
            this.setState({errors: this.state.errors.concat(err.errors)});
        })
    };

    createNote = async (data) => {
        try {
            const res = await axios.post(`${process.env.URI}/api/notes`, data);
            this.props.router.push('/')
        }catch (e) {

        }
    };

    render() {
        return (
            <div className="container">
                <h1>Create Note</h1>
                <div>
                    {
                        this.state.isSubmitting
                            ? <Spinner color="success" className="spinner" />
                            :<Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label sm={2}>Title</Label>
                                    <Col sm={8}>
                                        <Input type="text" name="title" placeholder="type here" onChange={this.handleChang} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>Description</Label>
                                    <Col sm={8}>
                                        <Input type="textarea" name="description" placeholder="type here" onChange={this.handleChang} />
                                    </Col>
                                </FormGroup>
                                {this.state.errors.length > 0
                                    ? this.state.errors.map(e => <li className="errors">{e}</li>) : null}
                                <Button type="submit">Create</Button>

                            </Form>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(New);