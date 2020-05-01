import axios from 'axios';


export async function getStaticProps() {
    const res = await axios.get(process.env.URI);
    const { data } = await res;
    console.log(data.data);
    return {
        props: {
            data: data.data
        },
    }
}

const Book = ({ data }) => {
    return (
        <div className="container">
            hi
            {data.map(book => (
                <li key={book._id}>{book.title}</li>
            ))}
        </div>
    )
};

export default Book;