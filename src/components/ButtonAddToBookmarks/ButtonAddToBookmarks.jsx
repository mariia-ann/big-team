import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useToggle } from "../../hooks/useToggle.js";
import s from "./ButtonAddToBookmarks.module.css";
import { selectIsLoggedIn, selectUserId } from "../../redux/auth/selectors.js";
import {
  selectBookmarks,
  selectBookmarksLoading,
} from "../../redux/bookmarks/selectors.js";
import { addBookmark, removeBookmark } from "../../redux/bookmarks/operations.js";
import AuthModal from "../ModalErrorSave/ModalErrorSave.jsx";
import BookmarkIcon from "../../assets/images/icons/bookmark.svg?react";
import { ClipLoader } from "react-spinners";

const ButtonAddToBookmarks = ({ articleId }) => {
  const { isOpen, close, open } = useToggle();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const bookmarks = useSelector(selectBookmarks).map(String);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const [isLoading, setIsLoading] = useState(false);

  const normalizedArticleId = String(articleId);
  const isBookmarked = bookmarks.includes(normalizedArticleId);

  if (bookmarksLoading) {
    return (
      <button className={s.button} disabled>
        <ClipLoader color="#aaa" size={16} />
      </button>
    );
  }

  const handleClick = async (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      open();
      return;
    }
    if (!userId) return;

    setIsLoading(true);
    try {
      if (isBookmarked) {
        await dispatch(
          removeBookmark({ userId, articleId: normalizedArticleId })
        ).unwrap();
        toast.success("Article removed from favorites!", { className: "custom-toast custom-toast-success" });
      } else {
        await dispatch(
          addBookmark({ userId, articleId: normalizedArticleId })
        ).unwrap();
        toast.success("Article added to favorites!", { className: "custom-toast custom-toast-success" });
      }
    } catch (err) {
      if (
        err?.status === 400 ||
        err?.code === 400 ||
        (typeof err === "string" && err.includes("400"))
      ) {
        toast.error("This article is already in your favorites.", { className: "custom-toast custom-toast-error" });
      } else {
        toast.error("Something went wrong. Please try again.", { className: "custom-toast custom-toast-error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`${s.button} ${isBookmarked ? s.active : ""}`}
        aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        title={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
        type="button"
        disabled={isLoading}
      >
        {isLoading ? (
          <ClipLoader color="#ffffff" size={16} />
        ) : (
          <BookmarkIcon className={s.buttonIcon} size={24} />
        )}
      </button>
      {!isLoggedIn && isOpen && <AuthModal onClose={close} />}
    </>
  );
};

export default ButtonAddToBookmarks;









