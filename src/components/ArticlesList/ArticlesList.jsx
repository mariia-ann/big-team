import { useDispatch, useSelector } from "react-redux";
import ArticlesItem from "../ArticlesItem/ArticlesItem.jsx";
import s from "./ArticlesList.module.css";
import { selectCreators } from "../../redux/author/selectors.js";
import { useEffect } from "react";
import { fetchArticles } from "../../redux/articles/operations.js";
import { fetchAuthors } from "../../redux/author/operations.js";
import { selectArticles } from "../../redux/articles/selectors.js";

const ArticlesList = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const authors = useSelector(selectCreators);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchAuthors());
  }, [dispatch]);

  const getAuthorName = (ownerId) => {
    const author = authors.find((a) => a._id === ownerId);
    return author?.name || "Unknown";
  };

  if (articles.length === 0) {
    return <p>No articles available</p>;
  }
  console.log("Articles received:", articles);

  return (
    <ul className={s.articlesList}>
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
