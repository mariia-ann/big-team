export const selectCreators = (state) => state.authors.items;
export const selectTopCreators = (state) => state.authors.topItems;
export const selectCreator = (state) => state.authors.currentCreator;
export const selectLoading = (state) => state.authors.isLoading;
export const selectError = (state) => state.authors.error;
