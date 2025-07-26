import FooterNavigation from "./FooterNavigation.jsx";
import IconFooterLogo from "../../assets/images/icons/logo.svg?react";
import Container from "../Container/Container.jsx";
import css from "./Footer.module.css";
import CustomerRightsInfo from "./CustomerRightsInfo.jsx";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={css.footerSection}>
      <Container className={css.footerContainer}>
        <NavLink to="/">
          <IconFooterLogo className={css.logo} />
        </NavLink>
        <CustomerRightsInfo />
        <FooterNavigation />
      </Container>
    </footer>
  );
};

export default Footer;
