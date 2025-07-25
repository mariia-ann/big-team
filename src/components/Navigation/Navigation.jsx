import { NavLink } from "react-router-dom"
import IconLogo from "../../assets/images/icons/logo.svg?react";

const Navigation = () => {
  return (
    <nav>
      <NavLink to="/">
        <IconLogo />
      </NavLink>
      Navigation</nav>
  )
}

export default Navigation