import { useSelector, useDispatch } from "react-redux";
import { useToggle } from "../../hooks/useToggle.js";
import s from "./ButtonAddToBookmarks.module.css";
import { selectIsLoggedIn, selectUserId } from "../../redux/auth/selectors.js";
import { selectBookmarks } from "../../redux/bookmarks/selectors.js";
import { addBookmark, removeBookmark, fetchBookmarks } from "../../redux/bookmarks/operations.js";
import AuthModal from "../ModalErrorSave/ModalErrorSave.jsx";
import BookmarkIcon from "../../assets/images/icons/bookmark.svg?react";
import { useEffect } from "react";

const ButtonAddToBookmarks = ({ articleId }) => {
  const { isOpen, close, open } = useToggle();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const bookmarks = useSelector(selectBookmarks);

  
  useEffect(() => {
    if (isLoggedIn && userId) {
      dispatch(fetchBookmarks(userId));
    }
  }, [dispatch, isLoggedIn, userId]);

  const isBookmarked = bookmarks.includes(articleId);

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      open();
      return;
    }
    if (!userId) return;

    if (isBookmarked) {
      dispatch(removeBookmark({ userId, articleId }));
    } else {
      dispatch(addBookmark({ userId, articleId }));
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${s.button} ${isBookmarked ? s.active : ""}`}
        aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        <BookmarkIcon className={s.buttonIcon} size={24} />
      </button>
      {!isLoggedIn && isOpen && <AuthModal onClose={close} />}
    </>
  );
};

export default ButtonAddToBookmarks;
