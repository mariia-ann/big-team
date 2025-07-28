import { NavLink } from "react-router-dom";
import style from "./NavLinks.module.css";
import clsx from "clsx";

const NavLinks = ({ onClick }) => {
  const setActiveClass = ({ isActive }) => {
    return clsx(style.link, isActive && style.active);
  };
  return (
    <ul className={style.navList}>
      <li>
        <NavLink to="/" onClick={onClick} className={setActiveClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/articles" onClick={onClick} className={setActiveClass}>
          Articles
        </NavLink>
      </li>
      <li>
        <NavLink to="/authors" onClick={onClick} className={setActiveClass}>
          Creators
        </NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
