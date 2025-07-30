import { useEffect } from "react";
import s from "./ModalErrorSave.module.css";
import IoClose from "../../assets/images/icons/close.svg?react";
import { NavLink } from "react-router-dom";

const AuthModal = ({ onClose }) => {
  // Закриття по Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Закриття по бекдропу
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Клік по Login
  const handleLogin = () => {
    window.location.href = "/login";
  };

  // Клік по Register
  const handleRegister = () => {
    window.location.href = "/register";
  };

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={onClose}>
          <IoClose />
        </button>
        <h2 className={s.title}>Error while saving</h2>
        <p className={s.text}>
          To save this article, you need to <br /> authorize first
        </p>
        <div className={s.buttons}>
          <NavLink to="/login" className={s.loginBtn}>
            Login
          </NavLink>
          <NavLink to="/register" className={s.registerBtn}>
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;

