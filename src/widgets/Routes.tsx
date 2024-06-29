import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '../utils/routes';
import Home from '../pages/Home/Home';
import NewsPage from '../pages/NewsPage/NewsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={<Home />}
      />
      <Route
        path={ROUTES.ARTICLE}
        element={<NewsPage />}
      />
    </Routes>
  );
};
export default AppRoutes;
