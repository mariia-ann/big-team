import styles from "./ArticlesItem.module.css";
import IconBookmark from "../../assets/images/icons/bookmark.svg?react";

function ArticleButtonWithBookmark() {
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

const ArticlesItem = ({ article, isMiddle }) => {
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
        className={`${styles.articleImage} ${isMiddle ? styles.articleImageMiddle : ""}`}
        src={img}
        alt={alt || title}
        loading="lazy"
      />
      <div className={styles.author}>{author}</div>
      <div className={styles.articleTitle}>{title}</div>
      <div className={`${styles.excerpt} ${isMiddle ? styles.excerptMiddle : ""}`}>
        {excerpt || "\u00A0"}
      </div>
      <div className={styles.buttonWrap}>
        <ArticleButtonWithBookmark />
      </div>
    </li>
  );
};

export default ArticlesItem;










