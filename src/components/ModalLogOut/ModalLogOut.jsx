import style from "./ModalLogOut.module.css";
import IoClose from "../../assets/images/icons/close.svg?react";

const ModalLogOut = ({ onClose, onLogOut }) => {
  return (
    <div className={style.backdrop}>
      <div className={style.modal}>
        <button className={style.closeBtn} onClick={onClose} aria-label="Close modal">
          <IoClose />
        </button>
        <h2 className={style.title}>Are you shure?</h2>
        <p className={style.text}>
          We will miss you!
        </p>
        <div className={style.buttons}>
          <button className={style.loginBtn} onClick={onLogOut}>Log out</button>
          <button className={style.registerBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogOut;
