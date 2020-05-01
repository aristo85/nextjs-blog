import React, {Component} from 'react';
import axios from 'axios';
import {getAllPaths, getNoteById} from "../../store/allNotes";
import {Button, Modal, ModalBody, ModalFooter, Spinner} from 'reactstrap';
import { withRouter } from "next/router";

class Note extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         modal: false,
    //         isDeleting: false
    //     }
    // }
    //
    // toggle = () => {
    //     this.setState({
    //         modal: !this.state.modal
    //     })
    // };
    //
    // handleDelete = () => {
    //     const pid = this.props.router.query.id;
    //     try {
    //         axios.delete(`${process.env.URI}/api/notes/${pid}`);
    //         this.setState({
    //             isDeleting: true
    //         });
    //         this.props.router.push('/');
    //     }catch (e) {
    //         console.log(e);
    //     }
    // };

    render() {
        return (
            <div className="container text-center">
                hi
            </div>
        );
    }
}

export default withRouter(Note);



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