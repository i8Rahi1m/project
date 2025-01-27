import React, { useEffect, useState, useRef } from 'react';
import '../pages.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "aos/dist/aos.css";
import MoviesSwiper from '../../components/MoviesSwiper/MoviesSwiper';
import Drawer from '../../components/Drawer/Drawer';
import MovieCard from '../../components/MovieCard/MovieCard';
import { fetchAllMovies, fetchCategories } from '../../api/moviesApi';

const SearchPage = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query');
    const [data, setData] = useState([]);
    const [categoriees, setCategories] = useState([]);
    const cmovieButtonRef = useRef(null);
    const cmovieDivRef = useRef(null);
    const ctopButtonRef = useRef(null);
    const ctopDivRef = useRef(null);
    const [favorites, setFavorites] = useState([]);
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode == 'true';
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchAllMovies();
                const filtered = response.filter(item =>
                    item.imya.toLowerCase().includes(query.toLowerCase()) || 
                    item.name.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filtered);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [query]);

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

const toggleFavorite = (movieId) => {
    if (favorites.includes(movieId)) {
        setFavorites(favorites.filter(id => id != movieId));
    } else {
        setFavorites([...favorites, movieId]);
    }
};
    const handleClickOutside = (event) => {
        if (
            cmovieButtonRef.current &&
            !cmovieButtonRef.current.contains(event.target) &&
            cmovieDivRef.current &&
            !cmovieDivRef.current.contains(event.target)
        ) {
            setStuckCmovie(false);
            setCmovie(false);
        }
        if (
            ctopButtonRef.current &&
            !ctopButtonRef.current.contains(event.target) &&
            ctopDivRef.current &&
            !ctopDivRef.current.contains(event.target)
        ) {
            setStuckCtop(false);
            setCtop(false);
        }
    };
/////////////////////////////////////////////////////////////////////////////

    const handlePlayClick = (movieId) => {
        navigate(`/movie/${movieId}`);
      };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode);
            return newMode;
        });
    };
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [])

    useEffect(() => {
        getData();
        document.addEventListener('mousedown', handleClickOutside);
        const storedUserName = sessionStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={`home-containr ${darkMode ? 'dark-mode' : ''}`}>
            <div className="div_Drawer">
                    <Drawer/>
                </div>
            <h1 className={`textbe ${darkMode ? 'dark-mode' : ''}`} style={{ position: 'relative', top: '90px', paddingLeft: '40px', paddingBottom: '10px',  borderBottom: '3px solid #ff3b41', width: '84.8%', maxWidth: '1115px', margin: 'auto' }}>Search Results for <span style={{color: '#f4252c', fontStyle: 'italic'}}>{query}</span></h1>
            <div style={{ marginTop: '-10px'}} className={`movieList ${darkMode ? 'dark-background' : ''}`}>
            <div style={{paddingTop: '100px'}}  className='inlist'>
            {query.length <= 2 ? (
                        <p style={{marginTop: '170px', marginBottom: '-70px', textAlign: 'center'}}><span style={{fontSize: '40px', fontWeight: '600'}}>No results </span><br /> Please enter more than 2 characters</p>
                    ) : results.length == 0 ? (<p style={{marginTop: '170px', marginBottom: '-70px', textAlign: 'center'}}><span style={{fontSize: '40px', fontWeight: '600'}}>No results </span></p>) : (
                    results.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          categories={categoriees}
                          favorites={favorites}
                          toggleFavorite={toggleFavorite}
                          onPlayClick={handlePlayClick}
                        />
                      )))}
            </div>
            </div>
            <MoviesSwiper/>
        </div>
    );
};

export default SearchPage;