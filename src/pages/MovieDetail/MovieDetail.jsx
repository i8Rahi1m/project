import React, { useEffect, useState } from 'react';
import './MovieDetail.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useParams, useNavigate } from 'react-router-dom';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import imdb from "../../../public/img/IMDb-Logo-removebg-preview.png";
import { FaSun, FaMoon } from 'react-icons/fa';
import IncrementLikeButton from '../../components/IncrementLikeButton/IncrementLikeButton';
import DecrementDislikeButton from '../../components/DecrementDislikeButton/DecrementDislikeButton';
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchMovieById, fetchCategories } from '../../api/moviesApi';

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode == 'true';
    });
    const fetchMovie = async () => {
        try {
            const movieData = await fetchMovieById(id);
            setMovie(movieData);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const fetchCategory = async () => {
        try {
            const categoriesResponse = await fetchCategories();
            setCategories(categoriesResponse);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(prevMode => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode); // Save to local storage
            return newMode;
        });
    };

    useEffect(() => {
        if (id) {
            fetchMovie();
            fetchCategory();
        }
    }, [id]);
        
    useEffect(() => {
        AOS.init({ duration: 500 });
        AOS.refresh();
    }, []);
    

    if (error) return <div className="error">{error}</div>;
    if (!movie) return <div className="no-movie" style={{color: 'white'}}>No movie found</div>;

    let trailer = `https://www.youtube.com/embed/${movie.trailer}`;

    return (
        <div className={`home-containr ${darkMode ? 'dark-mode' : ''}`}>
            <div style={{height: '25px'}}></div>
            <button style={{backgroundColor: 'transparent', border: 'none'}} className={`toggl ${darkMode ? 'toggle-dark' : ''}`} onClick={toggleDarkMode}>
                {darkMode ? <FaMoon className='icnn'/> : <FaSun className='icnn'/>}
            </button>
            <button className='play-button' onClick={() => { navigate("/") }} style={{ position: 'absolute', zIndex: '10', top: '57px', marginLeft: '10px', padding: '5px 5px', borderRadius: '10px' }}><FirstPageIcon style={{ marginLeft: '5px' }} /></button>
            <header className={`movie-detail-header ${darkMode ? 'dark-mode' : ''}`}>
                <div className="header-content">    
                    <div className="header-left">
                        <img className="movie-poster" src={movie.poster} alt={movie.title} />
                    </div>
                    <div style={{marginTop: '30px'}} className="header-right">
                        <h1 className="movie-title">{movie.imya} ({movie.year})</h1>
                        <div className="movie-info">
                            <span>
                                {movie.category && movie.category.length > 0 
                                    ? movie.category.map((catId) => {
                                        const category = categories.find((cat) => cat.id == catId);
                                        return category ? category.name : '';
                                      }).join(', ')
                                    : 'No categories available'}
                            </span>
                            <span style={{ color: 'gold', fontWeight: '600' }}>{movie.duration}</span>
                        </div>
                        <div className="movie-rating">
                            <span style={{ color: '#f5c500', fontWeight: '520', fontSize: '23px', marginRight: '20px' }}>Budget</span>   <span style={{fontSize: '20px', fontWeight: '500'}}>{movie.budget}</span><br />
                            <span className="rating-value">{movie.IMDB}</span>/10
                            <br /><img style={{width: '100px'}} src={imdb} alt="" />
                        </div>
                        <button className="play-button" onClick={() => navigate(`/player/${id}`)}>
                            <PlayArrowIcon /><span>Watch</span>
                        </button>
                        <div className="reactions">
                            <IncrementLikeButton movieId={movie.id}/>
                            <DecrementDislikeButton movieId={movie.id}/>
                        </div>
                    </div>
                </div>
            </header>

            {/* Overview Section */}
            <section className={`movie-description ${darkMode ? 'dark-mode' : ''}`}>
                <h2>Overview</h2>
                <p>{movie.desc}</p>
            </section>

            {/* Trailer Section */}
            <section className={`movie-description ${darkMode ? 'dark-mode' : ''}`}>
                <h2>Trailer</h2>
                <iframe className='trailrr' style={{ marginTop: '20px', borderRadius: '14px' }} width="100%" height="600" src={trailer} title="Trailer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </section>

            {/* Reward Section */}
            <section className={`movie-description ${darkMode ? 'dark-mode' : ''}`}>
                <h2>Reward</h2>
                <p>Reviews content here...</p>
            </section>

            {/* Cast & Crew Section */}
            <section className={`movie-description ${darkMode ? 'dark-mode' : ''}`}>
    <h3>Director - 
        <a 
            className={`kl ${darkMode ? 'dark-mode' : ''}`} 
            href={`https://www.google.com/search?q=${movie?.director || ''}`} 
            style={{ fontSize: '20px', marginLeft: '10px' }}
        >
            {movie?.director || 'Director not available'}
        </a>
    </h3>
    <br /><br />
    <h2>Cast & Crew</h2>
    <div className="cast-crew-list">
        {Array.isArray(movie?.starring) && movie.starring.length > 0 ? (
            movie.starring.map((actor) => (
                <div key={actor.id} style={{width: '100px'}} className="actor">
                    <a 
                        className={`kl ${darkMode ? 'dark-mode' : ''}`} 
                        href={`https://www.google.com/search?q=${actor.name}`} 
                        style={{ fontSize: '20px', width: '130px', height: '220px' }}
                    >
                    <img 
                        className='imggg'
                        src={actor.image}
                        alt={actor.name} 
                        style={{ width: '120px', height: '170px'}} 
                    /> <br />
                        {actor.name}
                    </a>
                </div>
            ))
        ) : (
            <p>No cast & crew information available.</p>
        )}
    </div>
</section>
    <div style={{height: '40px'}}></div>

    </div>
    );
};

export default MovieDetail;
