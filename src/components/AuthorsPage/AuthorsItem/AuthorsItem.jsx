import React from "react";
import { Link } from "react-router-dom";
import css from "../Authors.module.css";

export const AuthorsItem = ({ _id, name, avatarUrl }) => {
  const authorId = _id;

  return (
    <li className={css.authorItem}>
      <Link to={`/authors/${authorId}`} className={css.authorLink}>
        <picture className={css.avatarWrap}>
          <img
            src={avatarUrl}
            alt={name || "Author"}
            className={css.avatar}
            loading="lazy"
          />
        </picture>
        <p className={css.name}>{name}</p>
      </Link>
    </li>
  );
};
