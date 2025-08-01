import { Link } from "react-router-dom";
import css from "./AuthorsPage.module.css";

export const AuthorsItem = ({ _id, name, avatarUrl, articlesAmount }) => {
  const authorId = _id;

  return (
    <li className={css.authorItem}>
      <Link to={`/authors/${authorId}`} className={css.authorLink}>
        <picture className={css.avatarWrap}>
          <img
            src={avatarUrl}
            alt={name}
            className={css.avatar}
            loading="lazy"
          />
        </picture>
        <p className={css.name}>{name}</p>
        {articlesAmount !== undefined && articlesAmount !== null && (
          <p className={css.articlesAmount}>{articlesAmount} articles</p>
        )}
      </Link>
    </li>
  );
};
