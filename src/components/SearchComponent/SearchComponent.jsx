import React, { useState } from 'react';
import anime from 'animejs';
import './SearchComponent.css';
import SearchIcon from '@mui/icons-material/Search';

const SearchComponent = ({ handleSearch }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  const toggleOpen = () => {
    setSearchOpen(true);
    anime({
      targets: '.search',
      duration: 1000,
      elasticity: 400,
      width: 250,
      marginLeft: -210
    });
    anime({
      targets: '.search-btn',
      duration: 1000,
      backgroundColor: 'transparent',
      color: '#FF3B42',
      elasticity: 200,
      translateX: 6,
    });
  };

  const toggleClose = () => {
    setSearchOpen(false);
    anime({
      targets: '.search',
      duration: 700,
      elasticity: 200,
      width: 40,
      marginLeft: 0
    });
    anime({
      targets: '.search-btn',
      duration: 700,
      backgroundColor: 'transparent',
      color: '#fff',
      elasticity: 200,
      translateX: 0,
    });
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <div style={{width: '0px'}} className="search-container">
      <div className={`search ${searchOpen ? 'search-open' : ''}`} style={{ display: 'flex', alignItems: 'center' }}>
        <button
          className="search-btn"
          onClick={searchOpen ? toggleClose : toggleOpen}
        >
          <SearchIcon />
        </button>
        <input
          type="search"
          className="search-input"
          placeholder="Type to search..."
          style={{ display: searchOpen ? 'block' : 'none' }}
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onBlur={() => {
            setTimeout(() => {
              if (!document.activeElement.classList.contains('search-input')) {
                toggleClose();
              }
            }, 200);
          }}
        />
      </div>
    </div>
  );
};

export default SearchComponent;
