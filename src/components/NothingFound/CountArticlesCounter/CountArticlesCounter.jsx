import IconLogo from "../../../assets/images/icons/alert.svg?react";
import s from "../SavedArticlesContent/SavedArticlesContent.module.css";
const CountArticlesContent = () => (
  <div className={s.wrapper}>
    <IconLogo className={s.logo} />
    <p className={s.title}>Nothing found.</p>
    <p className={s.description}>Be the first, who create an article</p>
    <button className={s.button}>Create an article</button>
  </div>
);

export default CountArticlesContent;
