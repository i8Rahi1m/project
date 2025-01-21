import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

const MovieCard = ({ movie, categories, favorites, toggleFavorite, onPlayClick }) => {
  const categoryNames = movie.category.map((catId) => {
    const category = categories.find((cat) => cat.id == catId);
    return category ? category.name.charAt(0).toUpperCase() + category.name.slice(1) : '';
  }).join(', ');

  return (
    <div style={{ width: '97%', border: '3.4px solid #d9d9d9', marginTop: '60px', padding: '25px' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ boxShadow: '0px 0px 20px 0px gray', height: 'fit-content' }}>
          <Link onClick={() => onPlayClick(movie.id)}>
            <img src={movie.poster} alt={movie.name} width={300} />
          </Link>
        </div>
        <div style={{ marginLeft: '35px', marginTop: '10px' }}>
          <Link
            onClick={() => onPlayClick(movie.id)}
            style={{
              textDecoration: 'none',
              width: 'fit-content',
              color: '#fd363c',
              fontSize: '35px',
              fontWeight: '700',
              lineHeight: '24px',
              fontFamily: 'sans-serif',
            }}
          >
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
            <p style={{ position: 'relative', left: '45px', color: 'rgb(70, 70, 70)', fontWeight: '600' }}>
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
          <p style={{ marginTop: '20px' }}>
            {movie.desc.substring(0, 165)}...
          </p>
          <button onClick={() => toggleFavorite(movie.id)} style={{ color: favorites.includes(movie.id) ? 'gold' : 'gray' }} className='btnfav'>
            <FavoriteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
