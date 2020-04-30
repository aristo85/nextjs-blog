import axios from 'axios';


export async function getServerSideProps() {
    const res = await axios.get(`${process.env.VERCEL_URL}/api/notes`);
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
            hi
            {/*{data.data.map(book => (*/}
            {/*    <li key={book._id}>{book.title}</li>*/}
            {/*))}*/}
        </div>
    )
};

export default Book;