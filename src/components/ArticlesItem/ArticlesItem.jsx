import { useState } from "react";
import styles from "./ArticlesItem.module.css";

const BookmarkCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 1024 1024" aria-hidden="true">
    <path
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeMiterlimit="4"
      strokeWidth="40.96"
      stroke="currentColor"
      d="M511.881 180.4c51.757 0 99.267 4.952 136.917 10.68 47.669 7.251 85.041 39.918 95.683 85.56 12.845 55.101 25.44 138.928 23.278 251.519-2.384 124.236-20.517 213.869-37.999 272.359-4.727 15.811-15.667 23.949-28.041 26.042-12.935 2.183-28.897-2.122-41.878-15.041-23.626-23.519-50.688-48.923-75.641-68.559-12.456-9.802-24.859-18.543-36.36-24.92-10.85-6.017-23.572-11.481-35.959-11.481-12.198 0-25.346 5.374-36.839 11.28-12.251 6.291-25.813 14.926-39.682 24.719-27.792 19.624-58.571 45.048-85.68 68.6-14.308 12.431-31.157 15.372-44.44 11.76-12.82-3.49-23.631-13.337-26.96-30.478-11.431-58.9-22.28-145.895-22.28-263.881 0-117.699 12.13-200.717 24.2-254.16 10.004-44.293 46.132-75.824 92.6-83 37.984-5.866 86.325-11 139.081-11z"
    />
  </svg>
);

function ArticleButtonWithBookmark() {
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles.buttonWithBookmark}>
      <button
        type="button"
        className={`${styles.articleButton} ${focus ? styles.articleButtonActive : ""}`}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onMouseDown={() => setFocus(true)}
        onMouseUp={() => setFocus(false)}
        onMouseLeave={() => setFocus(false)}
      >
        Learn more
      </button>
      <div className={styles.bookmarkCircle}>
        <BookmarkCircleIcon active={focus} />
      </div>
    </div>
  );
}

const ArticlesItem = ({ article, isMiddle }) => {
  const {
    author,
    title,
    excerpt,
    image1x_mob,
    image2x_mob,
    image1x_tab,
    image2x_tab,
    image1x,
    image2x,
    alt
  } = article;

  return (
    <li className={styles.articleItem}>
      <picture className={styles.articleImageWrap}>
        {image1x_tab && image2x_tab && (
          <source
            srcSet={`${image1x_tab} 1x, ${image2x_tab} 2x`}
            media="(min-width: 768px)"
            type="image/webp"
          />
        )}
        {image1x_mob && image2x_mob && (
          <source
            srcSet={`${image1x_mob} 1x, ${image2x_mob} 2x`}
            media="(max-width: 767px)"
            type="image/webp"
          />
        )}
        <img
          className={`${styles.articleImage} ${isMiddle ? styles.articleImageMiddle : ""}`}
          src={image1x_mob || image1x}
          srcSet={
            image1x_mob && image2x_mob
              ? `${image1x_mob} 1x, ${image2x_mob} 2x`
              : `${image1x} 1x, ${image2x} 2x`
          }
          alt={alt || title}
          loading="lazy"
        />
      </picture>
      <div className={styles.author}>{author}</div>
      <div className={styles.articleTitle}>{title}</div>
      <div className={`${styles.excerpt} ${isMiddle ? styles.excerptMiddle : ""}`}>
        {excerpt || "\u00A0"}
      </div>
      <div className={styles.buttonWrap}>
        <ArticleButtonWithBookmark />
      </div>
    </li>
  );
};

export default ArticlesItem;




