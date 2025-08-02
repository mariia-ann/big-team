import { useState, useEffect, useRef } from "react";
import axios from "axios";
import css from "./AuthorsPage.module.css";
import { AuthorsItem } from "./AuthorsItem";
import Container from "../../components/Container/Container";

const ITEMS_PER_PAGE = 20;
const BASE_URL = "https://harmoniq-server-big-team.onrender.com";

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);
  const [allFetchedAuthors, setAllFetchedAuthors] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const listRef = useRef(null);

  const fetchAllAuthorsOnce = async () => {
    if (isLoading || allFetchedAuthors.length > 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${BASE_URL}/api/creators/all`);
      const data = response.data;

      setAllFetchedAuthors(data);
      setHasMore(true);
    } catch (err) {
      console.error("Failed to fetch all authors:", err);
      setError("Failed to load authors. Please try again later.");
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAuthorsOnce();
  }, []);

  useEffect(() => {
    if (allFetchedAuthors.length > 0) {
      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const authorsForCurrentPage = allFetchedAuthors.slice(
        startIndex,
        endIndex
      );

      setAuthors((prevAuthors) => {
        const updatedAuthors = [...prevAuthors, ...authorsForCurrentPage];
        const uniqueAuthors = Array.from(
          new Map(updatedAuthors.map((item) => [item._id, item])).values()
        );
        return uniqueAuthors;
      });

      setHasMore(endIndex < allFetchedAuthors.length);
    }
  }, [page, allFetchedAuthors]);

  useEffect(() => {
    if (page > 1 && listRef.current) {
      const firstNewAuthorIndex = (page - 1) * ITEMS_PER_PAGE;
      const targetAuthorElement = listRef.current.children[firstNewAuthorIndex];

      if (targetAuthorElement) {
        window.scrollTo({
          top: targetAuthorElement.offsetTop,
          behavior: "smooth",
        });
      }
    }
  }, [authors, page]);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className={css.authors}>
      <Container>
        <div className={css.contentBlock}>
          <h2 className={css.title}>Authors</h2>

          {error && <p className={css.error}>{error}</p>}

          {isLoading && allFetchedAuthors.length === 0 && (
            <p className={css.loading}>Loading authors...</p>
          )}

          {allFetchedAuthors.length === 0 && !isLoading && !error ? (
            <p className={css.noAuthors}>No authors available</p>
          ) : (
            <ul className={css.list} ref={listRef}>
              {authors.map((author) => (
                <AuthorsItem
                  key={author._id}
                  _id={author._id}
                  name={author.name}
                  avatarUrl={author.avatarUrl}
                  articlesAmount={author.articlesAmount}
                />
              ))}
            </ul>
          )}
        </div>

        {hasMore && !isLoading && (
          <button className={css.loadMore} onClick={handleLoadMore}>
            Load More
          </button>
        )}

        {isLoading && allFetchedAuthors.length === 0 && (
          <p className={css.loadingMore}>Loading initial authors...</p>
        )}
      </Container>
    </section>
  );
};

export default AuthorsPage;
