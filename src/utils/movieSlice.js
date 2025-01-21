import { createSlice } from '@reduxjs/toolkit';

const movieSlice = createSlice({
  name: 'movie',
  initialState: { movies: [], favorites: [] },
  reducers: {
    addMovie: (state, action) => {
      state.movies.push(action.payload);
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
  },
});

export const { addMovie, addToFavorites } = movieSlice.actions;
export default movieSlice.reducer;
