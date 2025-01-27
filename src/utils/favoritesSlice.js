import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite: (state, action) => {
      const movieId = action.payload;
      if (state.includes(movieId)) {
        return state.filter((id) => id != movieId);
      } else {
        return [...state, movieId];
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
