import { useSelector } from "react-redux";
import { useToggle } from "../../hooks/useToggle.js";
import s from "./ButtonAddToBookmarks.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors.js";
import AuthModal from "../ModalErrorSave/ModalErrorSave.jsx";
import BookmarkIcon from "../../assets/images/icons/bookmark.svg?react"

const ButtonAddToBookmarks = ({ articleId }) => {
  const { isOpen, close, open } = useToggle();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      open();
      return;
    }
    // тут буде логіка для авторизованого користувача (додати в закладки)
  };

  return (
    <>
      <button onClick={handleClick} className={s.button}>
        <BookmarkIcon className={s.buttonIcon} size={24} />
      </button>
      {!isLoggedIn && isOpen && <AuthModal onClose={close} />}
    </>
  );
};

export default ButtonAddToBookmarks;