import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import s from "./ModalErrorSave.module.css";
import IoClose from "../../assets/images/icons/close.svg?react";

const AuthModal = ({ onClose }) => {
  const navigate = useNavigate();

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
    onClose(); // закрити модалку
    navigate("/login");
  };

  // Клік по Register
  const handleRegister = () => {
    onClose(); // закрити модалку
    navigate("/register");
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
          <button onClick={handleLogin} className={s.loginBtn}>
            Login
          </button>
          <button onClick={handleRegister} className={s.registerBtn}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;


