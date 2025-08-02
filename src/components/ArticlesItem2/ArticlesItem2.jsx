import { Link } from "react-router-dom";
import ButtonAddToBookmarks2 from "../ArticlesPage/ButtonAddToBookmarks2/ButtonAddToBookmarks2";
import s from "./ArticlesItem2.module.css";

const ArticlesItem2 = ({ article }) => {
  const { _id, title, desc, img, ownerId } = article;

  const safeTitle = String(
    typeof title === "string" ? title : title?.en || "Untitled"
  );
  const safeDesc = String(
    typeof desc === "string" ? desc : desc?.en || ""
  );
  const safeOwner = String(ownerId?.$oid ?? "Unknown");

  return (
    <div className={s.articleItem}>
      {img && (
        <div className={s.imageWrapper}>
          <img className={s.articleImage} src={img} alt={safeTitle} />
        </div>
      )}
      <div className={s.wrapper}>
        <div className={s.content}>
          <p className={s.articleOwner}>{safeOwner}</p>
          <h3 className={s.articleTitle}>{safeTitle}</h3>
          <p className={s.articleDescription}>{safeDesc}</p>
        </div>
        <div className={s.actions}>
          <Link to={`/articles/${_id?.$oid}`}>Learn more</Link>
          <ButtonAddToBookmarks2 articleId={_id?.$oid} />
        </div>
      </div>
    </div>
  );
};

export default ArticlesItem2;
