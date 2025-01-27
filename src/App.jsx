import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { injectReducer } from './utils/store';
import './index.css';
import { Login, Home, Category, MovieDetail, Auth, SearchPage, Favorites, Player, AdminPage, TopPage} from './routes/routes';
import Layout from './components/Layout';

const App = () => {
  useEffect(() => {
    import('./utils/movieSlice').then((module) => {
      injectReducer('movie', module.default);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: '/login',
      element: (
        <React.Suspense fallback={<div className="load">Loading...</div>}>
          <Login />
        </React.Suspense>
      ),
    },
    {
      path: '/',
      element: (
        <React.Suspense fallback={<div className="load">Loading...</div>}>
          <Layout>
            <Home />
          </Layout>
        </React.Suspense>
      ),
    },
    {
      path: '/category/:categoryId/:sortType?',
      element: (
        <React.Suspense fallback={<div className="load">Loading...</div>}>
          <Layout>
            <Category />
          </Layout>
        </React.Suspense>
      ),
    },
    {
      path: '/movie/:id',
      element: (
        <React.Suspense fallback={<div className="load">Loading...</div>}>
          <Layout>
            <MovieDetail />
          </Layout>
        </React.Suspense>
      ),
    },
    {
      path: '/auth',
      element: (
        <React.Suspense fallback={<div className="load">Loading...</div>}>
          <Auth />
        </React.Suspense>
      ),
    },
    {
      path: '/search',
      element: (
        <React.Suspense fallback={<div className="load">Loading...</div>}>
          <Layout>
            <SearchPage />
          </Layout>
        </React.Suspense>
      ),
    },
    {
      path: '/favorites',
      element: (
        <React.Suspense fallback={<div className="load">Loading...</div>}>
          <Layout>
            <Favorites />
          </Layout>
        </React.Suspense>
      ),
    },
    {
      path: '/player/:id',
      element: (
        <React.Suspense fallback={<div className="load">Loading...</div>}>
          <Player />
        </React.Suspense>
      ),
    },
    {
      path: '/adminSPage',
      element: (
        <React.Suspense fallback={<div className="load">Loading...</div>}>
          <AdminPage />
        </React.Suspense>
      ),
    },
    {
      path: '/top',
      element: (
        <React.Suspense fallback={<div className="load">Loading...</div>}>
          <Layout>
            <TopPage />
          </Layout>
        </React.Suspense>
      ),
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
