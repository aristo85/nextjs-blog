import axios from 'axios';


export async function getStaticProps() {
    const res = await axios.get('https://spring-boot-mysql-server-part0.herokuapp.com/api/books');
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
            {data.map(book => (
                <li key={book.id}>{book.title}</li>
            ))}
        </div>
    )
};

export default Book;