import styles from "./ArticlesItem.module.css";
import BookmarkHandler from "../BookmarkHandler/BookmarkHandler";

const ArticlesItem = ({
  article,
  isMiddle,
  isAuth,
  openAuthModal,
}) => {
  if (!article || typeof article !== "object") {
    console.error("❌ INVALID ARTICLE:", article);
    return null;
  }

 
  const id = article._id || article.id;
  const safeAuthor = String(article.author || "Unknown");

  const safeTitle = typeof article.title === "string"
    ? article.title
    : article.title?.en || "Untitled";

  const safeExcerpt = typeof article.excerpt === "string"
    ? article.excerpt
    : article.excerpt?.en || "";

  const safeImg = typeof article.img === "string"
    ? article.img
    : "/default-image.webp";

  const safeAlt = typeof article.alt === "string"
    ? article.alt
    : safeTitle;

  return (
    <li className={styles.articleItem}>
      <img
        className={`${styles.articleImage} ${
          isMiddle ? styles.articleImageMiddle : ""
        }`}
        src={safeImg}
        alt={safeAlt}
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-image.webp";
        }}
      />
      <div className={styles.author}>{safeAuthor}</div>
      <div className={styles.articleTitle}>{safeTitle}</div>
      <div
        className={`${styles.excerpt} ${
          isMiddle ? styles.excerptMiddle : ""
        }`}
      >
        {safeExcerpt || "\u00A0"}
      </div>
      <div className={styles.buttonWrap}>
        <BookmarkHandler
          articleId={id}
          isAuth={isAuth}
          openAuthModal={openAuthModal}
        />
      </div>
    </li>
  );
};

export default ArticlesItem;
















