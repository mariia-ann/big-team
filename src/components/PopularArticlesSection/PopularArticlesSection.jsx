import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PopularArticlesSection.module.css";
import ArticlesItem from "../ArticlesItem/ArticlesItem";
import AuthModal from "../ModalErrorSave/ModalErrorSave";
import { toast } from "react-hot-toast";

import image1_1x from "../../assets/images/Image1-1x.webp";
import image2_1x_mob from "../../assets/images/Image2-1x-mob.webp";
import image3_1x_mob from "../../assets/images/Image3-1x-mob.webp";
import image4_1x_mob from "../../assets/images/Image4-1x-mob.webp";

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
  const [articles, setArticles] = useState([]);
  const [status, setStatus] = useState("idle");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loadingBookmarkId, setLoadingBookmarkId] = useState(null);
  const [bookmarked, setBookmarked] = useState([]);
  const [isAuth, setIsAuth] = useState(false); 

  const openAuthModal = () => setShowAuthModal(true);
  const closeAuthModal = () => setShowAuthModal(false);

useEffect(() => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      setIsAuth(true);
    }
  } catch (error) {
    setIsAuth(false);
  }
}, []);


  useEffect(() => {
    setStatus("loading");
    setTimeout(() => {
      setArticles([
        {
          id: 1,
          author: "Clark",
          title: "When Anxiety Feels Like a Room With No Doors",
          excerpt: "A deeply personal reflection on living with generalized anxiety...",
          img: image1_1x,
          alt: "Person leaning on a railing and looking at a lake",
        },
        {
          id: 2,
          author: "Debby",
          title: "The Quiet Power of Doing Nothing",
          excerpt: "In a culture obsessed with productivity...",
          img: image2_1x_mob,
          alt: "Hands passing a black paper heart",
        },
        {
          id: 3,
          author: "Max",
          title: "Mindful Mornings: 5-Minute Rituals to Start Your Day with Calm",
          excerpt: "Simple, science-backed practices...",
          img: image3_1x_mob,
          alt: "Person walking on a road during sunrise",
        },
        {
          id: 4,
          author: "Clark",
          title: "When Anxiety Feels Like a Room With No Doors",
          excerpt: "10 advices how mediations can help you feeling better",
          img: image4_1x_mob,
          alt: "Mental Health Matters on grey background",
        },
      ]);
      setStatus("success");
    }, 600);
  }, []);

  const handleBookmarkToggle = async (id) => {
    if (!isAuth) {
      openAuthModal();
      return;
    }

    setLoadingBookmarkId(id);
    try {
      // Імітація API-запиту
      await new Promise((resolve) => setTimeout(resolve, 500));

      setBookmarked((prev) =>
        prev.includes(id) ? prev.filter((bid) => bid !== id) : [...prev, id]
      );
    } catch (error) {
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
        {status === "loading" && <p>Loading…</p>}
        {status === "success" && (
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
              />
            ))}
          </ul>
        )}
        {showAuthModal && <AuthModal onClose={closeAuthModal} />}
      </div>
    </section>
  );
};

export default PopularArticlesSection;











