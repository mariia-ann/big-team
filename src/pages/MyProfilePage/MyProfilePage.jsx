import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectSavedArticles } from "../../redux/author/selectors.js";
import css from "./MyProfilePage.module.css";
import Container from "../../components/Container/Container.jsx";
import { selectUser } from "../../redux/auth/selectors.js";
import { selectArticlesByOwner } from "../../redux/articles/selectors.js";
import { fetchArticlesByOwner } from "../../redux/articles/operations.js";
import { fetchAuthorSavedArticles } from "../../redux/author/operations.js";
import SavedArticlesContent from "../../components/NothingFound/SavedArticlesContent/SavedArticlesContent.jsx";
import MyArticlesContent from "../../components/NothingFound/MyArticlesContent/MyArticlesContent.jsx";
import ArticlesList from "../../components/ArticlesList/ArticlesList.jsx";

const TABS = {
  MY_ARTICLES: "MY_ARTICLES",
  SAVED_ARTICLES: "SAVED_ARTICLES",
};

const MyProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState(TABS.MY_ARTICLES);
   const savedArticles = useSelector(selectSavedArticles);

  const myArticles = useSelector((state) =>
    selectArticlesByOwner(state, profile.id)
  );

    const articlesCount = myArticles.length;
 
  useEffect(() => {
    if (profile.id) {
      dispatch(fetchArticlesByOwner(profile.id));
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (activeTab === TABS.SAVED_ARTICLES) {
      dispatch(fetchAuthorSavedArticles());
    }
  }, [dispatch, activeTab]);

  console.log(myArticles);

  const renderContent = () => {
    if (activeTab === TABS.MY_ARTICLES) {
      return myArticles.length > 0 ? (
        <ArticlesList articles={myArticles} />
      ) : (
        <MyArticlesContent />
      );
    } else {
      return savedArticles.length > 0 ? (
        <ArticlesList articles={savedArticles} />
      ) : (
        <SavedArticlesContent />
      );
    }
  };

  return (
    <section className={css.authorProfile}>
      <Container>
        <div className={css.profileHeader}>
          <img
            src={profile.avatarUrl}
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
            Мої статті
          </button>
          <button
            className={`${css.tab} ${
              activeTab === TABS.SAVED_ARTICLES ? css.tabActive : ""
            }`}
            onClick={() => setActiveTab(TABS.SAVED_ARTICLES)}
          >
            Збережені
          </button>
        </div>

        <div className={css.articlesSection}>{renderContent()}</div>
      </Container>
    </section>
  );
};

export default MyProfilePage;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { selectCreator, selectSavedArticles } from "../../redux/author/selectors.js";
// import { fetchAuthor, fetchAuthorSavedArticles } from "../../redux/author/operations.js";
// import Container from "../Container/Container.jsx";
// import css from "./AuthorProfilePage.module.css";
// import { fetchArticlesByOwner } from "../../redux/articles/operations.js";
// import { selectArticlesByOwner } from "../../redux/articles/selectors.js";
// import ArticlesList from "../ArticlesList/ArticlesList.jsx";
// import { selectUser } from "../../redux/auth/selectors.js";

// const TABS = {
//   MY_ARTICLES: "myArticles",
//   SAVED_ARTICLES: "savedArticles",
// };

// const MyProfilePage = () => {
//   const { authorId } = useParams();
//   const dispatch = useDispatch();
//   const author = useSelector(selectCreator);
//   const ownerArticle = useSelector((state) =>
//     selectArticlesByOwner(state, authorId)
//   );
//   const savedArticles = useSelector(selectSavedArticles);

//   const articlesCount = ownerArticle.length;
//   const currentUser = useSelector(selectUser);
//   const [activeTab, setActiveTab] = useState(TABS.MY_ARTICLES);

//   // порівняння тимчасове з поштою
//   const isMyProfile =
//     String(currentUser.email).toLowerCase() ===
//     String(author.email).toLowerCase();
//   // const isMyProfile = String(currentUser.id) === String(authorId);

//   useEffect(() => {
//     if (authorId) {
//       dispatch(fetchAuthor(authorId));
//       dispatch(fetchArticlesByOwner(authorId));
//     }
//   }, [dispatch, authorId]);

//   useEffect(() => {
//   if (isMyProfile && activeTab === TABS.SAVED_ARTICLES) {
//     dispatch(fetchAuthorSavedArticles());
//   }
// }, [dispatch, isMyProfile, activeTab]);

//   const renderContent = () => {
//   if (!isMyProfile) {
//     return <ArticlesList articles={ownerArticle} />;
//   }

//   if (activeTab === TABS.MY_ARTICLES) {
//     return ownerArticle.length > 0 ? (
//       <ArticlesList articles={ownerArticle} />
//     ) : (
//       <p className={css.empty}>У вас поки немає статей.</p>
//     );
//   }

//   if (activeTab === TABS.SAVED_ARTICLES) {
//     return savedArticles.length > 0 ? (
//       <ArticlesList articles={savedArticles} />
//     ) : (
//       <p className={css.empty}>У вас поки немає збережених статей.</p>
//     );
//   }

//   return null;
// };

