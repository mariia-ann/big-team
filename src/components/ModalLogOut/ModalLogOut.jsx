import style from "./ModalLogOut.module.css";
import IoClose from "../../assets/images/icons/close.svg?react";
import { logoutThunk } from "../../redux/auth/operations.js";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ModalLogOut = ({ onClose }) => {
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        toast.success("You’ve been logged out.");
        close();
      })
      .catch(() => {
        toast.error("Failed to log out. Please try again.");
      });
  };

  return (
    <div className={style.backdrop}>
      <div className={style.modal}>
        <button
          className={style.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <IoClose />
        </button>
        <h2 className={style.title}>Are you shure?</h2>
        <p className={style.text}>We will miss you!</p>
        <div className={style.buttons}>
          <button
            className={style.loginBtn}
            onClick={handleLogOut}
          >
            Log out
          </button>
          <button className={style.registerBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalLogOut;
