import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css'
import { useNavigate } from 'react-router-dom';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import CategoriesList from '../components/CategoriesList/CategoriesList';
import { colors } from '@mui/material';

const AdminPage = () => {
    const navigate = useNavigate();
    const [displayedCategories, setDisplayedCategories] = useState([]);
    const categories = [
      {
        "name": "фантастика",
        "id": "1"
      },
      {
        "name": "боевик",
        "id": "2"
      },
      {
        "name": "триллер",
        "id": "3"
      },
      {
        "name": "комедия",
        "id": "4"
      },
      {
        "name": "криминал",
        "id": "5"
      },
      {
        "name": "мультфильм",
        "id": "6"
      },
      {
        "name": "фэнтези",
        "id": "7"
      },
      {
        "name": "семейный",
        "id": "8"
      },
      {
        "name": "приключения",
        "id": "9"
      },
      {
        "name": "драма",
        "id": "10"
      },
      {
        "name": "мелодрама",
        "id": "11"
      },
      {
        "name": "детектив",
        "id": "12"
      },
      {
        "name": "военный",
        "id": "13"
      },
      {
        "name": "история",
        "id": "14"
      },
      {
        "name": "биография",
        "id": "15"
      },
      {
        "name": "вестерн",
        "id": "16"
      },
      {
        "name": "спорт",
        "id": "17"
      },
      {
        "name": "мюзикл",
        "id": "18"
      },
      {
        "name": "ужасы",
        "id": "19"
      },
      {
        "name": "музыка",
        "id": "20"
      },
      {
        "name": "документальный",
        "id": "21"
      },
      {
        "name": "индийский",
        "id": "22"
      },
      {
        "name": "короткометражка",
        "id": "23"
      },
      {
        "name": "аниме",
        "id": "24"
      },
      {
        "name": "сериалы",
        "id": "25"
      },
      {
        "name": "телешоу",
        "id": "26"
      },
      {
        "name": "tajik",
        "id": "27"
      }
    ];
  const [formData, setFormData] = useState({
    id: 0,
    poster: '',
    video: '',
    trailer: '',
    trailr: '',
    name: '',
    imya: '',
    year: '',
    budget: '',
    IMDB: '',
    kinopoisk: '',
    like: 0,
    dislike: 0,
    desc: '',
    director: '',
    duration: '',
    category: [],
    starring: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: '', image: '' })),
  });
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
});

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Movies');
        setFormData((prevData) => ({
          ...prevData,
          id: response.data.length + 1,
        }));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value.split(' ').map(Number);
    const selectedCategories = categories
      .filter(cat => value.includes(Number(cat.id)))
      .map(cat => cat.name);
    
    setFormData({
      ...formData,
      category: value,
    });

    setDisplayedCategories(selectedCategories);
  };

  const handleStarringChange = (index, e) => {
    const newStarring = formData.starring.map((star, i) => {
      if (index === i) {
        return { ...star, [e.target.name]: e.target.value };
      }
      return star;
    });
    setFormData({ ...formData, starring: newStarring });
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
        const newMode = !prevMode;
        localStorage.setItem('darkMode', newMode); // Save to local storage
        return newMode;
    });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/Movies', formData);
      alert('Movie added successfully!');
      setFormData({
        id: formData.id + 1,
        poster: '',
        video: '',
        trailer: '',
        trailr: '',
        name: '',
        imya: '',
        year: '',
        budget: '',
        IMDB: '',
        kinopoisk: '',
        like: 0,
        dislike: 0,
        desc: '',
        director: '',
        duration: '',
        category: [],
        starring: Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: '', image: '' })),
      });
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Failed to add movie.');
    }
  };
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  const toggleCategoriesList = () => {
    setIsCategoriesVisible(!isCategoriesVisible);
  };
  return (<>
    <div className={`admin-page ${darkMode ? 'dark-mode' : ''}`}>
       <button onClick={() => { navigate("/") }} style={{ position: 'relative', left: '0px', padding: '5px 5px', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><FirstPageIcon /></button>
      <h2 className={`txt ${darkMode ? 'dark-mode' : ''}`}> Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="poster" value={formData.poster} onChange={handleChange} placeholder="Poster URL" required />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="video" value={formData.video} onChange={handleChange} placeholder="Video URL" required />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="trailer" value={formData.trailer} onChange={handleChange} placeholder="Trailer URL" />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="trailr" value={formData.trailr} onChange={handleChange} placeholder="Mix trailer URL" />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="imya" value={formData.imya} onChange={handleChange} placeholder="Name (Russian)" required />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="number" name="year" value={formData.year} onChange={handleChange} placeholder="Year" required />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="budget" value={formData.budget} onChange={handleChange} placeholder="Budget" required />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="number" step="0.1" max={10} min={0} name="IMDB" value={formData.IMDB} onChange={handleChange} placeholder="IMDB Rating" required />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="number" step="0.1" max={10} min={0} name="kinopoisk" value={formData.kinopoisk} onChange={handleChange} placeholder="Kinopoisk Rating" required />
        <textarea className={`txtDM ${darkMode ? 'dark-mode' : ''}`} name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" required />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="director" value={formData.director} onChange={handleChange} placeholder="Director" required />
        <input className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" required />
        <div style={{color: 'white'}}>
          <h3 style={{color: 'rgb(20, 20, 20)', marginBottom: '11px', marginTop: '14px'}}>Selected Categories:</h3> <p style={{color: 'black'}}>{displayedCategories.join(', ')}</p>
        </div>
        <input
          className={`txtDM ${darkMode ? 'dark-mode' : ''}`} 
          type="search"
          name="category"
          value={formData.category.join(' ')}
          onChange={handleCategoryChange}
          placeholder="Category (ex: 1 2)"
        /><button onClick={toggleCategoriesList}>
        {isCategoriesVisible ? 'Hide Categories' : 'Show Categories'}
      </button>
      {/* Pass the visibility state as a prop to CategoriesList */}
      <CategoriesList isVisible={isCategoriesVisible} />
        <h3 style={{marginTop: '20px'}} className={`txt ${darkMode ? 'dark-mode' : ''}`}>Starring</h3>
        {formData.starring.map((star, index) => (
          <div style={{marginTop: '10px'}} key={index}>
            <input style={{width: '50%'}} className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="name" value={star.name} onChange={(e) => handleStarringChange(index, e)} placeholder={`Actor Name ${index + 1}`} required />
            <input style={{width: '47%', marginLeft: '3%'}} className={`txtDM ${darkMode ? 'dark-mode' : ''}`} type="text" name="image" value={star.image} onChange={(e) => handleStarringChange(index, e)} placeholder={`Actor Image URL ${index + 1}`} />
          </div>
        ))}
        <br />
        <button type="submit">Add Movie</button>
      </form>
    </div>
    <CategoriesList/>
  </>);
};

export default AdminPage;
