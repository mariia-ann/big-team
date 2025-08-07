import { Link } from "react-router-dom";
import st from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={st.wrapper}>
      <h1 className={st.title}>Oops! Page not found</h1>
      <p className={st.text}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" className={st.button}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
