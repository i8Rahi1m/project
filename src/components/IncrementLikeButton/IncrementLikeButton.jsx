import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import './IncrementLikeButton.css';

const IncrementLikeButton = ({ movieId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  const userName = sessionStorage.getItem('userName');

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Movies/${movieId}`);
        const movie = response.data;
        setLikes(movie.like || 0);

        // Check if the user has already liked the movie
        const likedMovies = JSON.parse(localStorage.getItem(`likedMovies_${userName}`)) || [];
        setHasLiked(likedMovies.includes(movieId));
      } catch (err) {
        setError('Failed to fetch the likes.');
      }
    };

    fetchLikes();
  }, [movieId, userName]);

  const handleClick = async () => {
    if (hasLiked) {
      setError('You have already liked this movie.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/Movies/${movieId}`);
      const movie = response.data;
      const updatedLikes = (movie.like || 0) + 1;

      await axios.put(`http://localhost:3000/Movies/${movieId}`, {
        ...movie,
        like: updatedLikes,
      });

      setLikes(updatedLikes);

      // Mark as liked for this user
      const likedMovies = JSON.parse(localStorage.getItem(`likedMovies_${userName}`)) || [];
      likedMovies.push(movieId);
      localStorage.setItem(`likedMovies_${userName}`, JSON.stringify(likedMovies));
      setHasLiked(true);
    } catch (err) {
      setError('Failed to update the likes.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  return (
    <div>
      <button 
        onClick={handleClick} 
        className={`like-button reaction-button ${darkMode ? 'dark-mode' : ''}`}
        disabled={hasLiked}
      >
        <ThumbUpAltIcon />
        <p>{likes}</p>
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default IncrementLikeButton;
