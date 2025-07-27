// import { useDispatch, useSelector } from "react-redux"
// import { selectUser } from "../../redux/auth/selectors";
// import { logOut } from "../../redux/auth/operations";
import { NavLink } from "react-router-dom";
import style from "./UserMenu.module.css";

const UserMenu = () => {
  // const dispatch = useDispatch();
  // const user = useSelector(selectUser);

  return (
    <div className={style.userMenu}>
      <NavLink to="/profile" className={style.profile}>My Profile</NavLink>
      <button className={style.btn} type="button">
        Create an article
      </button>
      <p className={style.profile}>Name</p>
      <button className={style.btn} type="button">
        Log Out
      </button>
      {/* <button type="button" onClick={() => dispatch(logOut())}>
        Log Out
      </button> */}
    </div>
  );
};

export default UserMenu;
