import Container from "../Container/Container";
import style from "./HeroSection.module.css";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className={style.section}>
      <Container>
        <div className={style.wrapper}>
          <div className={style.content}>
            <h1 className={style.title}>
              Find your <span className={style.fixte}>harmony</span> in community
            </h1>
            <div className={style.buttonGroup}>
              <a href="#popular-articles" className={style.button}>
                <p className={style.text}>Go to Articles</p>
              </a>
              <Link to="/register" className={`${style.button} ${style.registerBtn}`}>
                <p className={style.textRegister}>Register</p>
              </Link>
            </div>
          </div>
          <div className={style.image}></div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;