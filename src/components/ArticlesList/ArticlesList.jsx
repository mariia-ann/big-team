import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticlesItem from "../ArticlesItem/ArticlesItem.jsx";
import s from "./ArticlesList.module.css";
import { fetchAuthors } from "../../redux/author/operations.js";
import { fetchBookmarks } from "../../redux/bookmarks/operations.js";
import { selectCreators } from "../../redux/author/selectors.js";
import { selectIsLoggedIn, selectUserId } from "../../redux/auth/selectors.js";
import AlertIcon from "../../assets/images/icons/alert.svg?react";
import { Link } from "react-router-dom";

const ArticlesList = ({ articles }) => {
  const dispatch = useDispatch();
  const authors = useSelector(selectCreators);
  // const articles = useSelector(selectArticles);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    dispatch(fetchAuthors());
    // dispatch(fetchArticles());

    if (isLoggedIn && userId) {
      dispatch(fetchBookmarks(userId));
    }
  }, [dispatch, isLoggedIn, userId]);

  const getAuthorName = (ownerId) => {
    const author = authors.find((a) => a._id === ownerId);
    return author?.name || "Unknown";
  };

  if (articles.length === 0) {
    return (
      <div className={s.alertContainer}>
        <div className={s.alertContent}>
          <div className={s.alertIconWrapper}>
            <AlertIcon className={s.alertIcon} size={40} />
          </div>
          <h3 className={s.alertTitle}>Nothing found.</h3>
          <p className={s.alertText}>Be the first, who create an article</p>
        </div>
        <Link className={s.alertButtonLink} to={`/create`}>
          Create an artilce
        </Link>
      </div>
    );
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
