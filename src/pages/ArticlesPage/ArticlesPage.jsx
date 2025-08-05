import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import Container from "../../components/Container/Container";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";

import { fetchArticles } from "../../redux/articles/operations.js";
import {
  incrementPage,
  setPage,
  setFilter,
  clearArticles,
} from "../../redux/articles/slice.js";
import {
  selectArticles,
  selectLoading,
  selectPage,
  selectFilter,
} from "../../redux/articles/selectors.js";

import s from "./ArticlesPage.module.css";
import chevronIcon from "../../assets/images/icons/chevron-down.svg";

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const loading = useSelector(selectLoading);
  const page = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const limit = 12;

  const [isOpen, setIsOpen] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const [users, setUsers] = useState([]);
  const filterOptions = ["All", "Popular"];

  const handleLoadMore = () => {
    dispatch(incrementPage());
  };

  useEffect(() => {
    dispatch(clearArticles());
    dispatch(fetchArticles({ page, limit, type: filter }));
  }, [page, filter]);

  return (
    <section>
      <Container>
        <SectionTitle title="Articles" />
        <div className={s.articlesHeader}>
          <span className={s.articleCount}>{articles.length} articles</span>
          <div className={s.dropdownWrapper}>
            <select
              value={filter}
              onChange={(e) => {
                const selected = e.target.value;
                dispatch(clearArticles()); // Очищення перед новим запитом
                dispatch(setFilter(selected)); // Встановлення нового фільтру
                dispatch(setPage(1)); // Повернення на першу сторінку
                dispatch(fetchArticles({ page: 1, limit, type: selected }));
              }}
              className={s.dropdown}
            >
              {filterOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <img
              src={chevronIcon}
              alt=""
              width="16"
              height="16"
              className={`${s.dropdownIcon} ${isOpen ? s.open : ""}`}
              aria-hidden="true"
            />
          </div>
        </div>
        <ArticlesList articles={articles} users={users} />
        {articles.length > 0 && !loading && showLoadMore && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </Container>
    </section>
  );
};

export default ArticlesPage;
