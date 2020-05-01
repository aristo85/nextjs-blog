import Link from "next/link";
import { Card, CardBody, CardTitle, Button, Row, Col } from "reactstrap";
import axios from "axios";

export async function getStaticProps() {
    const res = await axios.get(process.env.URI);
    const { data } = await res;
    console.log(data.data);
    return {
        props: {
            notes: data.data
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