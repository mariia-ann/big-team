import IoClose from "../../../assets/images/icons/alert.svg?react";
import s from "./SavedArticlesContent.module.css";
const SavedArticlesContent = () => (
  <div className={s.wrapper}>
    <IoClose className={s.logo} />
    <p className={s.title}>Nothing found.</p>
    <p className={s.description}>Save your first article</p>
    <button className={s.button}>Go to articles</button>
  </div>
);

export default SavedArticlesContent;
