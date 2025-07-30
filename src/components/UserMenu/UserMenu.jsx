import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../redux/auth/selectors";
import { logoutThunk } from "../../redux/auth/operations";
import { NavLink } from "react-router-dom";
import style from "./UserMenu.module.css";
import IconLogout from "../../assets/images/icons/log-out.svg?react";
import clsx from "clsx";

const UserMenu = ({ onClick }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const setActiveClassCreate = ({ isActive }) => {
    return clsx(style.createLink, isActive && style.activeCreate);
  };
  const setActiveClassProfile = ({ isActive }) => {
    return clsx(style.profileLink, isActive && style.active);
  };

  return (
    <div className={style.userMenu}>
      <NavLink
        to="/profile"
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
            alt="photo"
            src={user.avatarUrl}
            width="40px"
            height="40px"
          />
          <p className={style.name}>
            {user.name}
          </p>
        </div>
        <div className={style.line}></div>
        <button className={style.btnLogout} onClick={() => dispatch(logoutThunk())} type="button">
          <IconLogout className={style.iconLogout} />
        </button>
        {/* <button type="button" onClick={() => dispatch(logOut())}>
        Log Out
      </button> */}
      </div>
    </div>
  );
};

export default UserMenu;
