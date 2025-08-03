import { Link } from "react-router-dom";
import ButtonAddToBookmarks from "../ArticlesPage/ButtonAddToBookmarks/ButtonAddToBookmarks";
import s from "../ArticlesItem2/ArticlesItem2.module.css";

const ArticlesItem2 = ({ article, isAuth, openAuthModal }) => {
  const { _id, title, desc, img, ownerId } = article;

  return (
    <div className={s.articleItem}>
      {img && (
        <div className={s.imageWrapper}>
          <img className={s.articleImage} src={img} alt={title} />
        </div>
      )}
      <div className={s.wrapper}>
        <div className={s.content}>
          <p className={s.articleOwner}>{ownerId?.$oid}</p>
          <h3 className={s.articleTitle}>{title}</h3>
          <p className={s.articleDescription}>{desc}</p>
        </div>
        <div className={s.actions}>
          <Link to={`/articles/${_id.$oid}`}>Learn more</Link>
          <ButtonAddToBookmarks
            articleId={_id.$oid}
            isAuth={isAuth}
            openAuthModal={openAuthModal}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlesItem2;

