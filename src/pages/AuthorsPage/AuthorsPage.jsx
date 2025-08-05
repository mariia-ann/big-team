import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCreators,
  selectLoading,
  selectError,
} from "../../redux/author/selectors";
import { fetchAuthors } from "../../redux/author/operations";
import { AuthorsList } from "../../components/AuthorsPage/AuthorsList/AuthorsList";
import Container from "../../components/Container/Container";
import Loader from "../../components/Loader/Loader";
import css from "./AuthorsPage.module.css";

const ITEMS_PER_PAGE = 20;

const AuthorsPage = () => {
  const dispatch = useDispatch();
  const allAuthors = useSelector(selectCreators);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [page, setPage] = useState(1);
  const listRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const displayedAuthors = allAuthors.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = page * ITEMS_PER_PAGE < allAuthors.length;

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

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
  }, [displayedAuthors, page]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={css.authors}>
          <Container>
            <div className={css.contentBlock}>
              <h2 className={css.title}>Authors</h2>

              {!isLoading && error && (
                <p className={css.errorText}>An error occurred: {error}</p>
              )}

              {!isLoading &&
                !error &&
                (allAuthors.length === 0 ? (
                  <p className={css.noAuthors}>No authors found.</p>
                ) : (
                  <AuthorsList authors={displayedAuthors} listRef={listRef} />
                ))}
            </div>

            {hasMore && !isLoading && (
              <button className={css.loadMore} onClick={handleLoadMore}>
                Load More
              </button>
            )}
          </Container>
        </section>
      )}
    </>
  );
};

export default AuthorsPage;
