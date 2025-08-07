import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { publicAPI } from "../../redux/api/publicAPI.js";
import ArrowIcon from "../../assets/images/icons/arrow.svg?react";
import BookmarkIcon from "../../assets/images/icons/bookmark.svg?react";
import s from "./ArticlePage.module.css";
import Loader from "../../components/Loader/Loader.jsx";

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
  window.scrollTo({ top: 0, behavior: "smooth" });
}, [articlesId]);
  
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
                            <ArrowIcon className={s.linkIcon} size={24} />
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
