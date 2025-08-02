import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Container from "../../components/Container/Container";
import ArticlesItem2 from "../../components/ArticlesItem2/ArticlesItem2.jsx";
import css from "./AuthorProfilePage.module.css";

const ITEMS_PER_PAGE = 12;
const BASE_URL = "https://harmoniq-server-big-team.onrender.com/api";

const AuthorProfilePage = () => {
  const { authorsId } = useParams();

  const [authorProfile, setAuthorProfile] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);

  const [allAuthorArticles, setAllAuthorArticles] = useState([]);
  const [articlesPage, setArticlesPage] = useState(1);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);
  const [errorArticles, setErrorArticles] = useState(null);

  const listRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoadingProfile(true);
      setErrorProfile(null);
      try {
        const response = await axios.get(`${BASE_URL}/users/${authorsId}`);
        setAuthorProfile(response.data.data);
      } catch (err) {
        console.error("Failed to fetch author profile:", err);
        setErrorProfile(
          "Failed to load author profile. Please try again later."
        );
        if (err.response && err.response.status === 404) {
          setErrorProfile("Author not found.");
        }
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (authorsId) {
      fetchProfile();
    }
  }, [authorsId]);

  useEffect(() => {
    const fetchAndFilterArticles = async () => {
      setIsLoadingArticles(true);
      setErrorArticles(null);
      try {
        const response = await axios.get(`${BASE_URL}/articles`);
        const articlesData = response.data.data.data;

        if (!Array.isArray(articlesData)) {
          throw new Error(
            "Invalid data format received from API. Expected an array of articles."
          );
        }

        const filteredArticles = articlesData.filter(
          (article) => article.ownerId === authorsId
        );

        setAllAuthorArticles(filteredArticles);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setErrorArticles("Failed to load articles. Please try again later.");
      } finally {
        setIsLoadingArticles(false);
      }
    };

    if (authorsId) {
      fetchAndFilterArticles();
    }
  }, [authorsId]);

  const displayedArticles = allAuthorArticles.slice(
    0,
    articlesPage * ITEMS_PER_PAGE
  );
  const currentArticlesHasMore =
    articlesPage * ITEMS_PER_PAGE < allAuthorArticles.length;

  const handleLoadMore = () => {
    setArticlesPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (listRef.current) {
      const firstNewItemIndex = (articlesPage - 1) * ITEMS_PER_PAGE;
      const targetElement = listRef.current.children[firstNewItemIndex];
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [displayedArticles]);

  if (isLoadingProfile) {
    return (
      <section className={css.authorProfile}>
        <Container>
          <p className={css.loading}>Downloading the author's profile...</p>
        </Container>
      </section>
    );
  }

  if (errorProfile) {
    return (
      <section className={css.authorProfile}>
        <Container>
          <p className={css.error}>{errorProfile}</p>
        </Container>
      </section>
    );
  }

  if (!authorProfile) {
    return (
      <section className={css.authorProfile}>
        <Container>
          <p className={css.noAuthor}>Author not found.</p>
        </Container>
      </section>
    );
  }

  return (
    <section className={css.authorProfile}>
      <Container>
        <div className={css.profileHeader}>
          <div className={css.authorInfo}>
            <img
              src={
                authorProfile.avatarUrl ||
                "https://placehold.co/124x124/aabbcc/ffffff?text=No+Avatar"
              }
              alt={authorProfile.name}
              className={css.avatar}
            />
            <div className={css.textInfo}>
              <h2 className={css.authorName}>{authorProfile.name}</h2>
              <p className={css.articlesCount}>
                {authorProfile.articlesAmount} articles
              </p>
            </div>
          </div>
        </div>

        <div className={css.articlesSection}>
          {isLoadingArticles ? (
            <p className={css.loadingArticles}>Loading articles...</p>
          ) : errorArticles ? (
            <p className={css.errorArticles}>{errorArticles}</p>
          ) : displayedArticles.length === 0 ? (
            <p className={css.noArticles}>This author has no articles yet..</p>
          ) : (
            <ul className={css.articlesList} ref={listRef}>
              {displayedArticles.map((article) => (
                <ArticlesItem2 key={article._id} article={article} />
              ))}
            </ul>
          )}

          {currentArticlesHasMore && !isLoadingArticles && (
            <button className={css.loadMoreButton} onClick={handleLoadMore}>
              <span className={css.loadMoreButtonText}>Load More</span>
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default AuthorProfilePage;
