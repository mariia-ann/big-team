import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./PopularArticlesSection.module.css";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import AuthModal from "../ModalErrorSave/ModalErrorSave";
import { toast } from "react-hot-toast";
import { publicAPI } from "../../redux/api/publicAPI";

const ArrowIcon = () => (
  <svg width="16" height="17" viewBox="0 0 964 1024">
    <path
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeMiterlimit="4"
      strokeWidth="60.2353"
      stroke="#374F42"
      d="M52.704 935.412l858.024-858.353M910.728 77.059h-462.099M910.728 77.059v462.101"
    />
  </svg>
);

const PopularArticlesSection = () => {
  const location = useLocation();
  const [articles, setArticles] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loadingBookmarkId, setLoadingBookmarkId] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

  useEffect(() => {
    setShowAuthModal(false);
  }, [location]);

  useEffect(() => {
    const rawToken = localStorage.getItem("token");
    const token = rawToken?.replace(/^"|"$/g, "");
    setIsAuth(!!token);
  }, []);

  // Статические данные (fallback)
  useEffect(() => {
    setArticles([
      {
        id: "a1",
        author: "Clark",
        title: "When Anxiety Feels Like a Room With No Doors",
        excerpt: "A deeply personal reflection on living with generalized anxiety...",
        alt: "Person leaning on a railing and looking at a lake",
      },
      {
        id: "a2",
        author: "Debby",
        title: "The Quiet Power of Doing Nothing",
        excerpt: "In a culture obsessed with productivity...",
        alt: "Hands passing a black paper heart",
      },
      {
        id: "a3",
        author: "Max",
        title: "Mindful Mornings: 5-Minute Rituals to Start Your Day with Calm",
        excerpt: "Simple, science-backed practices...",
        alt: "Person walking on a road during sunrise",
      },
      {
        id: "a4",
        author: "Clark",
        title: "Meditation Techniques That Actually Work",
        excerpt: "10 advices how mediations can help you feeling better",
        alt: "Mental Health Matters on grey background",
      },
    ]);
  }, []);

  // Подгружаем изображения и id из бэка
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await publicAPI.get("/api/articles");

        const imgArticles = Array.isArray(res?.data?.data?.data)
          ? res.data.data.data
          : [];

        setArticles((prev) =>
          prev.map((article, i) => ({
            ...article,
            id: article.id || article._id || imgArticles[i]?._id,
            img: imgArticles[i]?.img || "/default-image.webp",
          }))
        );
      } catch (error) {
        console.error("❌ Failed to load article images:", error);
        toast.error("Failed to load article images");
      }
    };

    fetchImages();
  }, []);

  const handleBookmarkToggle = async (id) => {
    if (!isAuth) {
      openAuthModal();
      return;
    }

    setLoadingBookmarkId(id);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setBookmarked((prev) => {
        const isNowBookmarked = !prev.includes(id);
        toast.success(isNowBookmarked ? "Saved to bookmarks" : "Removed from bookmarks");
        return isNowBookmarked ? [...prev, id] : prev.filter((bid) => bid !== id);
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoadingBookmarkId(null);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <h2 className={styles.title}>Popular Articles</h2>
          <Link to="/articles" className={styles.allLink}>
            Go to all Articles <ArrowIcon />
          </Link>
        </div>

        <ul className={styles.articlesList}>
          {articles.map((article, index) => (
            <ArticlesItem
              key={article.id}
              article={article}
              isMiddle={index === 1}
              isAuth={isAuth}
              openAuthModal={openAuthModal}
              isSaved={bookmarked.includes(article.id)}
              onToggleSaved={() => handleBookmarkToggle(article.id)}
              isLoading={loadingBookmarkId === article.id}
            />
          ))}
        </ul>

        {showAuthModal && <AuthModal onClose={closeAuthModal} />}
      </div>
    </section>
  );
};

export default PopularArticlesSection;




















