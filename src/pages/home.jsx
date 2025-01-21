import React, { useEffect, useState, useRef } from 'react';
import './home.css';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import Toast from './Toast';
import Footer from '../components/footerComponent/footer';
import BlogSlider from '../components/BlogSlider/BlogSlider';
import { SwiperSlide, Swiper } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import AOS from "aos";
import "aos/dist/aos.css";
import MoviesSwiper from '../components/MoviesSwiper/MoviesSwiper';
import Header from '../components/Header/Header'

const Home = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cmovie, setCmovie] = useState(false);
    const [stuckCmovie, setStuckCmovie] = useState(false);
    const [ctop, setCtop] = useState(false);
    const [stuckCtop, setStuckCtop] = useState(false);
    const navigate = useNavigate();
    const cmovieButtonRef = useRef(null);
    const cmovieDivRef = useRef(null);
    const ctopButtonRef = useRef(null);
    const ctopDivRef = useRef(null);
    const [favorites, setFavorites] = useState([]);
    const location = useLocation();
    const [userName, setUserName] = useState('Guest');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [currentMovieIndex, setCurrentMovieIndex] = useState();
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });
    const [anchorEl, setAnchorEl] = useState(null);

    async function getData() {
        try {
            const response = await axios.get('http://localhost:3000/Movies');
            const categoriesResponse = await axios.get('http://localhost:3000/Category');
            setData(response.data);
            setFilteredData(response.data);
            setCategories(categoriesResponse.data);
            let index = parseInt(localStorage.getItem('currentMovieIndex'));
            if (isNaN(index) || index >= response.data.length) {
                index = 0;
            }
            setCurrentMovieIndex(index);
            localStorage.setItem('currentMovieIndex', (index + 1) % response.data.length);
        } catch (error) {
            console.error(error);
        }
    }

/////////////////////////////////////////////////////////////////////////////

const toggleFavorite = (movieId) => {
    if (!isLoggedIn) {
        toast.error("You aren't logged in");
    } else {
        // Check if the movie is already in the favorites
        if (favorites.includes(movieId)) {
            // If it is, remove it
            setFavorites(favorites.filter(id => id !== movieId));
        } else {
            // If not, add it
            setFavorites([...favorites, movieId]);
        }
    }
};

const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn');
    setIsLoggedIn(loggedInStatus === 'true');
  }, []);

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

    const handlePlayClick = (movieId) => {
        navigate(`/movie/${movieId}`);
      };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode); // Save to local storage
            return newMode;
        });
    };

useEffect(() => {
    getData();
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn === 'true') {
        setShowToast(true);
        setToastMessage("Log in succeeded");
        setToastType('success');
        sessionStorage.removeItem('loggedIn'); // Remove flag so toast doesn't show again
    }
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
        setUserName(storedUserName);
    }
    document.addEventListener('mousedown', handleClickOutside);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    if (location.state?.success) {
      toast.success('Log in succeeded');
    }
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [favorites, location.state]);

    return (
        <div className={`home-containr ${darkMode ? 'dark-mode' : ''}`}>
            <footer class="start-background"></footer>
                
            {showToast && <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />}
            <Header/>
        
            <div className='trailerSwiper' data-aos="zoom-in">
            <Swiper className="mySwiper">
            {data.length > 0 && (
                    <SwiperSlide style={{display: 'flex', alignItems: 'center'}} key={data[currentMovieIndex].id}>
                        <div className='gradient-box'></div>
                        <img className='mySwiperImg' style={{width: '220px', height: '265px', marginLeft: '18px', borderRadius: '10px', position: 'absolute', zIndex: '2' }} src={data[currentMovieIndex].poster} alt="" />
                        <video style={{ position: 'absolute', zIndex: '-1' }} width="120%" height="170%" src={data[currentMovieIndex].trailr} autoPlay muted loop/>
                    </SwiperSlide>
                )}
                </Swiper>
            </div>
            
            <MoviesSwiper/>
            <ToastContainer autoClose={2000} position="top-right" />
            <div className='inlist'>
            <h2 className={`newonsite textbe ${darkMode ? 'dark-mode' : ''}`} style={{ position: 'absolute', paddingLeft: '40px', paddingBottom: '10px', margin: 'auto', borderBottom: '3px solid #ff3b41', width: '85%', maxWidth: '1115px', fontSize: '29px' }}>
                Новое на сайте
            </h2></div>
            <div style={{marginTop: '-50px'}} className={`movieList ${darkMode ? 'dark-background' : ''}`}>
                <div className='inlist'>
                {data.reverse().map(el => (
                    <div key={el.id}>
                        <div data-aos="fade-up" className="container">
                            <div className="cube">
                                <div className="cube-side front">
                                    <img style={{ position: 'absolute', left: '-64.9px', width: '231px', height: '342px', marginLeft: '65px' }} src={el.poster} alt="" />
                                    <h4 className='title'>{el.imya}</h4>
                                </div>
                                <div className="cube-side right">
                                    <h4 style={{ position: 'absolute', top: '15px', textAlign: 'center', lineHeight: '0.9', wordWrap: 'break-word', maxWidth: '100%' }}>{el.imya.substring()}</h4>
                                    <div style={{ position: 'absolute', top: '35px', marginTop: '14px', display: 'flex', textAlign: 'center' }}>
                                        <p style={{ fontSize: '15px', fontWeight: '600', color: '#007bff', width: '200px' }}>
                                            <span style={{ fontSize: '16px', fontWeight: '600', marginRight: '5px', color: 'black' }}>{el.year}</span>
                                            {el.category.map((catId) => {
                                                const category = categories.find((cat) => cat.id == catId);
                                                return category ? category.name : '';
                                            }).join(', ')}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', position: 'absolute', top: '95px', justifyContent: 'space-between', width: '150px' }}>
                                        <button onClick={() => handlePlayClick(el.id)} className='mov play'><PlayArrowIcon /></button>
                                        <button onClick={() => toggleFavorite(el.id)} style={{ color: favorites.includes(el.id) ? 'gold' : 'gray' }} className='mov star'><FavoriteIcon style={{zoom: '0.9', marginTop: '2px'}}/></button>
                                    </div>
                                    <p style={{ fontSize: '15px', fontWeight: '500', paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px', position: 'absolute', top: '170px', borderTop: '4px solid #ff3b41' }}>
                                        {el.desc.substring(0, 123)}...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}</div>
            </div>
                <BlogSlider/>
            <Footer/>
                <footer class="end-background"></footer>
        </div>
    );
}

export default Home;
