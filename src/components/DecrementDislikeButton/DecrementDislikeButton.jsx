import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import './DecrementDislikeButton.css';

const DecrementDislikeButton = ({ movieId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dislikes, setDislikes] = useState(0); // Initial value for dislikes
  const [hasDisliked, setHasDisliked] = useState(false); // Track if the user has disliked the movie
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });

  const userName = sessionStorage.getItem('userName');

  useEffect(() => {
    // Fetch the initial dislikes value when the component mounts
    const fetchDislikes = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Movies/${movieId}`);
        const movie = response.data;
        setDislikes(movie.dislike || 0); // Initialize the dislikes state with the fetched value

        // Check if the user has already disliked the movie
        const dislikedMovies = JSON.parse(localStorage.getItem(`dislikedMovies_${userName}`)) || [];
        setHasDisliked(dislikedMovies.includes(movieId));
      } catch (err) {
        setError('Failed to fetch the dislikes.');
      }
    };

    fetchDislikes();
  }, [movieId, userName]);

  const handleClick = async () => {
    if (hasDisliked) {
      setError('You have already disliked this movie.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch the current movie data
      const response = await axios.get(`http://localhost:3000/Movies/${movieId}`);
      const movie = response.data;

      // Decrement the 'dislike' property
      const updatedDislikes = (movie.dislike || 0) + 1;

      // Update the movie data on the server
      await axios.put(`http://localhost:3000/Movies/${movieId}`, {
        ...movie,
        dislike: updatedDislikes,
      });

      // Update local state
      setDislikes(updatedDislikes);

      // Mark as disliked for this user
      const dislikedMovies = JSON.parse(localStorage.getItem(`dislikedMovies_${userName}`)) || [];
      dislikedMovies.push(movieId);
      localStorage.setItem(`dislikedMovies_${userName}`, JSON.stringify(dislikedMovies));
      setHasDisliked(true);
    } catch (err) {
      setError('Failed to update the dislikes.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode); // Save to local storage
      return newMode;
    });
  };

  return (
    <div>
      <button 
        onClick={handleClick} 
        disabled={hasDisliked} 
        className={`like-button reaction-button ${darkMode ? 'dark-mode' : ''}`}
      >
        <ThumbDownAltIcon />
        <span>{dislikes}</span>
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default DecrementDislikeButton;
