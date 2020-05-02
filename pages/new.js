import React, {Component} from 'react';
import axios from 'axios';
import {Form, Spinner, FormGroup, Input, Label, Col, Button, FormFeedback} from "reactstrap";
import {withRouter} from "next/router";
import {getAllNotes} from "../store/allNotes";

let yup = require('yup');

const schema = yup.object().shape({
    title: yup.string().required().max(20),
    description: yup.string().required().max(100)
});

export async function getStaticProps() {
    const notes = await getAllNotes();
    return {
        props: {
            notes
        },
    }
}

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
                // this.createNote(dataToSubmit);
            }
        }).catch(err => {
            this.setState({errors: [], isSubmitting: false});
            this.setState({errors: this.state.errors.concat(err.errors)});
        })
    };

    componentDidUpdate() {
        this.createNote();
    }

    createNote = async () => {
        if (this.state.isSubmitting) {
            let dataToSubmit = {title: this.state.title, description: this.state.description};
            try {
                await axios.post('/api/notes', dataToSubmit);
            }catch (e) {
                console.log(e);
            }
            console.log('1');
            await this.props.router.push('/');
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
                                    ? this.state.errors.map(e => <li className="errors" key={e}>{e}</li>) : null}
                                <Button type="submit">Create</Button>

                            </Form>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(New);