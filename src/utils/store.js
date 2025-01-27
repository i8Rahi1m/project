import { configureStore, combineReducers } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
const staticReducers = {};
const asyncReducers = {};

const createRootReducer = () =>
  combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export const injectReducer = (key, reducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = reducer;
    store.replaceReducer(createRootReducer());
  }
};

export default store;
