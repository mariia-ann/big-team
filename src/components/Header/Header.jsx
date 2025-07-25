import Container from "../Container/Container.jsx";
import Navigation from "../Navigation/Navigation.jsx";
import style from "./Header.module.css";

const Header = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header className={style.header}>
      <Container>
        <Navigation />
        {/* {isLoggedIn ? <UserMenu /> : <AuthNav />} */}
      </Container>
    </header>
  );
};

export default Header;
