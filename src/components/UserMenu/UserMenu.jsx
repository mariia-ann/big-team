import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import { NavLink } from "react-router-dom";
import style from "./UserMenu.module.css";
import IconLogout from "../../assets/images/icons/log-out.svg?react";
import defaultAvatar from "../../assets/images/defaultAvatar/default-avatar.png";
import clsx from "clsx";
import { useToggle } from "../../hooks/useToggle.js";
import ModalLogOut from "../ModalLogOut/ModalLogOut.jsx";

const UserMenu = ({ onClick }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const user = useSelector(selectUser);
  const { isOpen, open, close } = useToggle();

  const setActiveClassCreate = ({ isActive }) => {
    return clsx(style.createLink, isActive && style.activeCreate);
  };
  const setActiveClassProfile = ({ isActive }) => {
    return clsx(style.profileLink, isActive && style.active);
  };

  if (!isLoggedIn) return null;

  return (
    <div className={style.userMenu}>
      <NavLink
        to={`/profile`}
        onClick={onClick}
        className={setActiveClassProfile}
      >
        My Profile
      </NavLink>
      <NavLink to="/create" onClick={onClick} className={setActiveClassCreate}>
        Create an article
      </NavLink>
      <div className={style.blockData}>
        <div className={style.userData}>
          <img
            className={style.photo}
            alt={user.name || "User"}
            src={user.avatarUrl || defaultAvatar}
            width="40px"
            height="40px"
          />
          <p className={style.name}>{user.name}</p>
        </div>
        <div className={style.line}></div>
        <button
          className={style.btnLogout}
          // onClick={() => dispatch(logoutThunk())}
          onClick={open}
          type="button"
        >
          <IconLogout className={style.iconLogout} />
        </button>
      </div>
      {isOpen && (<ModalLogOut onClose={close} />)}
    </div>
  );
};

export default UserMenu;