//   return (
//     <section className={css.authorProfile}>
//       <Container>
//         <div className={css.profileHeader}>
//           <img
//             src={author.avatarUrl}
//             alt={author.name}
//             className={css.profileImage}
//           />
//           <div>
//             <h1 className={css.authorName}>{author.name}</h1>
//             <p className={css.authorBio}>{articlesCount} Articles</p>
//           </div>
//         </div>
//         {isMyProfile && (
//           <div className={css.tabsContainer}>
//             <button
//               className={`${css.tab} ${
//                 activeTab === TABS.MY_ARTICLES ? css.tabActive : ""
//               }`}
//               onClick={() => setActiveTab(TABS.MY_ARTICLES)}
//             >
//               My Articles
//             </button>
//             <button
//               className={`${css.tab} ${
//                 activeTab === TABS.SAVED_ARTICLES ? css.tabActive : ""
//               }`}
//               onClick={() => setActiveTab(TABS.SAVED_ARTICLES)}
//             >
//               Saved Articles
//             </button>
//           </div>
//         )}
//         <div>
//           <ArticlesList articles={ownerArticle} />
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default MyProfilePage;

// // import { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import { useDispatch, useSelector } from "react-redux";
// // import {
// //   selectCreator,
// //   selectLoading,
// //   selectError,
// //   selectSavedArticles,
// // } from "../../redux/author/selectors";
// // import { selectUser } from "../../redux/auth/selectors";
// // import { fetchAuthor } from "../../redux/author/operations";
// // import { fetchSavedArticles } from "../../redux/author/operations";
// // import Container from "../Container/Container";
// // import ArticlesList from "../ArticlesList/ArticlesList.jsx";
// // import Loader from "../Loader/Loader";
// // import MyArticlesContent from "../NothingFound/MyArticlesContent/MyArticlesContent.jsx";
// // import SavedArticlesContent from "../NothingFound/SavedArticlesContent/SavedArticlesContent.jsx";
// // import css from "./AuthorProfilePage.module.css";

// // const TABS = {
// //   MY_ARTICLES: "myArticles",
// //   SAVED_ARTICLES: "savedArticles",
// // };

// // const AuthorProfilePage = () => {
// //   const { authorId } = useParams();
// //   const dispatch = useDispatch();
// //   const author = useSelector(selectCreator);
// //   const isLoading = useSelector(selectLoading);
// //   const error = useSelector(selectError);
// //   const currentUser = useSelector(selectUser);
// //   const savedArticles = useSelector(selectSavedArticles);

// //   const isMyProfile = currentUser && currentUser._id === authorId;
// //   const [activeTab, setActiveTab] = useState(TABS.MY_ARTICLES);

// //   useEffect(() => {
// //     if (authorId) {
// //       dispatch(fetchAuthor(authorId));
// //     }
// //   }, [dispatch, authorId]);

// //   useEffect(() => {
// //     if (isMyProfile && activeTab === TABS.SAVED_ARTICLES) {
// //       dispatch(fetchSavedArticles());
// //     }
// //   }, [dispatch, isMyProfile, activeTab]);

// //   const renderContent = () => {
// //     if (isMyProfile) {
// //       if (activeTab === TABS.MY_ARTICLES) {
// //         return author.articles && author.articles.length > 0 ? (
// //           <ArticlesList articles={author.articles} />
// //         ) : (
// //           <MyArticlesContent />
// //         );
// //       } else if (activeTab === TABS.SAVED_ARTICLES) {
// //         return savedArticles && savedArticles.length > 0 ? (
// //           <ArticlesList articles={savedArticles} />
// //         ) : (
// //           <SavedArticlesContent />
// //         );
// //       }
// //     }
// //     return author.articles && author.articles.length > 0 ? (
// //       <ArticlesList articles={author.articles} />
// //     ) : (
// //       <MyArticlesContent />
// //     );
// //   };

// //   if (isLoading) {
// //     return <Loader />;
// //   }

// //   if (error) {
// //     return (
// //       <Container>
// //         <p className={css.errorText}>An error occurred: {error}</p>
// //       </Container>
// //     );
// //   }

// //   if (!author) {
// //     return null;
// //   }

// //   return (
// //     <Container>
// //       <div className={css.authorProfile}>
// //         <div className={css.profileHeader}>
// //           <img
// //             src={author.avatarUrl}
// //             alt={author.name}
// //             className={css.profileImage}
// //           />
// //           <h1 className={css.authorName}>{author.name}</h1>
// //           <p className={css.authorBio}>{author.bio}</p>
// //         </div>

// //         {isMyProfile && (
// //           <div className={css.tabsContainer}>
// //             <button
// //               className={`${css.tab} ${
// //                 activeTab === TABS.MY_ARTICLES ? css.tabActive : ""
// //               }`}
// //               onClick={() => setActiveTab(TABS.MY_ARTICLES)}
// //             >
// //               My Articles
// //             </button>
// //             <button
// //               className={`${css.tab} ${
// //                 activeTab === TABS.SAVED_ARTICLES ? css.tabActive : ""
// //               }`}
// //               onClick={() => setActiveTab(TABS.SAVED_ARTICLES)}
// //             >
// //               Saved Articles
// //             </button>
// //           </div>
// //         )}

// //         <div className={css.articlesSection}>
// //           <h2 className={css.sectionTitle}>
// //             {isMyProfile && activeTab === TABS.SAVED_ARTICLES
// //               ? "Saved Articles"
// //               : `Articles by ${author.name}`}
// //           </h2>
// //           {renderContent()}
// //         </div>
// //       </div>
// //     </Container>
// //   );
// // };

// // export default AuthorProfilePage;
