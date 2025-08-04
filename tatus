import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import styles from "./PopularArticlesSection.module.css";
import ArticlesItem from "../ArticlesItem2/ArticlesItem2.jsx";
import AuthModal from "../ModalErrorSave/ModalErrorSave";
import Loader from "../Loader/Loader";
import ArrowIcon from "../../assets/images/icons/arrow.svg?react";

import { fetchArticles } from "../../redux/articles/operations";
import {
  selectArticles,
  selectLoading,
  selectError,
} from "../../redux/articles/selectors";

const PopularArticlesSection = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const articlesRaw = useSelector(selectArticles);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

 
  const articles = Array.isArray(articlesRaw)
    ? articlesRaw
    : Array.isArray(articlesRaw?.data)
    ? articlesRaw.data
    : [];

  const [visibleCount, setVisibleCount] = useState(4);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loadingBookmarkId, setLoadingBookmarkId] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const visibleArticles = articles.slice(0, visibleCount);

  useEffect(() => {
    const token = localStorage.getItem("token")?.replace(/^"|"$/g, "");
    setIsAuth(!!token);
  }, []);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  useEffect(() => {
    if (error) toast.error("Failed to load articles");
  }, [error]);

  useEffect(() => {
    setShowAuthModal(false);
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(window.innerWidth >= 1440 ? 3 : 4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleBookmarkToggle = async (id) => {
    if (!isAuth) {
      setShowAuthModal(true);
      return;
    }
    setLoadingBookmarkId(id);
    try {
      await new Promise((res) => setTimeout(res, 500));
      setBookmarked((prev) =>
        prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
      );
      toast.success(
        bookmarked.includes(id)
          ? "Removed from bookmarks"
          : "Saved to bookmarks"
      );
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoadingBookmarkId(null);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Popular Articles</h2>
          <Link to="/articles" className={styles.allLink}>
            Go to all Articles <ArrowIcon className={styles.icon} />
          </Link>
        </div>

        {isLoading ? (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        ) : error ? (
          <p className={styles.error}>Something went wrong</p>
        ) : visibleArticles.length === 0 ? (
          <p className={styles.empty}>No articles found</p>
        ) : (
          <ul className={styles.articlesList}>
  {visibleArticles.map((article, index) => (
    <li key={article._id}>
      <ArticlesItem
        article={article}
        isMiddle={index === 1}
        isAuth={isAuth}
        openAuthModal={() => setShowAuthModal(true)}
        isSaved={bookmarked.includes(article._id)}
        onToggleSaved={() => handleBookmarkToggle(article._id)}
        isLoading={loadingBookmarkId === article._id}
      />
    </li>
  ))}
</ul>

        )}

        {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      </div>
    </section>
  );
};

export default PopularArticlesSection;






























