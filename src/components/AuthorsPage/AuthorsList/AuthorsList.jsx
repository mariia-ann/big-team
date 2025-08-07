import React from "react";
import { AuthorsItem } from "../AuthorsItem/AuthorsItem";
import css from "../Authors.module.css";

export const AuthorsList = ({ authors, listRef }) => {
  if (!authors || authors.length === 0) {
    return <p className={css.noAuthors}>No authors available</p>;
  }

  return (
    <ul className={css.list} ref={listRef}>
      {authors.map((author) => (
        <AuthorsItem
          key={author._id}
          _id={author._id}
          name={author.name}
          avatarUrl={author.avatarUrl}
        />
      ))}
    </ul>
  );
};
