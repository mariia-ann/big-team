import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import style from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={style.layout}>
      <Header />
      <main className={style.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
