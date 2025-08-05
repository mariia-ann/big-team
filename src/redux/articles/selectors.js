export const selectArticles = (state) => state.articles.items;
export const selectArticle = (state) => state.articles.currentArticle;
export const selectLoading = (state) => state.articles.isLoading;
export const selectError = (state) => state.articles.error;

import { createSelector } from "@reduxjs/toolkit";

export const selectArticlesByOwner = createSelector(
  [(state) => state.articles.byOwner, (_, ownerId) => ownerId],
  (byOwner, ownerId) => {
    const result = byOwner?.[ownerId]?.items;
    return result ?? [];
  }
);
