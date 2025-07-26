import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PopularArticlesSection.module.css";
import ArticlesItem from "../ArticlesItem/ArticlesItem";


import image1_1x from "../../assets/images/Image1-1x.webp";
import image1_2x from "../../assets/images/Image1-2x.webp";
import image2_1x from "../../assets/images/Image2-1x.webp";
import image2_2x from "../../assets/images/Image2-2x.webp";
import image3_1x from "../../assets/images/Image3-1x.webp";
import image3_2x from "../../assets/images/Image3-2x.webp";


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
  const [error, setError] = useState(null);

  useEffect(() => {
    
    setStatus("loading");
    setTimeout(() => {
      setArticles([
        {
          id: 1,
          author: "Clark",
          title: "When Anxiety Feels Like a Room With No Doors",
          excerpt:
            "A deeply personal reflection on living with generalized anxiety and the small rituals that hel...",
          image1x: image1_1x,
          image2x: image1_2x,
          alt: "Person leaning on a railing and looking at a lake",
        },
        {
          id: 2,
          author: "Debby",
          title: "The Quiet Power of Doing Nothing",
          excerpt:
            "In a culture obsessed with productivity, embracing rest can be an act of resistance – and...",
          image1x: image2_1x,
          image2x: image2_2x,
          alt: "Hands passing a black paper heart",
        },
        {
          id: 3,
          author: "Max",
          title:
            "Mindful Mornings: 5-Minute Rituals to Start Your Day with Calm",
          excerpt:
            "Simple, science-backed practices that can gently shift your mood and focus before the day begins.",
          image1x: image3_1x,
          image2x: image3_2x,
          alt: "Person walking on a road during sunrise",
        },
      ]);
      setStatus("success");
    }, 600); 
  }, []);

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
        {status === "error" && <p className={styles.error}>Error: {error}</p>}
        {status === "success" && (
          <ul className={styles.articlesList}>
            {articles.map((article) => (
              <ArticlesItem key={article.id} article={article} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default PopularArticlesSection;




