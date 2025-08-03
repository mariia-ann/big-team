import { useState } from "react";
import { toast } from "react-hot-toast";
import IconBookmark from "../../../assets/images/icons/bookmark.svg?react";
import styles from "./ButtonAddToBookmarks.module.css";

const ButtonAddToBookmarks = ({ isAuth, openAuthModal, articleId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (e) => {
    e.stopPropagation();
    if (!isAuth) {
      openAuthModal && openAuthModal();
      return;
    }
    setIsLoading(true);
    try {
      
      setIsSaved((prev) => {
        const next = !prev;
        toast.success(next ? "Saved to bookmarks" : "Removed from bookmarks");
        return next;
      });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${styles.bookmarkCircle} ${isSaved ? styles.bookmarkActive : ""}`}
      tabIndex={0}
      onClick={handleToggle}
    >
      {isLoading ? "..." : <IconBookmark />}
    </div>
  );
};

export default ButtonAddToBookmarks;
