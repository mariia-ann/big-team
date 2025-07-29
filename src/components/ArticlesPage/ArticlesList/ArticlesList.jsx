import ArticlesItem from "../../ArticlesItem/ArticlesItem";
import s from "./ArticlesList.module.css";

const ArticlesList = ({ articles = [] }) => {
  if (articles.length === 0) {
    return <p>No articles available</p>;
  }

  return (
    <ul className={s.articlesList}>
      {articles.map((article) => (
        <ArticlesItem key={article._id.$oid} article={article} />
      ))}
    </ul>
  );
};
export default ArticlesList;
