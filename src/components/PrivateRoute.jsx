import { useSelector } from "react-redux"
import AuthModal from "./ModalErrorSave/ModalErrorSave.jsx";
import { selectIsLoggedIn } from "../redux/auth/selectors.js";

const PrivateRoute = ({children}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) {
    return <AuthModal />
  }
  return children;
}

export default PrivateRoute