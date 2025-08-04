import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreator,
  selectLoading,
  selectError,
  selectSavedArticles,
} from "../../redux/author/selectors";
import { selectUser } from "../../redux/auth/selectors";
import { fetchAuthor } from "../../redux/author/operations";
import { fetchSavedArticles } from "../../redux/author/operations";
import Container from "../Container/Container";
import ArticlesList from "../ArticlesPage/ArticlesList/ArticlesList.jsx";
import Loader from "../Loader/Loader";
import MyArticlesContent from "../NothingFound/MyArticlesContent/MyArticlesContent.jsx";
import SavedArticlesContent from "../NothingFound/SavedArticlesContent/SavedArticlesContent.jsx";
import css from "./AuthorProfilePage.module.css";

const TABS = {
  MY_ARTICLES: "myArticles",
  SAVED_ARTICLES: "savedArticles",
};

const AuthorProfilePage = () => {
  const { authorId } = useParams();
  const dispatch = useDispatch();
  const author = useSelector(selectCreator);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const currentUser = useSelector(selectUser);
  const savedArticles = useSelector(selectSavedArticles);

  const isMyProfile = currentUser && currentUser._id === authorId;
  const [activeTab, setActiveTab] = useState(TABS.MY_ARTICLES);

  useEffect(() => {
    if (authorId) {
      dispatch(fetchAuthor(authorId));
    }
  }, [dispatch, authorId]);

  useEffect(() => {
    if (isMyProfile && activeTab === TABS.SAVED_ARTICLES) {
      dispatch(fetchSavedArticles());
    }
  }, [dispatch, isMyProfile, activeTab]);

  const renderContent = () => {
    if (isMyProfile) {
      if (activeTab === TABS.MY_ARTICLES) {
        return author.articles && author.articles.length > 0 ? (
          <ArticlesList articles={author.articles} />
        ) : (
          <MyArticlesContent />
        );
      } else if (activeTab === TABS.SAVED_ARTICLES) {
        return savedArticles && savedArticles.length > 0 ? (
          <ArticlesList articles={savedArticles} />
        ) : (
          <SavedArticlesContent />
        );
      }
    }
    return author.articles && author.articles.length > 0 ? (
      <ArticlesList articles={author.articles} />
    ) : (
      <MyArticlesContent />
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Container>
        <p className={css.errorText}>An error occurred: {error}</p>
      </Container>
    );
  }

  if (!author) {
    return null;
  }

  return (
    <Container>
      <div className={css.authorProfile}>
        <div className={css.profileHeader}>
          <img
            src={author.avatarUrl}
            alt={author.name}
            className={css.profileImage}
          />
          <h1 className={css.authorName}>{author.name}</h1>
          <p className={css.authorBio}>{author.bio}</p>
        </div>

        {isMyProfile && (
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
        )}

        <div className={css.articlesSection}>
          <h2 className={css.sectionTitle}>
            {isMyProfile && activeTab === TABS.SAVED_ARTICLES
              ? "Saved Articles"
              : `Articles by ${author.name}`}
          </h2>
          {renderContent()}
        </div>
      </div>
    </Container>
  );
};

export default AuthorProfilePage;
