import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { publicAPI } from "../../redux/api/publicAPI.js";
/*import icons*/
import s from "./ArticlePage.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const BookmarkIcon = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.4971 3.5C13.7607 3.50001 14.9206 3.62091 15.8398 3.76074C17.0036 3.93777 17.916 4.7353 18.1758 5.84961C18.4894 7.19485 18.7969 9.24141 18.7441 11.9902C18.6859 15.0233 18.2432 17.2117 17.8164 18.6396C17.701 19.0256 17.4339 19.2243 17.1318 19.2754C16.816 19.3287 16.4263 19.2236 16.1094 18.9082C15.5326 18.334 14.8719 17.7138 14.2627 17.2344C13.9586 16.9951 13.6558 16.7817 13.375 16.626C13.1101 16.4791 12.7995 16.3457 12.4971 16.3457C12.1993 16.3457 11.8783 16.4769 11.5977 16.6211C11.2986 16.7747 10.9675 16.9855 10.6289 17.2246C9.95038 17.7037 9.19895 18.3244 8.53711 18.8994C8.18779 19.2029 7.77644 19.2747 7.45215 19.1865C7.13917 19.1013 6.87522 18.8609 6.79395 18.4424C6.51488 17.0044 6.25 14.8805 6.25 12C6.25 9.12652 6.54615 7.09969 6.84082 5.79492C7.08505 4.71356 7.9671 3.94375 9.10156 3.76855C10.0289 3.62535 11.2091 3.5 12.4971 3.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const SearchIcon = ({ size = 24, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M5.375 19.125L19.6195 4.875M19.6195 4.875H11.948M19.6195 4.875L19.6196 12.5466"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ArticlePage = () => {
  const { articlesId } = useParams();
  const [savedArticles, setSavedArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState({
    article: true,
    related: true,
    users: true,
  });

  const getUserName = (usersArray, ownerId) => {
    const id = ownerId?.$oid ?? ownerId;
    const user = usersArray.find(({ _id }) => _id === id);
    return user?.name ?? "Невідомо";
  };

  const getRandomArticles = (allArticles, currentId, count = 3) => {
    const filtered = allArticles.filter(
      (item) => item._id !== currentId && item._id?.$oid !== currentId
    );
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleRes, usersRes, allArticlesRes] = await Promise.all([
          publicAPI.get(`/api/articles/${articlesId}`),
          publicAPI.get("/api/creators/all"),
          publicAPI.get("/api/articles"),
        ]);
        setArticle(articleRes.data.data);
        const rawUsers = usersRes.data.data ?? usersRes.data;
        const usersArray = Array.isArray(rawUsers) ? rawUsers : [];
        setUsers(usersArray);

        const rawArticles =
          allArticlesRes.data.data?.data ?? allArticlesRes.data;
        const articlesArray = Array.isArray(rawArticles) ? rawArticles : [];
        const randomRelated = getRandomArticles(articlesArray, articlesId, 3);
        setRelatedArticles(randomRelated);
      } catch (error) {
        console.error("Error fetching:", error);
      } finally {
        setLoading({ article: false, related: false, users: false });
      }
    };

    fetchData();
  }, [articlesId]);

  const handleSave = () => {
    if (!savedArticles.includes(articlesId)) {
      setSavedArticles((prev) => [...prev, articlesId]);
    }
  };

  if (loading.article || loading.users) return <Loader />;

  if (!article) {
    return <p className={s.empty}>Стаття не знайдена</p>;
  }
  const formattedText = article.article.replace(/\/n/g, "<br><br>");

  const userId = article.ownerId?.$oid ?? article.ownerId;
  const user = users.find(({ _id }) => _id === userId);
  const authorName = user?.name ?? "Невідомо";

  return (
    <Container>
      <div className={s.articleWrapper}>
        <SectionTitle title={article.title} />
        {article.img && (
          <img
            className={s.articleImage}
            src={article.img}
            alt={`Зображення: ${article.title}`}
          />
        )}
        <div className={s.contentBlock}>
          <p
            className={s.articleText}
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
          <div className={s.wrapper}>
            <div className={s.metaBlock}>
              <p className={s.author}>
                <strong>Author:</strong>&nbsp;
                <span className={s.authorName}>{authorName}</span>
              </p>
              <p className={s.date}>
                <strong>Publication date:</strong>&nbsp;
                {new Date(article.date).toLocaleDateString()}
              </p>
              <p className={s.bottomText}>You can also interested</p>
              <ul className={s.links}>
                {relatedArticles.map((suggested) => {
                  const id = suggested._id?.$oid ?? suggested._id;
                  return (
                    <li key={id} className={s.similarArticles}>
                      <div className={s.linkBlock}>
                        <div className={s.titleWithIcon}>
                          <Link
                            to={`/articles/${id}`}
                            className={s.similarArticlesTitle}
                          >
                            {suggested.title}
                          </Link>

                          <Link className={s.linkButton} to={`/articles/${id}`}>
                            <SearchIcon className={s.linkIcon} size={24} />
                          </Link>
                        </div>
                        <p className={s.similarArticlesAuthor}>
                          {getUserName(users, suggested.ownerId)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <button onClick={handleSave} className={s.button}>
              Save
              <BookmarkIcon className={s.buttonIcon} size={24} />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ArticlePage;
