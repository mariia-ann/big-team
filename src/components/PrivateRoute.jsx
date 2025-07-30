import { useSelector } from "react-redux";
import AuthModal from "./ModalErrorSave/ModalErrorSave.jsx";
import { selectIsLoggedIn } from "../redux/auth/selectors.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setShowModal(true);
    }
  }, [isLoggedIn]);

  const handleClose = () => {
    setShowModal(false);
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (!isLoggedIn && showModal) {
    return <AuthModal onClose={handleClose} />;
  }
  return children;
};

export default PrivateRoute;
