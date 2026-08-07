import Navbar from "./Navbar";

function Layout({ children }) {

    return (

        <>

            <Navbar />

            <main className="main-layout">

                {children}

            </main>

        </>

    );

}

export default Layout;