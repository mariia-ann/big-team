import css from "./FooterNavigation.module.css";

function FooterNavigation() {
  return (
    <>
      <ul className={css.footerNav}>
        <li className={css.footerNavItem}>
          <a className={css.footerNavLink} href="articles">
            Articles
          </a>
        </li>
        <li className={css.footerNavItem}>
          <a className={css.footerNavLink} href="account">
            Account
          </a>
        </li>
      </ul>
    </>
  );
}

export default FooterNavigation;
