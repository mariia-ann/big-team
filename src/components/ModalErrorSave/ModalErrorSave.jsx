import s from "./ModalErrorSave.module.css";
import IoClose from "../../assets/images/icons/close.svg?react";
import { NavLink } from "react-router-dom";

const ModalErrorSave = ({ onClose }) => {
  return (
    <div className={s.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={onClose}>
          <IoClose />
        </button>
        <h2 className={s.title}>Error while saving</h2>
        <p className={s.text}>
          To save this article, you need to <br /> authorize first
        </p>
        <div className={s.buttons}>
          <NavLink to="/login" className={s.loginBtn} onClick={onClose}>
            Login
          </NavLink>
          <NavLink to="/register" className={s.registerBtn} onClick={onClose}>
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ModalErrorSave;



