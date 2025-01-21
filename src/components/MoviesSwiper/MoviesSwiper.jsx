import React, { useEffect, useState } from 'react';
import { Navigation, Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Swiper, SwiperSlide } from 'swiper/react';
import { colors, Rating } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './MoviesSwiper.css';
import axios from 'axios';

const MoviesSwiper = () => {
    const { t, i18n } = useTranslation();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });
    const [categories, setCategories] = useState([]);

    async function getMovies() {
        try {
            const { data } = await axios.get('http://localhost:3000/Movies');
            const { categories } = await axios.get('http://localhost:3000/Category');
            setData(data);
            setCategories(categories.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode); // Save to local storage
            return newMode;
        });
    };
    const handlePlayClick = (movieId) => {
        navigate(`/movie/${movieId}`);
      };

      const handleCategoryClick = (categoryId, sortType = null) => {
        const path = sortType ? `/category/${categoryId}/${sortType}` : `/category/${categoryId}`;
        navigate(path);
    };
    return (
        <div className="movies-swiper-container">
            <div className="movies-swiper-wrapper">
                <Swiper
                    style={{ maxWidth: '1460px', padding: '20px' }}
                    slidesPerView={4}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                    }}
                    freeMode={true}
                    loop={true}
                    autoplay={{
                        delay: 1500,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        1400: {
                            slidesPerView: 6,
                        },
                        1140: {
                            slidesPerView: 5,
                        },
                        900: {
                            slidesPerView: 4,
                        },
                        650: {
                            slidesPerView: 3,
                        },
                        600: {
                            slidesPerView: 2,
                        },
                        0: {
                            slidesPerView: 2
                        }
                    }}
                    modules={[Autoplay, FreeMode]}
                >
                    {data.slice(-9).map((el) => (
                        <SwiperSlide className='svi-slide' onClick={() => handlePlayClick(el.id)}  key={el.id}>
                                <div className={`movies-swiper-card ${darkMode ? 'dark-mode' : ''}`}>
                                    <img
                                        className="movies-swiper-image"
                                        src={el.poster}
                                        alt={el.title}
                                        style={{height: '280px'}}
                                    />
                                    <h3 className={`movies-swiper-movie-title ${darkMode ? 'dark-mode' : ''}`}>{el.imya}</h3>
                                    <div className={`movies-swiper-rating ${darkMode ? 'dark-mode' : ''}`}>
                                        <Rating
                                            value={el.IMDB / 2}
                                            precision={0.5}
                                            readOnly
                                            sx={{ color: colors.amber[400] }}
                                        />
                                        <span className="movies-swiper-rating-text">{`(${el.IMDB})`}</span>
                                    </div>
                                    <div className="movies-swiper-overlay"></div>
                                </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default MoviesSwiper;
