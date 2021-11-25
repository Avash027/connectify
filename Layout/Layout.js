import Head from "next/head";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = ({ user, children }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      {false && <Navbar user={user}></Navbar>}
      {user && <Header user={user}></Header>}
      {children}
    </>
  );
};

export default Layout;
