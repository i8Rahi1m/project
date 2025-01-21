import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { injectReducer } from './utils/store';
import './index.css';

const Home = React.lazy(() => import('./pages/home'));
const Login = React.lazy(() => import('./pages/login'));
const Category = React.lazy(() => import('./pages/CategoryPage'));
const MovieDetail = React.lazy(() => import('./pages/MovieDetail'));
const Auth = React.lazy(() => import('./pages/login'));
const SearchPage = React.lazy(() => import('./pages/SearchPage'));
const Favorites = React.lazy(() => import('./pages/Favorites'));
const Player = React.lazy(() => import('./pages/player'));
const AdminPage = React.lazy(() => import('./pages/admin'));
const TopPage = React.lazy(() => import('./pages/TopPage'));

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
        <React.Suspense fallback={<div className='load'>Loading...</div>}>
          <Login />
        </React.Suspense>
      ),
    },
    {
      path: '/',
      element: (
        <React.Suspense fallback={<div className='load'>Loading...</div>}>
          <Home />
        </React.Suspense>
      ),
    },
    {
      path: '/category/:categoryId/:sortType?',
      element: (
        <React.Suspense fallback={<div className='load'>Loading...</div>}>
          <Category />
        </React.Suspense>
      ),
    },
    {
      path: '/movie/:id',
      element: (
        <React.Suspense fallback={<div className='load'>Loading...</div>}>
          <MovieDetail />
        </React.Suspense>
      ),
    },
    {
      path: '/auth',
      element: (
        <React.Suspense fallback={<div className='load'>Loading...</div>}>
          <Auth />
        </React.Suspense>
      ),
    },
    {
      path: '/search',
      element: (
        <React.Suspense fallback={<div className='load'>Loading...</div>}>
          <SearchPage />
        </React.Suspense>
      ),
    },
    {
      path: '/favorites',
      element: (
        <React.Suspense fallback={<div className='load'>Loading...</div>}>
          <Favorites />
        </React.Suspense>
      ),
    },
    {
      path: '/player/:id',
      element: (
        <React.Suspense fallback={<div className='load'>Loading...</div>}>
          <Player />
        </React.Suspense>
      ),
    },
    {
      path: '/adminSPage',
      element: (
        <React.Suspense fallback={<div className='load'>Loading...</div>}>
          <AdminPage />
        </React.Suspense>
      ),
    },
    {
      path: '/top',
      element: (
        <React.Suspense fallback={<div className='load'>Loading...</div>}>
          <TopPage />
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
