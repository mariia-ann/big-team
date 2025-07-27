import { NavLink } from "react-router-dom";
import style from "./AuthNav.module.css";
import clsx from "clsx";

const AuthNav = ({ onClick }) => {
  const setActiveClass = ({ isActive }) => {
    return clsx(style.linkLogin, isActive && style.active);
  };
    const setActiveClassReg = ({ isActive }) => {
    return clsx(style.linkRegister, isActive && style.activeReg);
  };

  return (
    <div className={style.nav}>
      <NavLink
        to="/login"
        onClick={onClick}
        className={setActiveClass}
      >
        Log in
      </NavLink>
      <NavLink
        to="/register"
        onClick={onClick}
        className={setActiveClassReg}
      >
        Join now
      </NavLink>
    </div>
  );
};

export default AuthNav;
