import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { articlesReducer } from "./articles/slice";
import { authorReducer } from "./author/slice";
import { bookmarksReducer } from "./bookmarks/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "root-auth",
  version: 1,
  storage,
  whitelist: ["token"],
};

const bookmarksPersistConfig = {
  key: "bookmarks",
  version: 1,
  storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedBookmarksReducer = persistReducer(bookmarksPersistConfig, bookmarksReducer);

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    authors: authorReducer,
    auth: persistedAuthReducer,
    bookmarks: persistedBookmarksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


