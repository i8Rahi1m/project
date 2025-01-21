import React, { useEffect, useState, useRef } from 'react';
import './home.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/footerComponent/footer';
import AOS from "aos";
import "aos/dist/aos.css";
import MoviesSwiper from '../components/MoviesSwiper/MoviesSwiper';
import Drawer from '../components/Drawer/Drawer';
import Header from '../components/Header/Header';
import MovieCard from '../components/MovieCard/MovieCard';

const SearchPage = () => {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query');
    const [data, setData] = useState([]);
    const [categoriees, setCategories] = useState([]);
    const [cmovie, setCmovie] = useState(false);
    const [stuckCmovie, setStuckCmovie] = useState(false);
    const [stuckCtop, setStuckCtop] = useState(false);
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
                const response = await axios.get('http://localhost:3000/Movies');
                const filtered = response.data.filter(item =>
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
            const response = await axios.get('http://localhost:3000/Movies');
            const categoriesResponse = await axios.get('http://localhost:3000/Category');
            setData(response.data);
            setCategories(categoriesResponse.data);
        } catch (error) {
            console.error(error);
        }
    }

/////////////////////////////////////////////////////////////////////////////

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
        getData();
        document.addEventListener('mousedown', handleClickOutside);
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        const storedUserName = sessionStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [favorites]);

    return (
        <div className={`home-containr ${darkMode ? 'dark-mode' : ''}`}>
            <div className="div_Drawer">
                    <Drawer/>
                </div>
            <Header/>
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
            <Footer/>
        </div>
    );
};

export default SearchPage;