import ArticlesItem2 from "../../ArticlesItem2/ArticlesItem2.jsx";
import s from "./ArticlesList.module.css";

const ArticlesList = ({ articles = [], users = [] }) => {
  if (articles.length === 0) {
    return <p>No articles available</p>;
  }

  return (
    <ul className={s.articlesList}>
      {articles.map((article) => {
        const userId = article.ownerId?.$oid ?? article.ownerId;
        const user = users.find(({ _id }) => _id === userId);

        return (
          <ArticlesItem2
            key={article._id?.$oid ?? article._id}
            article={article}
            user={user}
          />
        );
      })}
    </ul>
  );
};
export default ArticlesList;
