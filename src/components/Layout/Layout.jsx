import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import AuthModal from "../ModalErrorSave/ModalErrorSave.jsx";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <AuthModal />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
