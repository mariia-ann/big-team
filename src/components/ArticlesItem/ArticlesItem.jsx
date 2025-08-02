import ButtonAddToBookmarks from "../ArticlesPage/ButtonAddToBookmarks/ButtonAddToBookmarks.jsx";
import styles from "./ArticlesItem.module.css";

const ArticlesItem = ({
  article,
  isMiddle,
  isAuth,
  openAuthModal,
  isSaved,
  onToggleSaved,
  isLoading,
}) => {
  if (!article || typeof article !== "object") {
    console.error("❌ INVALID ARTICLE:", article);
    return null;
  }

  const {
    author = "Unknown",
    title = "",
    excerpt = "",
    img,
    alt,
  } = article;

  const id = article.id || article._id;

  const safeTitle = String(
    typeof title === "string" ? title : title?.en || "Untitled"
  );

  const safeExcerpt = String(
    typeof excerpt === "string" ? excerpt : excerpt?.en || ""
  );

  const safeAlt = String(
    typeof alt === "string" ? alt : safeTitle
  );

  const safeAuthor = String(author);

  return (
    <li className={styles.articleItem}>
      <img
        className={`${styles.articleImage} ${
          isMiddle ? styles.articleImageMiddle : ""
        }`}
        src={typeof img === "string" ? img : "/default-image.webp"}
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
        <ButtonAddToBookmarks
          articleId={id}
          isAuth={isAuth}
          openAuthModal={openAuthModal}
          isSaved={isSaved}
          onToggleSaved={onToggleSaved}
          isLoading={isLoading}
        />
      </div>
    </li>
  );
};

export default ArticlesItem;















