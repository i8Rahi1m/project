import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css'; // Import the CSS for the navigation
import { FaSearch } from 'react-icons/fa';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SearchComponent from '../searchComponent/searchComponent';
import { useNavigate, useParams } from 'react-router-dom';
import AOS from "aos";
import axios from 'axios';
import { fetchAllMovies, fetchCategories } from '../../api/moviesApi';

const NavBar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const { categoryId, sortType } = useParams();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);    
  const [categoryName, setCategoryName] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [cmovie, setCmovie] = useState(false);
  const [stuckCmovie, setStuckCmovie] = useState(false);
  const [ctop, setCtop] = useState(false);
  const [stuckCtop, setStuckCtop] = useState(false);
  const [clog, setClog] = useState(false);
  const [stuckClog, setStuckClog] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [userName, setUserName] = useState('Guest');
  const navigate = useNavigate();
  const cmovieButtonRef = useRef(null);
  const cmovieDivRef = useRef(null);
  const ctopButtonRef = useRef(null);
  const ctopDivRef = useRef(null);
  const clogButtonRef = useRef(null);
  const clogDivRef = useRef(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
});
  async function getData() {
    try {
        const response = await fetchAllMovies();
        const categoriesResponse = await fetchCategories();
        setData(response);
        setFilteredData(response);
        setCategories(categoriesResponse);
        let index = parseInt(localStorage.getItem('currentMovieIndex'), 10);
        if (isNaN(index) || index >= response.length) {
            index = 0;
        }
        localStorage.setItem('currentMovieIndex', (index + 1) % response.length);
    } catch (error) {
        console.error(error);
    }
}
const handleMouseEnter = () => {
if (!stuckCmovie) {
  setCmovie(true);
}
};

const handleMouseLeave = () => {
if (!stuckCmovie) {
  setCmovie(false);
}
};

const handleClick = () => {
setStuckCmovie(!stuckCmovie);
setCmovie(!stuckCmovie);
};

const handleMouseEnter2 = () => {
setCtop(true);
};

const handleMouseLeave2 = () => {
if (!stuckCtop) {
  setCtop(false);
}
};

const handleClick2 = () => {
setStuckCtop(!stuckCtop);
setCtop(!stuckCtop);
};

const handleMouseEnter3 = () => {
setClog(true);
};

const handleMouseLeave3 = () => {
  setCtop(false);
};
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

const handleCategoryClick = (categoryId, sortType = null) => {
const path = sortType ? `/category/${categoryId}/${sortType}` : `/category/${categoryId}`;
navigate(path);
};

const handleSearch = (query) => {
navigate(`/search?query=${encodeURIComponent(query)}`);
};
useEffect(() => {
getData();
document.addEventListener('mousedown', handleClickOutside);
return () => {
    document.removeEventListener('mousedown', handleClickOutside);
};
}, []);


useEffect(() => {
const storedUserName = sessionStorage.getItem('userName');
if (storedUserName) {
    setUserName(storedUserName);
}
}, []);

useEffect(() => {
localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);

useEffect(() => {
if (location.state?.success) {
  toast.success('Log in succeeded');
}
}, [location.state]);


useEffect(() => {
AOS.init({duration: 500});
AOS.refresh();
}, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 95) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 95) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
        const newMode = !prevMode;
        localStorage.setItem('darkMode', newMode);
        return newMode;
    });
};
  return (
    <div className={`nav-bar ${isFixed ? 'fixed-nav' : ''}`}>
      <ul style={{marginTop: '-4px'}}>
        <div><li><a ref={cmovieButtonRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleClick} style={{ marginLeft: '45px' }}>ФИЛЬМЫ</a></li>{(cmovie || stuckCmovie) && (
                          <div
                              data-aos="fade-up"
                              ref={cmovieDivRef}
                              onMouseEnter={() => setCmovie(true)}
                              onMouseLeave={() => {
                                  if (!stuckCmovie) {
                                      setCmovie(false);
                                  }
                              }}
                              className={`category ${darkMode ? 'dark-mode' : ''}`} 
                          >
                              {categories.map((category) => (
                                  <button key={category.id} onClick={() => handleCategoryClick(category.id)} style={{ fontSize: '15.5px' }}>{category.name}</button>
                              ))}
                          </div>
                      )}</div>
        <li><a href="/category/25">СЕРИАЛЫ</a></li>
        <li><a href="/category/6">МУЛЬТФИЛЬМЫ</a></li>
        <li><a href="#"> ТОП 100</a></li>
        <li><a href="#">ДРУГОЕ</a></li>
      </ul>
        <SearchComponent handleSearch={handleSearch}/>
        {(ctop || stuckCtop) && (
                <div
                    data-aos="fade-up"
                    style={{ height: '50px', width: '350px', left: '38.7%' }}
                    ref={ctopDivRef}
                    onMouseEnter={() => setCtop(true)}
                    onMouseLeave={() => {
                        if (!stuckCtop) {
                            setCtop(false);
                        }
                    }}
                    className={`category ${darkMode ? 'dark-mode' : ''}  ${isFixed ? 'fixed-nav' : ''}`} 
                >
                    {categories.slice(0, 1).map((category) => <>
                        <button onClick={() => handleCategoryClick('kinopoisk')} style={{ fontSize: '15px', width: '180px' }}>ТОП по Кинопоиску</button>
                        <button onClick={() => handleCategoryClick('IMDB')} style={{ fontSize: '15px' }}>ТОП по IMDB</button>
                    </>)}
                </div>
            )}
          {(clog || stuckClog) && (
                <div
                    style={{ height: '135px', width: '170px', left: '80%', backgroundColor: 'rgba(0, 0, 0, 0.696)', backdropFilter: 'blur(4px)', color: 'white', paddingLeft: '15px', paddingTop: '5px'}}
                    ref={clogDivRef}
                    onMouseEnter={() => setClog(true)}
                    onMouseLeave={() => {
                        if (!stuckClog) {
                            setClog(false);
                        }
                    }}
                    className={`category ${darkMode ? 'dark-mode' : ''}`} 
                >
                    <h2 style={{fontSize: '22px'}}>{userName.substring(0, 10)}<CheckIcon style={{fontSize: '20px', marginLeft: '5px'}}/></h2>
                    <p style={{marginTop: '5px'}}>You logged in</p>
                    <button onClick={()=>{ destroyToken(), navigate('/')}} style={{marginTop: '10px', backgroundColor: 'white', color: '#05041c', borderRadius: '10px', padding: '5px', width: 'fit-content', paddingLeft: '10px', paddingRight: '10px', marginLeft: '-5px'}}>Click to log out</button> 
                </div>
            )}  
    </div>
  );
};

export default NavBar;
