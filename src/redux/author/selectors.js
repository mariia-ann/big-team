import { createSelector } from "@reduxjs/toolkit";
import { selectArticles } from "../articles/selectors.js";

export const selectCreators = (state) => state.authors.items;
export const selectTopCreators = (state) => state.authors.topItems;
export const selectCreator = (state) => state.authors.currentCreator;
export const selectAddSavedArticle = (state) => state.authors.savedArticle;
export const selectSavedArticles = (state) => state.authors.savedArticles;

export const selectLoading = (state) => state.authors.isLoading;
export const selectError = (state) => state.authors.error;

export const selectFullSavedArticles = createSelector(
  [selectSavedArticles, selectArticles],
  (savedArticles, allArticles) => {
    if (!savedArticles.length || !allArticles.length) {
      return [];
    }
    return savedArticles
      .map(saved => allArticles.find(article => article._id === saved._id))
      .filter(Boolean);
  }
);

export const selectArticleById = createSelector(
  [selectArticles, (_, articleId) => articleId],
  (articles, articleId) => {
    return articles.find(article => article._id === articleId) || null;
  }
);
