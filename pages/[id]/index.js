import React, {Component} from 'react';
import axios from 'axios';
import {getAllPaths, getNoteById} from "../../store/allNotes";
import {Button, Modal, ModalBody, ModalFooter, Spinner} from 'reactstrap';
import { withRouter } from "next/router";

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            isDeleting: false
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    };

    componentDidUpdate() {
        if (this.state.isDeleting) {
            this.deleteNote();
        }
    }

    deleteNote = async () => {
        const pid = this.props.router.query.id;
        try {
            await axios.delete(`/api/notes/${pid}`);
        }catch (e) {
            console.log(e);
        }
        await this.props.router.push('/');
    };

    handleDelete = () => {
        this.setState({
                isDeleting: true
        });
    };

    render() {
        return (
            <div className="container text-center">
                {this.state.isDeleting
                    ? <Spinner color="success" className="spinner" />
                    : <>
                        <h1>{this.props.data.title}</h1>
                        <p>{this.props.data.description}</p>
                        <Button className="btn-danger" onClick={this.toggle}>Delete</Button>
                        <Modal isOpen={this.state.modal} toggle={this.toggle}>
                            <ModalBody>
                                Are you sure?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleDelete}>Delete</Button>{' '}
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </>
                }
            </div>
        );
    }
}

export default withRouter(Note);




export async function getStaticPaths() {
    // Return a list of possible value for id (paths = [{params: {id: 'ssg-ssr'}}, {params: {id: 'pre-rendering'}}])
    const paths = await getAllPaths();
    // const paths = [{params: {id: 'ssg-ssr'}}, {params: {id: 'pre-rendering'}}]
    return {
        paths,
        fallback: false
    }
}
export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const { data } = await getNoteById(params.id);
    return {props: {data}}
}