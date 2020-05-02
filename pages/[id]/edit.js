import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from "next/router";
import {Form, Spinner, FormGroup, Input, Label, Col, Button, FormFeedback} from "reactstrap";
import { string, object} from "yup";
import {getAllPaths, getNoteById} from "../../store/allNotes";

let yup = require('yup');

const schema = yup.object().shape({
    title: yup.string().required().max(20),
    description: yup.string().required().max(100)
});

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.data.title,
            description: this.props.data.description,
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
            }
        }).catch(err => {
            this.setState({errors: [], isSubmitting: false});
            this.setState({errors: this.state.errors.concat(err.errors)});
        })
    };

    componentDidUpdate() {
        if (this.state.isSubmitting) {
            this.updateNote();
        }

    }

    updateNote = async () => {
        let dataToSubmit = {title: this.state.title, description: this.state.description};
        const pid = this.props.router.query.id;
        try {
            await axios.put(`/api/notes/${pid}`, dataToSubmit);
        }catch (e) {
            console.log(e);
        }
        console.log('1');
        await this.props.router.push('/');
    };

    render() {
        return (
            <div className="container">
                <h1>Update Note</h1>
                <div>
                    {
                        this.state.isSubmitting
                            ? <Spinner color="success" className="spinner" />
                            :<Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label sm={2}>Title</Label>
                                    <Col sm={8}>
                                        <Input
                                            type="text"
                                            name="title"
                                            placeholder="type here"
                                            onChange={this.handleChang}
                                            value={this.state.title}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label sm={2}>Description</Label>
                                    <Col sm={8}>
                                        <Input
                                            type="textarea"
                                            name="description"
                                            placeholder="type here"
                                            onChange={this.handleChang}
                                            value={this.state.description}
                                        />
                                    </Col>
                                </FormGroup>
                                {this.state.errors.length > 0
                                    ? this.state.errors.map(e => <li className="errors">{e}</li>) : null}
                                <Button type="submit">Update</Button>

                            </Form>
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(Edit);

export async function getServerSideProps(context) {
    // Fetch necessary data for the blog post using params.id
    const id = context.params.id;
    const { data } = await getNoteById(id);
    return {props: {data}}
}