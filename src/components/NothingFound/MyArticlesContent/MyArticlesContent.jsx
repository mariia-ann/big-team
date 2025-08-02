import IconLogo from "../../../assets/images/icons/alert.svg?react";
import s from "../SavedArticlesContent/SavedArticlesContent.module.css";
const MyArticlesContent = () => (
  <div className={s.wrapper}>
    <IconLogo className={s.logo} />
    <p className={s.title}>Nothing found.</p>
    <p className={s.description}>Write your first article</p>
    <button className={s.button}>Create an article</button>
  </div>
);

export default MyArticlesContent;
