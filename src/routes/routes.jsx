import { lazy } from 'react';

export const Home = lazy(() => import('../pages/Home/home'));
export const Login = lazy(() => import('../pages/Auth/auth'));
export const Category = lazy(() => import('../pages/CategoryPage/CategoryPage'));
export const MovieDetail = lazy(() => import('../pages/MovieDetail/MovieDetail'));
export const Auth = lazy(() => import('../pages/Auth/auth'));
export const SearchPage = lazy(() => import('../pages/SearchPage/SearchPage'));
export const Favorites = lazy(() => import('../pages/Favorites/Favorites'));
export const Player = lazy(() => import('../pages/Player/player'));
export const AdminPage = lazy(() => import('../pages/Admin/admin'));
export const TopPage = lazy(() => import('../pages/TopPage/TopPage'));