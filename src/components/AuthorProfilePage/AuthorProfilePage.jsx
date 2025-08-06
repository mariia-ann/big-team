import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCreator } from "../../redux/author/selectors.js";
import { fetchAuthor } from "../../redux/author/operations.js";
import Container from "../Container/Container.jsx";
import css from "./AuthorProfilePage.module.css";
import { fetchArticlesByOwner } from "../../redux/articles/operations.js";
import { selectArticlesByOwner } from "../../redux/articles/selectors.js";
import ArticlesList from "../ArticlesList/ArticlesList.jsx";

const AuthorProfilePage = () => {
  const { authorId } = useParams();
  const dispatch = useDispatch();
  const author = useSelector(selectCreator);
  const ownerArticle = useSelector((state) =>
    selectArticlesByOwner(state, authorId)
  );

  const articlesCount = ownerArticle.length;

  useEffect(() => {
    if (authorId) {
      dispatch(fetchAuthor(authorId));
      dispatch(fetchArticlesByOwner(authorId));
    }
  }, [dispatch, authorId]);

  return (
    <section className={css.authorProfile}>
      <Container>
        <div className={css.contentBlock}>
          <div className={css.profileHeader}>
            <img
              src={author.avatarUrl}
              alt={author.name}
              className={css.profileImage}
            />
            <div>
              <h1 className={css.authorName}>{author.name}</h1>
              <p className={css.authorBio}>{articlesCount} Articles</p>
            </div>
          </div>
          <div>
            <ArticlesList articles={ownerArticle} />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AuthorProfilePage;
