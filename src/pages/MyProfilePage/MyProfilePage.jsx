import { useState, useEffect } from "react";
import axios from "axios";
import Container from "../../components/Container/Container";
import ArticlesItem2 from "../../components/ArticlesItem2/ArticlesItem2.jsx";
import css from "./MyProfilePage.module.css";

const BASE_URL = "https://harmoniq-server-big-team.onrender.com/api";
const ITEMS_PER_PAGE = 12;

const MyProfilePage = ({ userId }) => {
  const [myProfile, setMyProfile] = useState(null);
  const [myArticles, setMyArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [activeTab, setActiveTab] = useState("myArticles");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [articlesPage, setArticlesPage] = useState(1);

  useEffect(() => {
    const fetchMyData = async () => {
      if (!userId) {
        setError("User not authenticated. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        const profileResponse = await axios.get(`${BASE_URL}/creators/all`);
        const creatorsData = profileResponse.data;
        if (!Array.isArray(creatorsData)) {
          throw new Error("Invalid creators data format.");
        }
        const foundProfile = creatorsData.find(
          (creator) => creator._id === userId
        );
        setMyProfile(foundProfile);

        const articlesResponse = await axios.get(`${BASE_URL}/articles`);
        const articlesData = articlesResponse.data.data.data;
        if (!Array.isArray(articlesData)) {
          throw new Error("Invalid articles data format.");
        }
        const filteredMyArticles = articlesData.filter(
          (article) => article.ownerId === userId
        );
        setMyArticles(filteredMyArticles);

        setSavedArticles(articlesData.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch my data:", err);
        setError(
          "Your profile and articles could not be loaded. Please try again later."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyData();
  }, [userId]);

  const displayedArticles =
    activeTab === "myArticles"
      ? myArticles.slice(0, articlesPage * ITEMS_PER_PAGE)
      : savedArticles.slice(0, articlesPage * ITEMS_PER_PAGE);

  const currentArticlesHasMore =
    activeTab === "myArticles"
      ? articlesPage * ITEMS_PER_PAGE < myArticles.length
      : articlesPage * ITEMS_PER_PAGE < savedArticles.length;

  const handleLoadMore = () => {
    setArticlesPage((prevPage) => prevPage + 1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setArticlesPage(1);
  };

  if (isLoading) {
    return (
      <section className={css.myProfile}>
        <Container>
          <p className={css.loading}>Loading profile...</p>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className={css.myProfile}>
        <Container>
          <p className={css.error}>{error}</p>
        </Container>
      </section>
    );
  }

  return (
    <section className={css.myProfile}>
      <Container>
        <h1 className={css.pageTitle}>My Profile</h1>

        <div className={css.profileHeader}>
          <div className={css.authorInfo}>
            <img
              src={
                myProfile?.avatarUrl ||
                "https://placehold.co/137x137/aabbcc/ffffff?text=No+Avatar"
              }
              alt={myProfile?.name || "My Profile"}
              className={css.avatar}
            />
            <div className={css.textInfo}>
              <h2 className={css.authorName}>
                {myProfile?.name || "My Profile"}
              </h2>
              <p className={css.articlesCount}>{myArticles.length} articles</p>
            </div>
          </div>
        </div>

        <div className={css.tabsContainer}>
          <button
            className={`${css.tab} ${
              activeTab === "myArticles" ? css.tabActive : ""
            }`}
            onClick={() => handleTabClick("myArticles")}
          >
            My Articles
          </button>
          <button
            className={`${css.tab} ${
              activeTab === "savedArticles" ? css.tabActive : ""
            }`}
            onClick={() => handleTabClick("savedArticles")}
          >
            Saved Articles
          </button>
        </div>

        <div className={css.articlesSection}>
          {displayedArticles.length === 0 ? (
            <p className={css.noArticles}>
              {activeTab === "myArticles"
                ? "You don't have any articles yet."
                : "You have no saved articles."}
            </p>
          ) : (
            <ul className={css.articlesList}>
              {displayedArticles.map((article) => (
                <ArticlesItem2 key={article._id} article={article} />
              ))}
            </ul>
          )}
        </div>

        {currentArticlesHasMore && (
          <button className={css.loadMoreButton} onClick={handleLoadMore}>
            <span className={css.loadMoreButtonText}>Load More</span>
          </button>
        )}
      </Container>
    </section>
  );
};

export default MyProfilePage;
