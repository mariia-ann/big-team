// import { useDispatch, useSelector } from "react-redux"
// import { selectUser } from "../../redux/auth/selectors";
// import { logOut } from "../../redux/auth/operations";
import style from "./UserMenu.module.css";

const UserMenu = () => {
    // const dispatch = useDispatch();
    // const user = useSelector(selectUser);

  return (
    <div className={style.userMenu}>
        <p className={style.profile}>My Profile</p>
        <button className={style.btn} type="button">Create an article</button>
        <p className={style.profile}>Name</p>
        <button className={style.btn} type="button">Log Out</button>
    </div>
  )
}

export default UserMenu