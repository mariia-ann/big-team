import { Link } from "react-router-dom";
import styles from "./ArticlesItem2.module.css";
import ButtonAddToBookmarks from "../ArticlesPage/ButtonAddToBookmarks/ButtonAddToBookmarks";

const ArticlesItem = ({ article, isAuth, openAuthModal }) => {
  const { _id, title, desc, img, ownerId, ownerName } = article;

  return (
    <li className={styles.articleItem}>
      {img && (
        <div className={styles.imageWrapper}>
          <img className={styles.articleImage} src={img} alt={title} />
        </div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <p className={styles.articleOwner}>{ownerName || ownerId}</p>
          <h3 className={styles.articleTitle}>{title}</h3>
          <p className={styles.desc}>{desc}</p>
        </div>
        <div className={styles.actions}>
          <Link className={styles.articleButton} to={`/articles/${_id}`}>
            Learn more
          </Link>
          <ButtonAddToBookmarks
            articleId={_id}
            isAuth={isAuth}
            openAuthModal={openAuthModal}
          />
        </div>
      </div>
    </li>
  );
};

export default ArticlesItem;




















