import { Link } from "react-router-dom";
import css from "./FooterNavigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { useToggle } from "../../hooks/useToggle.js";
import AuthModal from "../ModalErrorSave/ModalErrorSave.jsx";

function FooterNavigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { isOpen, open, close } = useToggle();

  const handleAccountClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      open();
    }
  };

  return (
    <>
      <ul className={css.footerNav}>
        <li className={css.footerNavItem}>
          <Link className={css.footerNavLink} to="/articles">
            Articles
          </Link>
        </li>
        <li className={css.footerNavItem}>
          <Link
            className={css.footerNavLink}
            to="/profile"
            onClick={handleAccountClick}
          >
            Account
          </Link>
        </li>
      </ul>
      {isOpen && <AuthModal onClose={close} />}
    </>
  );
}

export default FooterNavigation;
