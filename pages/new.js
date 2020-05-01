// import Link from "next/link";
// import { useState, useEffect } from 'react';
import React, {Component} from 'react';
import axios from 'axios';
// import fetch from 'isomorphic-unfetch';
// import { useRouter } from "next/router";
import {Form, Spinner, FormGroup, Input, Label, Col, Button, FormFeedback} from "reactstrap";
import { string, object} from "yup";
import {withRouter} from "next/router";

let yup = require('yup');

const schema = yup.object().shape({
    title: yup.string().required().max(20),
    description: yup.string().required().max(100)
});

// const NewNote = () => {
//     const [form, setForm] = useState({ title: '', description: ''});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [errors, setErrors] = useState({});
//     const router = useRouter();
//
//     useEffect(() => {
//        if (isSubmitting) {
//            if (Object.keys(errors).length === 0) {
//                createNote();
//            } else {
//                setIsSubmitting(false);
//            }
//        }
//     }, [errors]);
//
//     const createNote = async () => {
//         // let data = JSON.stringify(form);
//         try {
//             const res = await fetch(`${process.env.URI}/api/notes`, {
//                 method: 'POST',
//                 headers: {
//                     "Accept": "application/json",
//                     "Content-type": "application/json"
//                 },
//                 body: JSON.stringify(form)
//             });
//             await router.push('/');
//         }catch (e) {
//             console.log(e);
//         }
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         validate();
//         setIsSubmitting(true);
//     };
//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         })
//     };
//
//     const validate = () => {
//         let err = {};
//         let dataToSubmit = {title: form.title, description: form.description};
//         schema.validate(dataToSubmit, {abortEarly: false}).then(valid => {
//             if(valid){
//                 setErrors(err);
//             }
//         }).catch(err => {
//             setErrors(err);
//         });
//
//     };
//
//     return (
//         <div className="container">
//             <h1>Create Note</h1>
//             <div>
//                 {
//                     isSubmitting
//                         ? <Spinner color="success" className="spinner" />
//                         :<Form onSubmit={handleSubmit}>
//                             <FormGroup row>
//                                 <Label sm={2}>Title</Label>
//                                 <Col sm={8}>
//                                     <Input type="text" name="title" placeholder="type here" onChange={handleChange} />
//                                 </Col>
//                             </FormGroup>
//                             <FormGroup row>
//                                 <Label sm={2}>Description</Label>
//                                 <Col sm={8}>
//                                     <Input type="textarea" name="description" placeholder="type here" onChange={handleChange} />
//                                 </Col>
//                             </FormGroup>
//                             {errors.length > 0
//                                 ? errors.map(e => <li className="errors">{e}</li>) : null}
//                             <Button type="submit">Create</Button>
//
//                         </Form>
//                 }
//             </div>
//         </div>
//     )
// };
// export default NewNote;



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
            const res = await axios.post(`https://morning-springs-53145.herokuapp.com/api/notes`, data);
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