import React, { useEffect, useState } from 'react';
import '../pages.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import Toast from '../Toast/Toast';
import Footer from '../../components/footerComponent/footer';
import BlogSlider from '../../components/BlogSlider/BlogSlider';
import { SwiperSlide, Swiper } from 'swiper/react';
import MoviesSwiper from '../../components/MoviesSwiper/MoviesSwiper';
import Header from '../../components/Header/Header';
import { fetchAllMovies, fetchCategories } from '../../api/moviesApi';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieCube from '../../components/MovieCube/MovieCube';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../utils/favoritesSlice';

const Home = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [viewType, setViewType] = useState(() => localStorage.getItem('viewType') || 'module');
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
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();

    async function getData() {
        try {
            const response = await fetchAllMovies();
            const categoriesResponse = await fetchCategories();
            setData(response);
            setCategories(categoriesResponse);
            let index = parseInt(localStorage.getItem('currentMovieIndex'));
            if (isNaN(index) || index >= response.length) {
                index = 0;
            }
            setCurrentMovieIndex(index);
            localStorage.setItem('currentMovieIndex', (index) % response.length);
        } catch (error) {
            console.error(error);
        }
    }

    const handleToggleFavorite = (movieId) => {
        if (!isLoggedIn) {
          toast.error("You aren't logged in");
        } else {
          dispatch(toggleFavorite(movieId));
        }
      };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const loggedInStatus = localStorage.getItem('loggedIn');
        setIsLoggedIn(loggedInStatus === 'true');
    }, []);

    const handlePlayClick = (movieId) => {
        navigate(`/movie/${movieId}`);
    };

    const handleToggleChange = (_, newViewType) => {
        if (newViewType) {
          setViewType(newViewType);
          localStorage.setItem('viewType', newViewType);
        }
      };

    useEffect(() => {
        getData();
        const loggedIn = sessionStorage.getItem('loggedIn');
        if (loggedIn === 'true') {
            setShowToast(true);
            setToastMessage("Log in succeeded");
            setToastType('success');
            sessionStorage.removeItem('loggedIn');
        }
        const storedUserName = sessionStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        if (location.state?.success) {
            toast.success('Log in succeeded');
        }
    }, [favorites, location.state]);

    return (
        <div className={`home-containr ${darkMode ? 'dark-mode' : ''}`}>
            <footer className="start-background"></footer>

            {showToast && <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />}
            <div className='trailerSwiper' data-aos="zoom-in">
                <Swiper className="mySwiper">
                    {data.length > 0 && (
                        <SwiperSlide style={{ display: 'flex', alignItems: 'center' }} key={data[currentMovieIndex].id}>
                            <div className='gradient-box'></div>
                            <img className='mySwiperImg' style={{ width: '220px', height: '265px', marginLeft: '18px', borderRadius: '10px', position: 'absolute', zIndex: '2' }} src={data[currentMovieIndex].poster} alt="" />
                            <video style={{ position: 'absolute', zIndex: '-1' }} width="120%" height="170%" src={data[currentMovieIndex].trailr} autoPlay muted loop />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            <MoviesSwiper />
            <ToastContainer autoClose={2000} position="top-right" />
            <div style={{ marginTop: '-100px' }} className={`movieList ${darkMode ? 'dark-background' : ''}`}>
            <div style={{display: 'flex', justifyContent: 'space-between', paddingLeft: '40px', paddingBottom: '10px', paddingTop: '20px', paddingRight: '40px', borderBottom: '3px solid #ff3b41', width: '100%', maxWidth: '1116px', margin: 'auto' }}>
                <h2 className={`textbe ${darkMode ? 'dark-mode' : ''}`}>
                    Новое на сайте
                </h2>
                <div className="toggle-container">
                    <ToggleButtonGroup
                      value={viewType}
                      exclusive
                      onChange={handleToggleChange}
                      aria-label="View Toggle"
                    >
                      <ToggleButton value="list" aria-label="List View">
                        <ViewListIcon/>
                      </ToggleButton>
                      <ToggleButton value="module" aria-label="Module View">
                        <ViewModuleIcon/>
                      </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>

                <div className="inlist"> 
                    {data.map((el) =>
                         viewType === 'module' ? (
                           <MovieCube
                             key={el.id}
                             movie={el}
                             categories={categories}
                             darkMode={darkMode}
                             handleToggleFavorite={handleToggleFavorite}
                             handlePlayClick={handlePlayClick}
                             favorites={favorites}
                           />
                         ) : (
                           <MovieCard
                             key={el.id}
                             movie={el}
                             categories={categories}
                             darkMode={darkMode}
                             handleToggleFavorite={handleToggleFavorite}
                             handlePlayClick={handlePlayClick}
                             favorites={favorites}
                           />
                         )
            )}
                </div>
            </div>

            <BlogSlider />
            <div className="end-background"></div>
        </div>
    );
};

export default Home;
