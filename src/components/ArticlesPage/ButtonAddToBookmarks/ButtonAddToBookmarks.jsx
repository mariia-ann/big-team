import s from "./ButtonAddToBookmarks.module.css";

const ButtonAddToBookmarks = ({ articleId }) => {
  const handleClick = () => {
    console.log(`Стаття ${articleId} додана в закладки`);
  };

  return (
    <button onClick={handleClick} className={s.button}>
      ➕ Закладки
    </button>
  );
};

export default ButtonAddToBookmarks;
