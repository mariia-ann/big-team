import IconBookmark from "../../../assets/images/icons/bookmark.svg?react";
import styles from "./ButtonAddToBookmarks.module.css"

const ButtonAddToBookmarks = () => {
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
        className={styles.bookmarkCircle}
        tabIndex={0}
        onClick={e => e.stopPropagation()}
      >
        <IconBookmark />
      </div>
    </div>
  );
}

export default ButtonAddToBookmarks