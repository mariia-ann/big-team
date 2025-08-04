import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import Container from "../Container/Container";
import style from "./HeroSection.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const HeroSection = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <section className={style.section}>
      <Container>
        <div className={style.wrapper}>
          <div className={style.content}>
            <h1 className={style.title}>
              Find your <span className={style.fixte}>harmony</span> in community
            </h1>

            <div className={clsx(style.buttonGroup, isLoggedIn && style.alignBottom)}>
              <NavLink to="/articles" className={style.button}>
                <p className={style.text}>Go to Articles</p>
              </NavLink>

              {!isLoggedIn && (
                <NavLink to="/register" className={clsx(style.button, style.registerBtn)}>
                  <p className={style.textRegister}>Register</p>
                </NavLink>
              )}
            </div>
          </div>

          <div className={style.image}></div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
