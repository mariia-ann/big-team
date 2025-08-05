import { useDispatch, useSelector } from "react-redux";
import ArticlesItem from "../ArticlesItem/ArticlesItem.jsx";
import s from "./ArticlesList.module.css";
import { selectCreators } from "../../redux/author/selectors.js";
import { useEffect } from "react";
import { fetchAuthors } from "../../redux/author/operations.js";

const ArticlesList = ({ articles, listRef }) => {
  const dispatch = useDispatch();
  const authors = useSelector(selectCreators);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const getAuthorName = (ownerId) => {
    const author = authors.find((a) => a._id === ownerId);
    return author?.name || "Unknown";
  };

  if (articles.length === 0) {
    return <p>No articles available</p>;
  }

  return (
    <ul className={s.articlesList} ref={listRef}>
      {articles.map((article) => (
        <li key={article._id}>
          <ArticlesItem
            article={article}
            authorName={getAuthorName(article.ownerId)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ArticlesList;
