import ButtonAddToBookmarks from "../ArticlesPage/ButtonAddToBookmarks/ButtonAddToBookmarks.jsx";
import styles from "./ArticlesItem.module.css";




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
        <ButtonAddToBookmarks />
      </div>
    </li>
  );
};

export default ArticlesItem;










