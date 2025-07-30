import { Link } from "react-router-dom";
import css from "./FooterNavigation.module.css";

function FooterNavigation() {
  return (
    <>
      <ul className={css.footerNav}>
        <li className={css.footerNavItem}>
          <Link className={css.footerNavLink} to="/articles">
            Articles
          </Link>
        </li>
        <li className={css.footerNavItem}>
          <Link className={css.footerNavLink} to="/profile">
            Account
          </Link>
        </li>
      </ul>
    </>
  );
}

export default FooterNavigation;
