import s from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <div>
      <button className={s.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
