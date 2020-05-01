import Link from "next/link";
import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import { getAllNotes } from "../store/allNotes";
import axios from "axios";



// export async function getStaticProps() {
//     const notes = await getAllNotes();
//     return {
//         props: {
//             notes
//         },
//     }
// }

const Index = ({notes}) => {
    return (
       <div className="container">
        <h1>Notes</h1>
    <Row className="mt-5">
        {notes.map(note => {
            return (
                <Col sm="6" key={note._id} className="mt-2 text-center">
                    <Card>
                        <CardBody>
                            <CardTitle>
                                {note.title}
                            </CardTitle>
                            <Row>
                                <Col xs="6">
                                    {/*<Link href="/[id]" as={`/${note._id}`}>*/}
                                        <Button block color="primary">View</Button>
                                    {/*</Link>*/}
                                </Col>
                                <Col>
                                    {/*<Link href="/[id]/edit" as={`/${note._id}/edit`}>*/}
                                        <Button block color="primary">Edit</Button>
                                    {/*</Link>*/}
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            )
        })}
    </Row>
    </div>
    )
}

export default Index;

Index.getInitialProps = async () => {
    const res = await axios.get(`${process.env.URI}/api/notes`);
    const { data } = await res.data;
    return { notes: data }
}