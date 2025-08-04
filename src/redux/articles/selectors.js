// import { createSelector } from "@reduxjs/toolkit";

export const selectArticles = (state) => state.articles.items;
export const selectArticle = (state) => state.articles.currentArticle;
export const selectLoading = (state) => state.articles.isLoading;
export const selectError = (state) => state.articles.error;

export const selectSavedArticles = (state) => state.articles.error;

export const selectArticlesByOwner = (state, ownerId) =>
  state.articles.byOwner?.[ownerId]?.items || [];


// export const selectArticlesByOwner= createSelector(
//   [(state) => state.articles.byOwner, (_, ownerId) => ownerId],
//   (byOwner, ownerId) => {
//     return byOwner?.[ownerId]?.items || [];
//   }
// );