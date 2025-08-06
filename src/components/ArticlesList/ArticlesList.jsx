import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticlesItem from "../ArticlesItem/ArticlesItem.jsx";
import s from "./ArticlesList.module.css";
import { fetchArticles } from "../../redux/articles/operations.js";
import { fetchAuthors } from "../../redux/author/operations.js";
import { fetchBookmarks } from "../../redux/bookmarks/operations.js";
import { selectArticles } from "../../redux/articles/selectors.js";
import { selectCreators } from "../../redux/author/selectors.js";
import { selectIsLoggedIn, selectUserId } from "../../redux/auth/selectors.js";

const ArticlesList = () => {
  const dispatch = useDispatch();
  const authors = useSelector(selectCreators);
  const articles = useSelector(selectArticles);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(fetchAuthors());
    dispatch(fetchArticles());

    if (isLoggedIn && userId) {
      dispatch(fetchBookmarks(userId));
    }
  }, [dispatch, isLoggedIn, userId]);

  const getAuthorName = (ownerId) => {
    const author = authors.find((a) => a._id === ownerId);
    return author?.name || "Unknown";
  };

  if (articles.length === 0) {
    return <p>No articles available</p>;
  }

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

