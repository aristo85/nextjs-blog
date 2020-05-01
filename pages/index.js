import Link from "next/link";
import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import { getAllNotes } from "../store/allNotes";

export async function getStaticProps() {
    const notes = await getAllNotes();
    return {
        props: {
            notes
        },
    }
}

export default function Index({notes}) {
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
                                    {/*<Link href={`/${note._id}`}>*/}
                                        <Button block color="primary">View</Button>
                                    {/*</Link>*/}
                                </Col>
                                <Col>
                                    {/*<Link href={`/${note._id}/edit`}>*/}
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