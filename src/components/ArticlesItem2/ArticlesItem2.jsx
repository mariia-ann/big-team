import { Link } from "react-router-dom";
import ButtonAddToBookmarks2 from "../ArticlesPage/ButtonAddToBookmarks2/ButtonAddToBookmarks2";
import s from "./ArticlesItem2.module.css";

const ArticlesItem2 = ({ article, user }) => {
  /*if (!user) return null;*/
  const { _id: articleId, title, desc, img, ownerId, date } = article;
  /*const { name } = user;*/
  const { name = "Невідомо" } = user ?? {};

  return (
    <div className={s.articleItem}>
      {img && (
        <div className={s.imageWrapper}>
          <img className={s.articleImage} src={img} alt={title} />
        </div>
      )}
      <div className={s.wrapper}>
        <div className={s.content}>
          <p className={s.articleOwner}>{name}</p>
          <h3 className={s.articleTitle}>{title}</h3>
          <p className={s.articleDescription}>{desc}</p>
        </div>
        <div className={s.actions}>
          <Link to={`/articles/${articleId}`}>Learn more</Link>
          <ButtonAddToBookmarks2 articleId={articleId} />
        </div>
      </div>
    </div>
  );
};
export default ArticlesItem2;
