export const selectCreators = (state) => state.authors.items;
export const selectLoading = (state) => state.authors.isLoading;
export const selectError = (state) => state.authors.error;