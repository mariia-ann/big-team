import Container from "../Container/Container.jsx";
import Navigation from "../Navigation/Navigation.jsx";

const Header = () => {
  // const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <header>
      <Container>
        <Navigation />
        {/* {isLoggedIn ? <UserMenu /> : <AuthNav />} */}
      </Container>
    </header>
  );
};

export default Header;
