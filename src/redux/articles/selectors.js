export const selectArticles = (state) => state.articles.items;
export const selectArticle = (state) => state.articles.currentArticle;
export const selectLoading = (state) => state.articles.isLoading;
export const selectError = (state) => state.articles.error;