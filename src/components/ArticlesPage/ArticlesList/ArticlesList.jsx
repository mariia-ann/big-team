import ArticlesItem2 from "../../ArticlesItem2/ArticlesItem2.jsx";
import s from "./ArticlesList.module.css";

const ArticlesList = ({ articles = [] }) => {
  if (articles.length === 0) {
    return <p>No articles available</p>;
  }

  return (
    <ul className={s.articlesList}>
      {articles.map((article) => (
        <ArticlesItem2 key={article.id} article={article} />
      ))}
    </ul>
  );
};
export default ArticlesList;
