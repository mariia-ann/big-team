import IconBookmark from "../../../assets/images/icons/bookmark.svg?react";
import styles from "./ButtonAddToBookmarks.module.css";

const ButtonAddToBookmarks = ({ isSaved, isLoading, onClick }) => {
  return (
    <div className={styles.buttonWithBookmark}>
      <button
        type="button"
        className={styles.articleButton}
        onClick={(e) => e.stopPropagation()}
      >
        Learn more
      </button>

      <div
        className={`${styles.bookmarkCircle} ${
          isSaved ? styles.bookmarkActive : ""
        }`}
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {isLoading ? "..." : <IconBookmark />}
      </div>
    </div>
  );
};

export default ButtonAddToBookmarks;




