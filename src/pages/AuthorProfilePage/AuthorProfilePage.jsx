import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";

import Container from "../../components/Container/Container";
import ArticlesItem from "../../components/ArticlesItem/ArticlesItem.jsx";
import css from "./AuthorProfilePage.module.css";

const ITEMS_PER_PAGE = 12;
const BASE_URL = "https://harmoniq-server-big-team.onrender.com";

const AuthorProfilePage = () => {
  const { authorsId } = useParams();

  const [authorProfile, setAuthorProfile] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState(null);

  const [allMyArticles, setAllMyArticles] = useState([]);
  const [myArticlesPage, setMyArticlesPage] = useState(1);
  const [isLoadingMyArticles, setIsLoadingMyArticles] = useState(true);
  const [errorMyArticles, setErrorMyArticles] = useState(null);

  const [allSavedArticles, setAllSavedArticles] = useState([]);
  const [savedArticlesPage, setSavedArticlesPage] = useState(1);
  const [isLoadingSavedArticles, setIsLoadingSavedArticles] = useState(true);
  const [errorSavedArticles, setErrorSavedArticles] = useState(null);

  const [currentTab, setCurrentTab] = useState("myArticles");

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const loggedInUser = useSelector(selectUser);
  const loggedInUserId = loggedInUser ? loggedInUser.id : null;

  const isCurrentUserProfile = isLoggedIn && authorsId === loggedInUserId;

  const listRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoadingProfile(true);
      setErrorProfile(null);
      try {
        const response = await axios.get(`${BASE_URL}/api/users/${authorsId}`);
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
    } else {
      setIsLoadingProfile(false);
      setErrorProfile("Author ID is missing in the URL.");
    }
  }, [authorsId]);

  useEffect(() => {
    const fetchAndFilterArticles = async () => {
      setIsLoadingMyArticles(true);
      setErrorMyArticles(null);
      try {
        const response = await axios.get(`${BASE_URL}/api/articles`);
        const allArticles = response.data.data.data;

        const filteredArticles = allArticles.filter(
          (article) => article.ownerId === authorsId
        );
        setAllMyArticles(filteredArticles || []);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setErrorMyArticles("Failed to load articles. Please try again later.");
      } finally {
        setIsLoadingMyArticles(false);
      }
    };

    if (authorsId) {
      fetchAndFilterArticles();
    }
  }, [authorsId]);

  useEffect(() => {
    const fetchSaved = async () => {
      setIsLoadingSavedArticles(true);
      setErrorSavedArticles(null);
      try {
        const response = await axios.get(
          `${BASE_URL}/api/users/${authorsId}/saved-articles`
        );
        const savedArticlesData = response.data.data.savedArticles;
        setAllSavedArticles(savedArticlesData);
      } catch (err) {
        console.error("Failed to fetch saved articles:", err);
        setErrorSavedArticles(
          "Failed to load saved articles. Please try again later."
        );
      } finally {
        setIsLoadingSavedArticles(false);
      }
    };

    if (isCurrentUserProfile) {
      fetchSaved();
    }
  }, [isCurrentUserProfile, authorsId]);

  const displayedArticles =
    currentTab === "myArticles"
      ? allMyArticles.slice(0, myArticlesPage * ITEMS_PER_PAGE)
      : allSavedArticles.slice(0, savedArticlesPage * ITEMS_PER_PAGE);

  const currentArticlesHasMore =
    currentTab === "myArticles"
      ? myArticlesPage * ITEMS_PER_PAGE < allMyArticles.length
      : savedArticlesPage * ITEMS_PER_PAGE < allSavedArticles.length;

  const currentIsLoadingArticles =
    currentTab === "myArticles" ? isLoadingMyArticles : isLoadingSavedArticles;

  const currentErrorArticles =
    currentTab === "myArticles" ? errorMyArticles : errorSavedArticles;

  const handleLoadMore = () => {
    if (currentTab === "myArticles") {
      setMyArticlesPage((prevPage) => prevPage + 1);
    } else {
      setSavedArticlesPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (listRef.current) {
      const firstNewItemIndex =
        (currentTab === "myArticles"
          ? myArticlesPage - 1
          : savedArticlesPage - 1) * ITEMS_PER_PAGE;
      const targetElement = listRef.current.children[firstNewItemIndex];

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [displayedArticles, currentTab, myArticlesPage, savedArticlesPage]);

  if (isLoadingProfile) {
    return (
      <section className={css.authorProfile}>
        <Container className={css.container}>
          <p className={css.loading}>Loading author profile...</p>
        </Container>
      </section>
    );
  }

  if (errorProfile) {
    return (
      <section className={css.authorProfile}>
        <Container className={css.container}>
          <p className={css.error}>{errorProfile}</p>
        </Container>
      </section>
    );
  }

  if (!authorProfile) {
    return (
      <section className={css.authorProfile}>
        <Container className={css.container}>
          <p className={css.noAuthor}>Author not found.</p>
        </Container>
      </section>
    );
  }

  return (
    <section
      className={`${css.authorProfile} ${
        isCurrentUserProfile ? css["is-current-user-profile"] : ""
      }`}
    >
      <Container className={css.container}>
        {isCurrentUserProfile && (
          <h1 className={css.myProfileTitle}>My Profile</h1>
        )}
        <div className={css.profileHeader}>
          <div className={css.authorInfo}>
            <img
              src={
                authorProfile.avatarUrl ||
                "https://placehold.co/100x100/aabbcc/ffffff?text=No+Avatar"
              }
              alt={authorProfile.name}
              className={css.avatar}
            />
            <div className={css.authorTextInfo}>
              <h2 className={css.authorName}>{authorProfile.name}</h2>
              <p className={css.articlesCount}>
                {authorProfile.articlesAmount} articles
              </p>
            </div>
          </div>
        </div>

        {isCurrentUserProfile && (
          <div className={css.tabs}>
            <button
              className={`${css.tabButton} ${
                currentTab === "myArticles" ? css.activeTab : ""
              }`}
              onClick={() => setCurrentTab("myArticles")}
            >
              My Articles
            </button>
            <button
              className={`${css.tabButton} ${
                currentTab === "savedArticles" ? css.activeTab : ""
              }`}
              onClick={() => setCurrentTab("savedArticles")}
            >
              Saved Articles
            </button>
          </div>
        )}

        <div className={css.articlesSection}>
          {currentIsLoadingArticles ? (
            <p className={css.loadingArticles}>Loading articles...</p>
          ) : currentErrorArticles ? (
            <p className={css.errorArticles}>{currentErrorArticles}</p>
          ) : displayedArticles.length === 0 ? (
            <p className={css.noArticles}>Nothing found.</p>
          ) : (
            <ul className={css.articlesList} ref={listRef}>
              {displayedArticles.map((article) => (
                <ArticlesItem key={article._id} article={article} />
              ))}
            </ul>
          )}

          {currentArticlesHasMore && !currentIsLoadingArticles && (
            <button className={css.loadMoreButton} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default AuthorProfilePage;
