import { useEffect, useState } from "react";
import MyArticlesContent from "./MyArticlesContent/MyArticlesContent.jsx";
import SavedArticlesContent from "./SavedArticlesContent/SavedArticlesContent.jsx";
import s from "./NothingFound.module.css";
import Container from "../Container/Container.jsx";
// import avatar from "../../assets/images/about/AboutUs-comp1-1x.webp";
import { useDispatch, useSelector } from "react-redux";
import { selectCreator } from "../../redux/author/selectors.js";
import { fetchAuthor } from "../../redux/author/operations.js";

const NothingFound = () => {
  const [activeTab, setActiveTab] = useState("my");
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const creator = useSelector(selectCreator);

  useEffect(() => {
    if (userId) {
      dispatch(fetchAuthor(userId));
    }
  }, [dispatch, userId]);

  const name = creator?.name || "Unknown";
  const avatarUrl = creator?.avatarUrl || null;
  const articleCount = creator?.articleCount ?? 0;

  return (
    <div className={s.profile}>
      <Container>
        <h2 className={s.title}>My Profile</h2>

        <div className={s.userInfo}>
          <img className={s.avatar} src={avatarUrl} alt={name} loading="lazy" />
          <div className={s.userText}>
            <h3 className={s.username}>{name}</h3>
            <p className={s.articleCount}> {articleCount} articles</p>
          </div>
        </div>

        <div className={s.tabs}>
          <button
            className={`${s.tabButton} ${activeTab === "my" ? s.active : ""}`}
            onClick={() => setActiveTab("my")}
          >
            My Articles
          </button>
          <button
            className={`${s.tabButton} ${
              activeTab === "saved" ? s.active : ""
            }`}
            onClick={() => setActiveTab("saved")}
          >
            Saved Articles
          </button>
        </div>

        <div className={s.tabContent}>
          {activeTab === "my" ? (
            <MyArticlesContent />
          ) : (
            <SavedArticlesContent />
          )}
        </div>
      </Container>
    </div>
  );
};

export default NothingFound;
