import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "aos/dist/aos.css";

const MovieCube = ({ 
  movie, 
  categories = [], 
  toggleFavorite, 
  handlePlayClick, 
  favorites = [] 
}) => {
  return (
    <div className="container">
      <div className="cube">
        <div className="cube-side front">
          <img
            style={{
              position: 'absolute',
              left: '-64.9px',
              width: '231px',
              height: '342px',
              marginLeft: '65px',
            }}
            src={movie.poster}
            alt=""
          />
          <h4 className="title">{movie.imya}</h4>
        </div>
        <div className="cube-side right">
          <h4
            style={{
              position: 'absolute',
              top: '15px',
              textAlign: 'center',
              lineHeight: '0.9',
              wordWrap: 'break-word',
              maxWidth: '100%',
            }}
          >
            {movie.imya}
          </h4>
          <div
            style={{
              position: 'absolute',
              top: '35px',
              marginTop: '14px',
              display: 'flex',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '15px',
                fontWeight: '600',
                color: '#007bff',
                width: '200px',
              }}
            >
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  marginRight: '5px',
                  color: 'black',
                }}
              >
                {movie.year}
              </span>
              {movie.category
                .map((catId) => {
                  const category = categories.find((cat) => cat.id == catId);
                  return category ? category.name : '';
                })
                .join(', ')}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              top: '95px',
              justifyContent: 'space-between',
              width: '150px',
            }}
          >
            <button
              onClick={() => handlePlayClick(movie.id)}
              className="mov play"
            >
              <PlayArrowIcon />
            </button>
            <button
              onClick={() => toggleFavorite(movie.id)}
              style={{ color: favorites.includes(movie.id) ? 'gold' : 'gray' }}
              className="mov star"
            >
              <FavoriteIcon style={{ zoom: '0.9', marginTop: '2px' }} />
            </button>
          </div>
          <p
            style={{
              fontSize: '15px',
              fontWeight: '500',
              paddingLeft: '20px',
              paddingRight: '20px',
              paddingTop: '10px',
              position: 'absolute',
              top: '170px',
              borderTop: '4px solid #ff3b41',
            }}
          >
            {movie.desc.substring(0, 123)}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MovieCube);
