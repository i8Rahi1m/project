import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './home.css';
import {Link, useNavigate} from 'react-router-dom';
import Footer from '../components/footerComponent/footer';
import AOS from "aos";
import "aos/dist/aos.css";
import MoviesSwiper from '../components/MoviesSwiper/MoviesSwiper';
import { Drawer } from '@mui/material';
import Header from '../components/Header/Header';
import MovieCard from '../components/MovieCard/MovieCard';

const CategoryPage = () => {
    const { categoryId, sortType } = useParams();
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);    
    const [categoryName, setCategoryName] = useState(''); 
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [userName, setUserName] = useState('Guest');
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });

    async function getData() {
        try {
            const response = await axios.get('http://localhost:3000/Movies');
            const categoriesResponse = await axios.get('http://localhost:3000/Category');
            let filteredData = response.data;
            if (categoryId) {
                filteredData = filteredData.filter(movie => movie.category.includes(Number(categoryId)));
            }
            setData(filteredData);
            setCategories(categoriesResponse.data);
            const selectedCategory = categoriesResponse.data.find(cat => cat.id == categoryId);
            setCategoryName(selectedCategory ? selectedCategory.name : 'Unknown Category');
        } catch (error) {
            console.error(error);
        }
    }
    

    const toggleFavorite = (movieId) => {
        if (favorites.includes(movieId)) {
            setFavorites(favorites.filter(id => id !== movieId));
        } else {
            setFavorites([...favorites, movieId]);
        }
    };
    
    const handlePlayClick = (movieId) => {
        navigate(`/movie/${movieId}`);
      };
    
    useEffect(() => {
        getData()
        const storedUserName = sessionStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
        AOS.init({duration: 500});
        AOS.refresh();
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites, categoryId, sortType]);

    return (
        <div className={`home-containr ${darkMode ? 'dark-mode' : ''}`}>
            <div className="div_Drawer">
                    <Drawer/>
                </div>
            <Header/>
            <h2 className={`textbe ${darkMode ? 'dark-mode' : ''}`} style={{ position: 'relative', top: '150px', paddingLeft: '40px', paddingBottom: '10px',  borderBottom: '3px solid #ff3b41', width: '79.4%', maxWidth: '1116px', margin: 'auto' }}>
                Фильмы по категории <span style={{color: '#f4252c', fontStyle: 'italic'}}>{categoryName} </span>
            </h2>
            <div className={`movieList ${darkMode ? 'dark-background' : ''}`}>
                <div style={{paddingTop: '100px'}} className='inlist'>
                {data.length === 0 ? (
                    <p style={{marginTop: '148px', marginBottom: '-55px'}}>No movie of this category added yet.</p>
                ) : (data.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      categories={categories}
                      favorites={favorites}
                      toggleFavorite={toggleFavorite}
                      onPlayClick={handlePlayClick}
                    />
                  )))}</div>
            </div>
                <MoviesSwiper/>
                <Footer/>
        </div>
    );
}

export default CategoryPage;