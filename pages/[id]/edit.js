import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from "next/router";
import {Form, Spinner, FormGroup, Input, Label, Col, Button, FormFeedback} from "reactstrap";
import { string, object} from "yup";
import {getAllPaths, getNoteById} from "../../store/allNotes";
//
// let yup = require('yup');
//
// const schema = yup.object().shape({
//     title: yup.string().required().max(20),
//     description: yup.string().required().max(100)
// });

class Edit extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         title: this.props.data.title,
    //         description: this.props.data.description,
    //         errors: [],
    //         isSubmitting: false,
    //     }
    // }
    //
    // handleChang = (e) => {
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     });
    // };
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     let dataToSubmit = {title: this.state.title, description: this.state.description};
    //     schema.validate(dataToSubmit, {abortEarly: false}).then(valid => {
    //         if(valid){
    //             this.setState({errors: [], isSubmitting: true});
    //             this.updateNote(dataToSubmit);
    //         }
    //     }).catch(err => {
    //         console.log(err.errors[0])
    //
    //         this.setState({errors: [], isSubmitting: false});
    //         this.setState({errors: this.state.errors.concat(err.errors)});
    //     })
    // };
    //
    // updateNote = async (data) => {
    //     const pid = this.props.data._id;
    //     try {
    //         const res = await axios.put(`${process.env.URI}/api/notes/${pid}`, data);
    //         this.props.router.push('/')
    //     }catch (e) {
    //         console.log(e);
    //     }
    // };

    render() {
        return (
            <div className="container">
                <h1>Update Note</h1>
                {/*<div>*/}
                {/*    {*/}
                {/*        this.state.isSubmitting*/}
                {/*            ? <Spinner color="success" className="spinner" />*/}
                {/*            :<Form onSubmit={this.handleSubmit}>*/}
                {/*                <FormGroup row>*/}
                {/*                    <Label sm={2}>Title</Label>*/}
                {/*                    <Col sm={8}>*/}
                {/*                        <Input*/}
                {/*                            type="text"*/}
                {/*                            name="title"*/}
                {/*                            placeholder="type here"*/}
                {/*                            onChange={this.handleChang}*/}
                {/*                            value={this.state.title}*/}
                {/*                        />*/}
                {/*                    </Col>*/}
                {/*                </FormGroup>*/}
                {/*                <FormGroup row>*/}
                {/*                    <Label sm={2}>Description</Label>*/}
                {/*                    <Col sm={8}>*/}
                {/*                        <Input*/}
                {/*                            type="textarea"*/}
                {/*                            name="description"*/}
                {/*                            placeholder="type here"*/}
                {/*                            onChange={this.handleChang}*/}
                {/*                            value={this.state.description}*/}
                {/*                        />*/}
                {/*                    </Col>*/}
                {/*                </FormGroup>*/}
                {/*                {this.state.errors.length > 0*/}
                {/*                    ? this.state.errors.map(e => <li className="errors">{e}</li>) : null}*/}
                {/*                <Button type="submit">Update</Button>*/}

                {/*            </Form>*/}
                {/*    }*/}
                {/*</div>*/}
            </div>
        );
    }
}

// export default withRouter(Edit);
//
// export async function getStaticPaths() {
//     // Return a list of possible value for id (paths = [{params: {id: 'ssg-ssr'}}, {params: {id: 'pre-rendering'}}])
//     const paths = await getAllPaths();
//     // const paths = [{params: {id: 'ssg-ssr'}}, {params: {id: 'pre-rendering'}}]
//     return {
//         paths,
//         fallback: false
//     }
// }
// export async function getStaticProps({ params }) {
//     // Fetch necessary data for the blog post using params.id
//     const { data } = await getNoteById(params.id);
//     return {props: {data}}
// }