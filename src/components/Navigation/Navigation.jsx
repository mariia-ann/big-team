import IconLogo from "../../assets/images/icons/logo.svg?react";
import IconMenu from "../../assets/images/icons/burger-regular.svg?react";
import IconClose from "../../assets/images/icons/close.svg?react";

import style from "./Navigation.module.css";
import { useToggle } from "../../hooks/useToggle.js";
import NavLinks from "./NavLinks.jsx";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  const { isOpen, open, close } = useToggle();


  return (
    <>
      <div className={style.wrapper}>
        <nav className={style.nav}>
          <NavLink to="/">
            <IconLogo className={style.logo} />
          </NavLink>
          <div className={style.desktopLinks}>
            <NavLinks />
          </div>
          <button
          className={style.buttonMenuToggle}
          onClick={isOpen ? close : open}
        >
          {isOpen ? (
            <IconClose className={style.menuToggleIcon} />
          ) : (
            <IconMenu className={style.menuToggleIcon} />
          )}
        </button>
        </nav>        
      </div>

      {isOpen && (
        <div className={style.mobileMenu}>
          <NavLinks onClick={close} />
        </div>
      )}
    </>
  );
};

export default Navigation;
