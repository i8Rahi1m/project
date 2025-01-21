import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './home.css'; // Reuse the styles from Home
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link, useNavigate } from 'react-router-dom';
import {destroyToken} from '../utils/token';
import LoginIcon from '@mui/icons-material/Login';
import logo from '../img/Leonardo_Phoenix_A_stylized_logo_resembling_the_Netflix_logo_b_3-removebg-preview (2).png';
import SearchComponent from '../components/searchComponent/searchComponent';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Footer from '../components/footerComponent/footer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import BlogSlider from '../components/BlogSlider/BlogSlider';
import { FaSun, FaMoon } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";
import MoviesSwiper from '../components/MoviesSwiper/MoviesSwiper';
import { Drawer } from '@mui/material';

const CategoryPage = () => {
    const { categoryId, sortType } = useParams(); // Get the category ID and sort type from the URL
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);    
    const [categoryName, setCategoryName] = useState('');
    const [cmovie, setCmovie] = useState(false);
    const [stuckCmovie, setStuckCmovie] = useState(false);
    const [ctop, setCtop] = useState(false);
    const [stuckCtop, setStuckCtop] = useState(false);
    const [clog, setClog] = useState(false);
    const [stuckClog, setStuckClog] = useState(false);
    const navigate = useNavigate();
    const cmovieButtonRef = useRef(null);
    const cmovieDivRef = useRef(null);
    const ctopButtonRef = useRef(null);
    const ctopDivRef = useRef(null);
    const clogButtonRef = useRef(null);
    const clogDivRef = useRef(null);
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
    
            // Сортируем все фильмы по IMDB или Кинопоиску
            if (sortType === 'IMDB') {
                filteredData.sort((a, b) => b.IMDB - a.IMDB); // Сортировка по IMDB
            } else if (sortType === 'kinopoisk') {
                filteredData.sort((a, b) => b.kinopoisk - a.kinopoisk); // Сортировка по Кинопоиску
            }
    
            // Если categoryId присутствует, фильтруем по категории
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

    const handleMouseEnter = () => {
        if (!stuckCmovie) {
            setCmovie(true);  // Open the div when hovering the button
        }
    };
    
    const handleMouseLeave = () => {
        if (!stuckCmovie) {
            setCmovie(false);  // Close the div if it's not stuck
        }
    };
    
    const handleClick = () => {
        setStuckCmovie(!stuckCmovie);
        setCmovie(!stuckCmovie);
    };
    
    const handleMouseEnter2 = () => {
        setCtop(true);  // Open the div when hovering the button
    };
    
    const handleMouseLeave2 = () => {
        if (!stuckCtop) {
            setCtop(false);  // Close the div if it's not stuck
        }
    };
    
    const handleClick2 = () => {
        setStuckCtop(!stuckCtop);
        setCtop(!stuckCtop);
    };
    
    const handleMouseEnter3 = () => {
        setClog(true);  // Open the div when hovering the button
    };
    
    const handleMouseLeave3 = () => {
            setCtop(false);  // Close the div if it's not stuck
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
    
    
    const handleCategoryClick = (categoryId, sortType = null) => {
        const path = sortType ? `/category/${categoryId}/${sortType}` : `/category/${categoryId}`;
        navigate(path);
    };
    
    const handlePlayClick = (movieId) => {
        navigate(`/movie/${movieId}`);
      };

      const handleSearch = (query) => {
        navigate(`/search?query=${encodeURIComponent(query)}`);
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode); // Save to local storage
            return newMode;
        });
    };
    /////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        getData()
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        // Retrieve the userName from sessionStorage
        const storedUserName = sessionStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);
    
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(storedFavorites);
    }, []);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        getData();
    }, [categoryId, sortType]); // Refetch data when categoryId or sortType changes
    
    useEffect(() => {
        AOS.init({duration: 500});
        AOS.refresh();
      }, []);
    return (
        <div className={`home-containr ${darkMode ? 'dark-mode' : ''}`}>
            <div className="div_Drawer">
                    <Drawer/>
                </div>
            <div style={{ backdropFilter: 'blur(4px)' }} className='header'>
            <div className='inheader'>
            <Link to="/home"><img style={{ width: '150px', marginTop: '10px' }} src={logo} alt="Logo" /></Link>
                <div className='buttonsDiv'>
                    <button
                        ref={cmovieButtonRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick}
                        className='bttn'
                        style={{ width: '150px' }}
                    >
                        Фильмы
                    </button>
                    <button key={6} onClick={() => handleCategoryClick(6)} className='bttn' style={{ width: '210px' }}>Мультфильмы</button>
                    <button
                        ref={ctopButtonRef}
                        onMouseEnter={handleMouseEnter2}
                        onMouseLeave={handleMouseLeave2}
                        onClick={handleClick2}
                        className='bttn'
                        style={{ width: '100px' }}
                    >
                        ТОПы
                    </button>
                    <button className='bttn' onClick={()=>{navigate('/admin')}} style={{ width: '200px' }}>Пользователям</button>
                </div>
                <div className='buttonsHead'>
                    <SearchComponent handleSearch={handleSearch} />
                    <Link to="/favorites">
                        <button style={{ marginRight: '50px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='favoritesButton account'><FavoriteBorderIcon/></button>
                    </Link>
                    <button 
                        ref={clogButtonRef}
                        onClick={handleMouseEnter3}
                        onMouseLeave={handleMouseLeave3}
                        className='account' style={{ marginLeft: '-40px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                        <AccountCircleIcon style={{ width: '50px', marginLeft: '-2px' }} />
                    </button>
                    <button className={`toggle ${darkMode ? 'toggle-dark' : ''}`} onClick={toggleDarkMode}>
                        {darkMode ? <FaMoon style={{zoom: '1.3', marginTop: '6px', marginLeft: '5px'}}/> : <FaSun style={{zoom: '1.4', marginTop: '5px', marginLeft: '5px'}}/>}
                    </button>

                </div>
                </div>
            </div>
            <h2 className={`textbe ${darkMode ? 'dark-mode' : ''}`} style={{ position: 'relative', top: '150px', paddingLeft: '40px', paddingBottom: '10px',  borderBottom: '3px solid #ff3b41', width: '84.8%', maxWidth: '1460px', margin: 'auto' }}>
                Фильмы по категории <span style={{color: '#f4252c', fontStyle: 'italic'}}>{categoryName} </span>
            </h2>
            <div className={`movieList ${darkMode ? 'dark-background' : ''}`}>
                <div className='inlist'>
                {data.length === 0 ? (
                    <p style={{marginTop: '148px', marginBottom: '-55px'}}>No movie of this category added yet.</p>
                ) : (data.map(el => (
                    <div key={el.id}>
                        <div data-aos="fade-up" className="container">
                            <div className="cube">
                                <div className="cube-side front">
                                    <img style={{ position: 'absolute', left: '-64.9px', width: '231px', height: '342px', marginLeft: '65px' }} src={el.poster} alt={el.name} />
                                    <h4 className='title'>{el.imya}</h4>
                                </div>
                                <div className="cube-side right">
                                    <h4 style={{ position: 'absolute', top: '10px' }}>{el.imya}</h4>
                                    <div style={{ position: 'absolute', top: '40px', display: 'flex', textAlign: 'center' }}>
                                        <p style={{ fontSize: '15px', fontWeight: '600', color: '#007bff' }}>
                                            <span style={{ fontSize: '16px', fontWeight: '600', marginRight: '5px', color: 'black' }}>{el.year}</span>
                                            {el.category.map((catId) => {
                                                const category = categories.find((cat) => cat.id == catId);
                                                return category ? category.name : '';
                                            }).join(', ')}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', position: 'absolute', top: '100px', justifyContent: 'space-between', width: '150px' }}>
                                        <button onClick={() => handlePlayClick(el.id)} className='mov play'><PlayArrowIcon /></button>
                                        <button onClick={() => toggleFavorite(el.id)} style={{ color: favorites.includes(el.id) ? 'gold' : 'gray' }}className='mov star'><FavoriteIcon /></button>
                                    </div>
                                    <p style={{ fontSize: '15px', fontWeight: '500', paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', position: 'absolute', top: '170px', borderTop: '4px solid #ff3b41' }}>
                                        {el.desc.substring(0, 125)}...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )))}</div>
            </div>
                <MoviesSwiper/>
                <Footer/>
            {(ctop || stuckCtop) && (
                <div
                    data-aos="fade-up"
                    style={{ height: '50px', width: '350px', left: '48.3%' }}
                    ref={ctopDivRef}
                    onMouseEnter={() => setCtop(true)}
                    onMouseLeave={() => {
                        if (!stuckCtop) {
                            setCtop(false);
                        }
                    }}
                    className={`category ${darkMode ? 'dark-mode' : ''}`} 
                >
                    {categories.slice(0, 1).map((category) => <>
                        <button onClick={() => handleCategoryClick(category.id, 'kinopoisk')} style={{ fontSize: '15px', width: '180px' }}>ТОП по Кинопоиску</button>
                        <button onClick={() => handleCategoryClick(category.id, 'IMDB')}style={{ fontSize: '15px' }}>ТОП по IMDB</button>
                    </>)}
                </div>
            )}

{(clog || stuckClog) && (
                <div
                style={{ height: '135px', width: '170px', left: '80%', backgroundColor: 'rgba(0, 0, 0, 0.696)', backdropFilter: 'blur(4px)', color: 'white', paddingLeft: '15px', paddingTop: '5px'}}
                ref={clogDivRef}
                onMouseEnter={() => setClog(true)}
                onMouseLeave={() => {
                    if (!stuckClog) {
                        setClog(false);
                    }
                }}
                className={`category ${darkMode ? 'dark-mode' : ''}`} 
            >
                <h2 style={{fontSize: '22px'}}>{userName.substring(0, 10)}<CheckIcon style={{fontSize: '20px', marginLeft: '5px'}}/></h2>
                <p style={{marginTop: '5px'}}>You logged in</p>
                <button onClick={()=>{ destroyToken(), navigate('/')}} style={{marginTop: '10px', backgroundColor: 'white', color: '#05041c', borderRadius: '10px', padding: '5px', width: 'fit-content', paddingLeft: '10px', paddingRight: '10px', marginLeft: '-5px'}}>Click to log out</button> 
            </div>
            )}

            {(cmovie || stuckCmovie) && (
                <div
                    data-aos="fade-up"
                    ref={cmovieDivRef}
                    onMouseEnter={() => setCmovie(true)}
                    onMouseLeave={() => {
                        if (!stuckCmovie) {
                            setCmovie(false);
                        }
                    }}
                    className={`category ${darkMode ? 'dark-mode' : ''}`} 
                >
                    {categories.map((category) => (
                        <button key={category.id} onClick={() => handleCategoryClick(category.id)} style={{ fontSize: '15.5px' }}>{category.name}</button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryPage;
