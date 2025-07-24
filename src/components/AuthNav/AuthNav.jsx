import { NavLink } from "react-router-dom";
import style from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <div className={style.nav}>
        <NavLink to="/login" className={style.link}>Log in</NavLink>
        <NavLink to="/register" className={style.link}>Join now</NavLink>
    </div>
  )
}

export default AuthNav