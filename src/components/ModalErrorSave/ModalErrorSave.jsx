import s from "./ModalErrorSave.module.css";
import IoClose from "../../assets/images/icons/close.svg?react";

const AuthModal = ({ onClose }) => {
  return (
    <div className={s.backdrop}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={onClose}>
          <IoClose />
        </button>
        <h2 className={s.title}>Error while saving</h2>
        <p className={s.text}>
          To save this article, you need to <br /> authorize first
        </p>
        <div className={s.buttons}>
          <button className={s.loginBtn}>Login</button>
          <button className={s.registerBtn}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
