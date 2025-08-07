import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToggle } from "../../hooks/useToggle.js";
import s from "./ButtonAddToBookmarks.module.css";
import { selectIsLoggedIn, selectUserId } from "../../redux/auth/selectors.js";
import {
  selectBookmarks,
  selectBookmarksLoading,
} from "../../redux/bookmarks/selectors.js";
import {
  addBookmark,
  removeBookmark,
} from "../../redux/bookmarks/operations.js";
import AuthModal from "../ModalErrorSave/ModalErrorSave.jsx";
import BookmarkIcon from "../../assets/images/icons/bookmark.svg?react";
import EditIcon from "../../assets/images/icons/edit.svg?react";

import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { fetchAuthorSavedArticles } from "../../redux/author/operations.js";
// import { selectArticleById } from "../../redux/author/selectors.js";
// import { useNavigate } from "react-router-dom";

const ButtonAddToBookmarks = ({ articleId }) => {
  // const navigate = useNavigate();
  const { isOpen, close, open } = useToggle();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const bookmarks = useSelector(selectBookmarks).map(String);
  const bookmarksLoading = useSelector(selectBookmarksLoading);
  const [isLoading, setIsLoading] = useState(false);

  const normalizedArticleId = String(articleId);
  const isBookmarked = bookmarks.includes(normalizedArticleId);

  // const article = useSelector((state) =>
  //   selectArticleById(state, normalizedArticleId)
  // );
  // const authorId = article?.ownerId;
  // const isOwnArticle = isLoggedIn && userId === String(authorId);

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
        )
          .unwrap()
          .then(() => {
            dispatch(fetchAuthorSavedArticles(userId));
          });
        toast.success("Article removed from favorites!", {
          className: "custom-toast custom-toast-success",
        });
      } else {
        await dispatch(addBookmark({ userId, articleId: normalizedArticleId }))
          .unwrap()
          .then(() => {
            dispatch(fetchAuthorSavedArticles(userId));
          });
        toast.success("Article added to favorites!", {
          className: "custom-toast custom-toast-success",
        });
      }
    } catch (err) {
      if (
        err?.status === 400 ||
        err?.code === 400 ||
        (typeof err === "string" && err.includes("400"))
      ) {
        toast.error("This article is already in your favorites.", {
          className: "custom-toast custom-toast-error",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          className: "custom-toast custom-toast-error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // const handleEditClick = (e) => {
  //   e.stopPropagation();
  //   navigate(`/edit/${articleId}`)
  //   console.log("Edit article", articleId);
  // };

  //  if (isOwnArticle) {
  //   return (
  //     <button
  //       className={s.button}
  //       type="button"
  //       aria-label="Edit article"
  //       title="Edit article"
  //       onClick={handleEditClick}
  //     >
  //       <EditIcon className={s.buttonIcon} size={24} />
  //     </button>
  //   );
  // }

  // if (!article) return null;

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
