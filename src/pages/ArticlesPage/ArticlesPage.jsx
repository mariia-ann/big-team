import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import Container from "../../components/Container/Container";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn.jsx";
import Loader from "../../components/Loader/Loader";

import { loadArticles } from "../../redux/articles/operations.js";
import { setFilter, clearArticles } from "../../redux/articles/slice.js";

import {
  selectArticles,
  selectLoading,
  selectPage,
  selectFilter,
  selectHasMore,
} from "../../redux/articles/selectors.js";

import s from "./ArticlesPage.module.css";
import chevronIcon from "../../assets/images/icons/chevron-down.svg";

const limit = 12;
const filterOptions = ["All", "Popular"];

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const loading = useSelector(selectLoading);
  const page = useSelector(selectPage);
  const filter = useSelector(selectFilter);
  const hasMore = useSelector(selectHasMore);

  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef(null);

  // 🔁 При зміні фільтру — очищуємо і завантажуємо 1 сторінку
  const handleFilterChange = (e) => {
    const selected = e.target.value;
    dispatch(setFilter(selected));
    dispatch(clearArticles());
    dispatch(loadArticles({ page: 1, limit, type: selected }));
  };

  // ➕ Load more
  const handleLoadMore = () => {
    const nextPage = page + 1;
    dispatch(loadArticles({ page: nextPage, limit, type: filter }));
  };

  // ⏳ Первинне завантаження при відкритті сторінки
  useEffect(() => {
    dispatch(clearArticles());
    dispatch(loadArticles({ page: 1, limit, type: filter }));
  }, [dispatch, filter]);

  // 🧭 Автоматичний скрол при load more
  useEffect(() => {
    if (page > 1 && listRef.current) {
      const firstNewIndex = (page - 1) * limit;
      const el = listRef.current.children[firstNewIndex];
      if (el) {
        window.scrollTo({
          top: el.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [page]);

  // 🌀 Loader на старті
  if (loading && articles.length === 0) {
    return (
      <section>
        <Container>
          <SectionTitle title="Articles" />
          <Loader />
        </Container>
      </section>
    );
  }

  return (
    <section>
      <Container>
        <SectionTitle title="Articles" />
        <div className={s.articlesHeader}>
          <span className={s.articleCount}>{articles.length} articles</span>
          <div
            className={s.dropdownWrapper}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
          >
            <select
              value={filter}
              onChange={handleFilterChange}
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

        <ArticlesList articles={articles} listRef={listRef} />

        {loading && articles.length > 0 && (
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <Loader />
          </div>
        )}

        {!loading && hasMore && articles.length > 0 && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </Container>
    </section>
  );
};

export default ArticlesPage;
