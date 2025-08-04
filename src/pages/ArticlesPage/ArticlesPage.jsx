// import React, { useState, useEffect } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import ArticlesList from "../../components/ArticlesList/ArticlesList";
import Container from "../../components/Container/Container";
// import { publicAPI } from "../../redux/api/publicAPI.js";
import s from "./ArticlesPage.module.css";
// import chevronIcon from "../../assets/images/icons/chevron-down.svg";
// import Loader from "../../components/Loader/Loader.jsx";

const ArticlesPage = () => {
  // const [filter, setFilter] = useState("All");
  // const [isOpen, setIsOpen] = useState(false);
  // const [articles, setArticles] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [page, setPage] = useState(1);
  // const [count, setCount] = useState(0);
  // const [hasMore, setHasMore] = useState(true);
  // const limit = 5;
  // const [users, setUsers] = useState([]);
  // const filterOptions = ["All", "Popular"];
  // const useFilter = false;

  // const fetchArticles = async (reset = false) => {
  //   try {
  //     const [articlesRes, usersRes] = await Promise.all([
  //       publicAPI.get("/api/articles", {
  //         params: {
  //           page: reset ? 1 : page,
  //           limit,
  //           type: useFilter ? filter : undefined,
  //         },
  //       }),
  //       publicAPI.get("/api/creators/all"),
  //     ]);

  //     const { data: newArticles, total, hasMore: more } = articlesRes.data.data;

  //     const userList = usersRes.data.data;

  //     const formatted = newArticles.map((article) => ({
  //       ...article,
  //       _id: article._id?.$oid || article._id,
  //       ownerId: article.ownerId?.$oid || article.ownerId,
  //     }));

  //     const filtered = useFilter ? filterArticles(formatted) : formatted;

  //     if (reset) {
  //       setArticles(filtered);
  //       setPage(2);
  //     } else {
  //       setArticles((prev) => [...prev, ...filtered]);
  //       setPage((prev) => prev + 1);
  //     }

  //     setUsers(userList);
  //     setCount(total);
  //     setHasMore(more);
  //     setError(null);
  //   } catch (err) {
  //     setError("Error fetching articles");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (!useFilter) {
  //     setLoading(true);
  //     fetchArticles(true);
  //   }
  // }, []);

  return (
    <section>
      <Container>
        <SectionTitle title="Articles" />
        <div className={s.articlesHeader}>
          {/* {!loading && (
            <span className={s.articleCount}>{articles.length} articles</span>
          )} */}

          {/* {useFilter && (
            <div className={s.dropdownWrapper}>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                onClick={() => setIsOpen((prev) => !prev)}
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
          )} */}
        </div>
        {/* {loading && <Loader />}
        {error && <p className={s.error}>{error}</p>}
        {!loading && articles.length === 0 && (
          <p className={s.emptyMessage}>No articles available</p>
        )} */}
        <ArticlesList />
      </Container>
    </section>
  );
};

export default ArticlesPage;
