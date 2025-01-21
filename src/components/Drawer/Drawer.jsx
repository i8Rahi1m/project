import React, { useEffect, useRef, useState } from 'react';
import './Drawer.css';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import SearchComponent from '../searchComponent/searchComponent';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Footer from '../footerComponent/footer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckIcon from '@mui/icons-material/Check';
import BlogSlider from '../BlogSlider/BlogSlider';
import { FaSun, FaMoon } from 'react-icons/fa';
import AOS from "aos";
import "aos/dist/aos.css";
import MoviesSwiper from '../MoviesSwiper/MoviesSwiper';
import axios from 'axios';

const Drawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categories, setCategories] = useState([]);
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
  const [userName, setUserName] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
      const savedMode = localStorage.getItem('darkMode');
      return savedMode === 'true';
  });

  async function getData() {
    try {
        const response = await axios.get('http://localhost:3000/Movies');
        const categoriesResponse = await axios.get('http://localhost:3000/Category');
        setData(response.data);
        setFilteredData(response.data);
        setCategories(categoriesResponse.data);
    } catch (error) {
        console.error(error);
    }
  }

  const handleMouseEnter = () => {
    if (!stuckCmovie) {
        setCmovie(true);
    }
  };

  const handleMouseLeave = () => {
    if (!stuckCmovie) {
        setCmovie(false);
    }
  };

  const handleClick = () => {
    setStuckCmovie(!stuckCmovie);
    setCmovie(!stuckCmovie);
  };

  const handleMouseEnter2 = () => {
    setCtop(true);
  };

  const handleMouseLeave2 = () => {
    if (!stuckCtop) {
        setCtop(false);
    }
  };

  const handleClick2 = () => {
    setStuckCtop(!stuckCtop);
    setCtop(!stuckCtop);
  };

  const handleMouseEnter3 = () => {
    setClog(true);
  };

  const handleMouseLeave3 = () => {
    if (!stuckClog) {
        setClog(false);
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
        localStorage.setItem('darkMode', newMode);
        return newMode;
    });
  };

  useEffect(() => {
    getData();
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
        setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`drawer-container ${darkMode ? 'dark-mode' : ''}`}>
      <button className="toggle-button" onClick={toggleDrawer}>
            <MenuIcon/>
      </button>
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-content">
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
          <button className='bttn' onClick={() => navigate('/admin')} style={{ width: '200px' }}>Пользователям</button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <SearchComponent handleSearch={handleSearch} />
            <Link to="/favorites">
                <button style={{ marginRight: '50px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='favoritesButton account'>
                    <FavoriteBorderIcon/>
                </button>
            </Link>
            <button 
                ref={clogButtonRef}
                onClick={handleMouseEnter3}
                onMouseLeave={handleMouseLeave3}
                className='account' 
                style={{ marginLeft: '-40px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}
            >
                <AccountCircleIcon style={{ width: '50px', marginLeft: '-2px' }} />
            </button>
            <button className={`toggle ${darkMode ? 'toggle-dark' : ''}`} onClick={toggleDarkMode}>
                {darkMode ? <FaMoon style={{zoom: '1.3', marginTop: '6px', marginLeft: '5px'}}/> : <FaSun style={{zoom: '1.4', marginTop: '5px', marginLeft: '5px'}} />}
            </button>
          </div>
          {(ctop || stuckCtop) && (
                <div
                    style={{ height: '50px', width: '350px', left: '50%' }}
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
      </div>
      {children}
    </div>
  );
};

export default Drawer;
