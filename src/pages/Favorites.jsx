import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import './home.css';
import Footer from '../components/footerComponent/footer';
import MoviesSwiper from '../components/MoviesSwiper/MoviesSwiper';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Header/Header';

const Favorites = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    // Fetching data from API
    async function getData() {
        try {
            const response = await axios.get('http://localhost:3000/Movies');
            const categoriesResponse = await axios.get('http://localhost:3000/Category');
            setData(response.data);
            setCategories(categoriesResponse.data);
        } catch (error) {
            console.error(error);
        }
    }

    // Load favorites from localStorage on mount
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        getData();
    }, []);

    // Filter favorite movies, ensuring ID types match
    const favoriteMovies = data.filter(movie => 
        favorites.includes(movie.id.toString()) // Ensure movie.id is a string
    );
    const handlePlayClick = (movieId) => {
        console.log("Playing movie with ID:", movieId);
        // Example: navigate to player page
        navigate(`/player/${movieId}`);
    };

    const toggleFavorite = (movieId) => {
        const updatedFavorites = favorites.includes(movieId)
            ? favorites.filter(id => id !== movieId)
            : [...favorites, movieId];

        setFavorites(updatedFavorites);
        console.log("Updated favorites:", updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    return (
        <div className={`home-containr ${darkMode ? 'dark-mode' : ''}`}>
            <Header />
            <ToastContainer autoClose={2000} position="top-right" />
            <h1 className={`textbe ${darkMode ? 'dark-mode' : ''}`} style={{ position: 'relative', top: '150px', paddingLeft: '40px', paddingBottom: '10px', borderBottom: '3px solid #ff3b41', width: '85.03%', maxWidth: '1115px', margin: 'auto' }}>Favorite Movies</h1>
            <div className={`movieList ${darkMode ? 'dark-background' : ''}`}>
                <div className='inlist'>
                {console.log(favoriteMovies)}
                    {(
                        favoriteMovies.map((el) => (
                            <div style={{ marginTop: '80px' }} key={el.id} className="movieCard">
                                <div className={`container shrink-box`}>
                                    <div className="cube">
                                        <div className="cube-side front">
                                            <img style={{ position: 'absolute', left: '-64.9px', width: '231px', height: '342px', marginLeft: '65px' }} src={el.poster} alt="" />
                                            <h4 className='title'>{el.imya}</h4>
                                        </div>
                                        <div className="cube-side right">
                                            <h4 style={{ position: 'absolute', top: '10px' }}>{el.imya}</h4>
                                            <div style={{ position: 'absolute', top: '40px', display: 'flex', textAlign: 'center' }}>
                                                <p style={{ fontSize: '15px', fontWeight: '600', color: '#007bff' }}>
                                                    <span style={{ fontSize: '16px', fontWeight: '600', marginRight: '5px', color: 'black' }}>{el.year}</span>
                                                    {el.category.map((catId) => {
                                                        const category = categories.find((cat) => cat.id === catId);
                                                        return category ? category.name : '';
                                                    }).join(', ')}
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', position: 'absolute', top: '100px', justifyContent: 'space-between', width: '150px' }}>
                                                <button onClick={() => handlePlayClick(el.id)} className='mov play'><PlayArrowIcon /></button>
                                                <button onClick={() => toggleFavorite(el.id)} style={{ color: favorites.includes(el.id) ? 'gold' : 'gray' }} className='mov star'><FavoriteIcon /></button>
                                            </div>
                                            <p style={{ fontSize: '15px', fontWeight: '500', paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', position: 'absolute', top: '170px', borderTop: '4px solid #ff3b41' }}>
                                                {el.desc.substring(0, 125)}...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <MoviesSwiper />
            <Footer />
        </div>
    );
};

export default Favorites;
