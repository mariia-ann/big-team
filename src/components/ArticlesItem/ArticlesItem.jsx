// ArticlesItem.jsx
import { useState } from "react";
import styles from "./ArticlesItem.module.css";
import IconBookmark from "../../assets/images/icons/bookmark.svg?react";
import { toast } from "react-toastify";

function ArticleButtonWithBookmark({
  isAuth,
  isSaved,
  onToggleSaved,
  openAuthModal,
}) {
  const [loading, setLoading] = useState(false);

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();

    // Якщо НЕавторизований — просто відкриваємо модалку, інше не виконуємо!
    if (!isAuth) {
      if (typeof openAuthModal === "function") {
        openAuthModal();
      }
      return;
    }

    setLoading(true);
    try {
      if (typeof onToggleSaved === "function") {
        await onToggleSaved();
      }
      // стейт isSaved зміниться у parent через пропси
    } catch (error) {
      // alert("Failed to save article. Try again."); // Можеш включити або залишити пусто
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.buttonWithBookmark}>
      <button
        type="button"
        className={styles.articleButton}
        onClick={e => e.stopPropagation()}
      >
        Learn more
      </button>
      <div
        className={
          isSaved
            ? `${styles.bookmarkCircle} ${styles.bookmarkCircleActive}`
            : styles.bookmarkCircle
        }
        tabIndex={0}
        onClick={handleBookmarkClick}
        aria-disabled={loading}
      >
        {loading ? (
          <span className={styles.loader}></span>
        ) : (
          <IconBookmark />
        )}
      </div>
    </div>
  );
}

const ArticlesItem = ({
  article,
  isMiddle,
  isAuth,
  isSaved,
  onToggleSaved,
  openAuthModal,
}) => {
  const {
    author,
    title,
    excerpt,
    img,
    alt,
  } = article;

  return (
    <li className={styles.articleItem}>
      <img
        className={`${styles.articleImage} ${
          isMiddle ? styles.articleImageMiddle : ""
        }`}
        src={img}
        alt={alt || title}
        loading="lazy"
      />
      <div className={styles.author}>{author}</div>
      <div className={styles.articleTitle}>{title}</div>
      <div
        className={`${styles.excerpt} ${
          isMiddle ? styles.excerptMiddle : ""
        }`}
      >
        {excerpt || "\u00A0"}
      </div>
      <div className={styles.buttonWrap}>
        <ArticleButtonWithBookmark
          isAuth={isAuth}
          isSaved={isSaved}
          onToggleSaved={onToggleSaved}
          openAuthModal={openAuthModal}
        />
      </div>
    </li>
  );
};

export default ArticlesItem;












