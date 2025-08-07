import IconLogo from "../../assets/images/icons/logo.svg?react";
import IconMenu from "../../assets/images/icons/burger-regular.svg?react";
import IconClose from "../../assets/images/icons/close.svg?react";

import style from "./Navigation.module.css";
import { useToggle } from "../../hooks/useToggle.js";
import NavLinks from "./NavLinks.jsx";
import { NavLink } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu.jsx";
import AuthNav from "../AuthNav/AuthNav.jsx";
import { useEffect } from "react";
import clsx from "clsx";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import { useSelector } from "react-redux";

const Navigation = () => {
  const { isOpen, open, close } = useToggle();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const setActiveClassBtn = ({ isActive }) => {
    return clsx(style.createLink, isActive && style.activeCreate);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1440 && isOpen) {
        close();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, close]);

  return (
    <div className={style.wrap}>
      <div className={style.wrapper}>
        <nav className={style.nav}>
          <NavLink to="/">
            <IconLogo className={style.logo} />
          </NavLink>
          <div className={style.desktopLinks}>
            <NavLinks />
          </div>
          <div className={style.tabletSet}>
            {isLoggedIn ? (
              <NavLink to="/create" className={setActiveClassBtn}>
                Create an article
              </NavLink>
            ) : (
              <NavLink to="/register" className={setActiveClassBtn}>
                Join now
              </NavLink>
            )}
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
          </div>
        </nav>
        <div className={style.userMenu}>
          {isLoggedIn ? (
            <UserMenu onClick={close} />
          ) : (
            <AuthNav onClick={close} />
          )}
        </div>
      </div>

      {isOpen && (
        <div className={style.mobileMenu}>
          <NavLinks onClick={close} />
          {isLoggedIn ? (
            <UserMenu onClick={close} />
          ) : (
            <AuthNav onClick={close} />
          )}
        </div>
      )}
    </div>
  );
};

export default Navigation;
