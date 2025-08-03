import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./PopularArticlesSection.module.css";
import ArrowIcon from "../../assets/images/icons/arrow.svg?react";

import { fetchArticles } from "../../redux/articles/operations";
import {
  selectArticles,
} from "../../redux/articles/selectors";
import ArticlesItem2 from "../ArticlesItem2/ArticlesItem2.jsx";

const PopularArticlesSection = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);


  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Popular Articles</h2>
          <Link to="/articles" className={styles.allLink}>
            Go to all Articles <ArrowIcon className={styles.icon} />
          </Link>
        </div>
          <ul className={styles.articlesList}>
            {articles.map((article) => (
              <li key={article._id}>
                <ArticlesItem2
                  article={article}
                />
              </li>
            ))}
          </ul>
      </div>
    </section>
  );
};

export default PopularArticlesSection;
