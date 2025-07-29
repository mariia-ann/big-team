import Container from "../Container/Container.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import style from "./Header.module.css";

const Header = () => {

  return (
    <header className={style.header}>
      <Container>
        <Navigation />
      </Container>
    </header>
  );
};

export default Header;
