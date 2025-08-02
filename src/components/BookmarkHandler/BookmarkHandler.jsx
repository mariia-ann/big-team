import { useState } from "react";
import { toast } from "react-hot-toast";
import ButtonAddToBookmarks from "../ArticlesPage/ButtonAddToBookmarks/ButtonAddToBookmarks";

const BookmarkHandler = ({ articleId, isAuth, openAuthModal }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    if (!isAuth) {
      openAuthModal(); 
      return;
    }

    setIsLoading(true);
    try {
      
      await new Promise((res) => setTimeout(res, 500));

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
    <ButtonAddToBookmarks
      isSaved={isSaved}
      isLoading={isLoading}
      onClick={handleToggle}
    />
  );
};

export default BookmarkHandler;

