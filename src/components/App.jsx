import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import UploadPhoto from "../pages/UploadPhotoPage/UploadPhotoPage.jsx";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./Loader/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "../redux/auth/selectors.js";
import { refreshThunk } from "../redux/auth/operations.js";
import PrivateRoute from "./PrivateRoute.jsx";

const HomePage = lazy(() => import("../pages/HomePage/HomePage.jsx"));
const RegisterPage = lazy(() => import("../pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const ArticlesPage = lazy(() => import("../pages/ArticlesPage/ArticlesPage"));
const ArticlePage = lazy(() => import("../pages/ArticlePage/ArticlePage"));
const AuthorsPage = lazy(() => import("../pages/AuthorsPage/AuthorsPage"));
const AuthorProfilePage = lazy(() =>
  import("../pages/AuthorProfilePage/AuthorProfilePage")
);
const CreateArticlePage = lazy(() =>
  import("../pages/CreateArticlePage/CreateArticlePage")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const MyProfilePage = lazy(() =>
  import("../pages/MyProfilePage/MyProfilePage")
);

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? null : (
      <Suspense fallback={<Loader />}>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/photo" element={<UploadPhoto />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/articles/:articlesId" element={<ArticlePage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/authors/:authorsId" element={<AuthorProfilePage />} />
            <Route path="/create" element={
            <PrivateRoute>
              <CreateArticlePage />
            </PrivateRoute>
          } />
            <Route path="/profile" element={
            <PrivateRoute>
              <MyProfilePage />
            </PrivateRoute>
          } />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Suspense>
  );
}

export default App;
