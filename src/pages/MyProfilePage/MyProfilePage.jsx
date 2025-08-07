import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFullSavedArticles } from "../../redux/author/selectors.js";
import css from "./MyProfilePage.module.css";
import Container from "../../components/Container/Container.jsx";
import { selectUser } from "../../redux/auth/selectors.js";
import { selectArticlesByOwner } from "../../redux/articles/selectors.js";
import {
  fetchArticles,
  fetchArticlesByOwner,
} from "../../redux/articles/operations.js";
import { fetchAuthorSavedArticles } from "../../redux/author/operations.js";
import SavedArticlesContent from "../../components/NothingFound/SavedArticlesContent/SavedArticlesContent.jsx";
import MyArticlesContent from "../../components/NothingFound/MyArticlesContent/MyArticlesContent.jsx";
import ArticlesList from "../../components/ArticlesList/ArticlesList.jsx";
import defaultAvatar from "../../assets/images/defaultAvatar/default-avatar.png"

const TABS = {
  MY_ARTICLES: "MY_ARTICLES",
  SAVED_ARTICLES: "SAVED_ARTICLES",
};

const MyProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState(TABS.MY_ARTICLES);
  const myArticles = useSelector((state) =>
    selectArticlesByOwner(state, profile.id)
  );
  const fullSavedArticles = useSelector(selectFullSavedArticles);

  const articlesCount = myArticles.length;

  useEffect(() => {
    dispatch(fetchArticles({ page: 1, limit: 100, type: "all" }));
  }, [dispatch]);

  useEffect(() => {
    if (profile.id) {
      dispatch(fetchArticlesByOwner(profile.id));
      dispatch(fetchAuthorSavedArticles(profile.id));
    }
  }, [dispatch, profile.id]);

  const renderContent = () => {
    if (activeTab === TABS.MY_ARTICLES) {
      return myArticles.length > 0 ? (
        <ArticlesList articles={myArticles} />
      ) : (
        <MyArticlesContent />
      );
    } else {
      return fullSavedArticles.length > 0 ? (
        <ArticlesList articles={fullSavedArticles} />
      ) : (
        <SavedArticlesContent />
      );
    }
  };

  return (
    <section className={css.authorProfile}>
      <Container>
        <div className={css.contentBlock}>
          <h2 className={css.title}>My Profile</h2>

          <div className={css.profileHeader}>
            <img
              src={profile.avatarUrl || defaultAvatar}
              alt={profile.name}
              className={css.profileImage}
            />
            <div>
              <h1 className={css.authorName}>{profile.name}</h1>
              <p className={css.authorBio}>{articlesCount} Articles</p>
            </div>
          </div>

          <div className={css.tabsContainer}>
            <button
              className={`${css.tab} ${
                activeTab === TABS.MY_ARTICLES ? css.tabActive : ""
              }`}
              onClick={() => setActiveTab(TABS.MY_ARTICLES)}
            >
              My Articles
            </button>
            <button
              className={`${css.tab} ${
                activeTab === TABS.SAVED_ARTICLES ? css.tabActive : ""
              }`}
              onClick={() => setActiveTab(TABS.SAVED_ARTICLES)}
            >
              Saved Articles
            </button>
          </div>

          <div className={css.articlesSection}>{renderContent()}</div>
        </div>
      </Container>
    </section>
  );
};

export default MyProfilePage;
