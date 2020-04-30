import axios from 'axios';


export async function getStaticProps() {
    const res = await axios.get('http://localhost:3000/api/notes');
    const { data } = await res;
    console.log(data);
    return {
        props: {
            data
        },
    }
}

const Book = ({ data }) => {
    return (
        <div className="container">
            {data.data.map(book => (
                <li key={book._id}>{book.title}</li>
            ))}
        </div>
    )
};

export default Book;