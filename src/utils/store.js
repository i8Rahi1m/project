import { configureStore, combineReducers } from '@reduxjs/toolkit';

// Static reducers (if any)
const staticReducers = {};

// Dynamic reducers map
const asyncReducers = {};

// Function to combine static and dynamic reducers
const createRootReducer = () =>
  combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });

// Create the initial store
const store = configureStore({
  reducer: createRootReducer(),
});

// Inject reducers dynamically
export const injectReducer = (key, reducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = reducer;
    store.replaceReducer(createRootReducer());
  }
};

export default store;
