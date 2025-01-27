import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import '../pages.css';
import MoviesSwiper from '../../components/MoviesSwiper/MoviesSwiper';
import { ToastContainer } from 'react-toastify';
import { fetchAllMovies, fetchCategories } from '../../api/moviesApi';

const Favorites = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    async function getData() {
        try {
            const response = await fetchAllMovies();
            const categoriesResponse = await fetchCategories();
            setData(response);
            setCategories(categoriesResponse);
        } catch (error) {
            console.error(error);
        }
    }

    const favoriteMovies = data.filter(movie => 
        favorites.includes(movie.id.toString())
    );

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className={`home-containr ${darkMode ? 'dark-mode' : ''}`}>
            <ToastContainer autoClose={2000} position="top-right" />
            <h1 className={`textbe ${darkMode ? 'dark-mode' : ''}`} style={{ position: 'relative', top: '150px', paddingLeft: '40px', paddingBottom: '10px', borderBottom: '3px solid #ff3b41', width: '85.03%', maxWidth: '1115px', margin: 'auto' }}>Favorite Movies</h1>
            <div className={`movieList ${darkMode ? 'dark-background' : ''}`}>
                <div className='inlist'>
                {favoriteMovies.length == 0 ? (
                    <p style={{marginTop: '200px', marginBottom: '-50px'}}>No movie in favorites yet.</p>
                ) : (data.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      categories={categories}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                      onPlayClick={handlePlayClick}
                    />
                  )))}
                </div>
            </div>
            <MoviesSwiper />
        </div>
    );
};

export default Favorites;
