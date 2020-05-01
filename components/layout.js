import Head from "next/head";
import Navbar from './navbar';

const Layout = ({ children }) => (
    <>
        <Head>
            <title>Next Mongo App</title>
        </Head>
        <Navbar />
        {children}
    </>
);

export default Layout;