import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite } from '../../utils/favoritesSlice'; // Import the Redux action
import FavoriteIcon from '@mui/icons-material/Favorite';
import './MovieCard.css';

const MovieCard = ({ movie, categories, handlePlayClick }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites || []); // Ensure it's always defined

  const categoryNames = movie.category
    .map((catId) => {
      const category = categories.find((cat) => cat.id == catId);
      return category ? category.name.charAt(0).toUpperCase() + category.name.slice(1) : '';
    })
    .join(', ');

  const isFavorite = favorites.includes(movie.id);

  return (
    <div
      style={{
        width: '97%',
        border: '3.4px solid #d9d9d9',
        marginBottom: '30px',
        marginTop: '50px',
        padding: '35px',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div
          style={{
            boxShadow: '0px 0px 20px 0px gray',
            height: 'fit-content',
            backgroundColor: 'rgba(128, 128, 128, 0.45)',
            borderRadius: '10px',
          }}
        >
          <Link onClick={() => handlePlayClick(movie.id)}>
            <img src={movie.poster} alt={movie.name} width={300} />
          </Link>
        </div>
        <div style={{ marginLeft: '35px', marginTop: '10px' }}>
          <Link onClick={() => handlePlayClick(movie.id)} className="movieName">
            {movie.imya} / {movie.name} ({movie.year})
          </Link>
          <div style={{ display: 'flex', marginTop: '20px' }}>
            <p style={{ color: '#777777', fontWeight: '500', fontSize: '19px' }}>Год:</p>
            <p style={{ position: 'relative', left: '105px', color: '#0B97B5', fontWeight: '600' }}>
              {movie.year}
            </p>
          </div>
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <p style={{ color: '#777777', fontWeight: '500', fontSize: '19px' }}>Категории:</p>
            <p
              style={{
                position: 'relative',
                left: '45px',
                color: 'rgb(70, 70, 70)',
                fontWeight: '600',
              }}
            >
              {categoryNames}
            </p>
          </div>
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <p style={{ color: '#777777', fontWeight: '500', fontSize: '19px' }}>Режиссер:</p>
            <p style={{ position: 'relative', left: '50px', color: 'rgb(60, 60, 60)', fontWeight: '500' }}>
              {movie.director}
            </p>
          </div>
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <p style={{ color: '#777777', fontWeight: '500', fontSize: '19px' }}>Актеры:</p>
            <p
              style={{
                position: 'relative',
                left: '70px',
                color: 'rgb(60, 60, 60)',
                fontSize: '18px',
                fontWeight: '500',
                paddingRight: '70px',
              }}
            >
              {movie.starring.slice(0, 1).map((actor) => (
                <span>{actor.name}</span>
              ))}
              {movie.starring.slice(1).map((actor) => (
                <span>, {actor.name}</span>
              ))}
            </p>
          </div>
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <p style={{ color: '#777777', fontWeight: '500', fontSize: '19px' }}>Длительность:</p>
            <p
              style={{
                position: 'relative',
                left: '15px',
                color: 'rgb(70, 70, 70)',
                fontSize: '18px',
                fontWeight: '600',
              }}
            >
              {movie.duration}
            </p>
          </div>
          <p style={{ marginTop: '20px' }}>{movie.desc.substring(0, 165)}...</p>
          <button
            onClick={() => dispatch(toggleFavorite(movie.id))}
            style={{ color: isFavorite ? 'gold' : 'gray' }}
            className="btnfav"
          >
            <FavoriteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
