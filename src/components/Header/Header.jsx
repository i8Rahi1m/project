import React, { useEffect, useRef, useState } from 'react';
import './Header.css'; // Import the CSS styles for the header
import logo from './logo-topfile.png';
import formulaBanner from './formula55-banner.png';
import profilePic from './profile-picture.jpg';
import { FaTelegram, FaFacebook, FaInstagram, FaBell, FaSearch } from 'react-icons/fa';
import NavBar from '../NavBar/NavBar';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import ContactsIcon from '@mui/icons-material/Contacts';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';

const Header = () => {
  const [marginTop, setMarginTop] = useState('0px');

  const handleAddToFavorites = () => {
    const url = window.location.href;
    const title = document.title;
    
    // For IE/Edge
    if (window.external && ('AddFavorite' in window.external)) {
      window.external.AddFavorite(url, title);
    } else {
      alert('Нажмите Ctrl+D чтобы добавить страницу в закладки.');
    }
  };


  const handleClick = () => {
    setMarginTop('15px');
  };
  return (<>
    <div className="header">
      <div className="top-header">
        <div className="logo">
        <Link onClick={handleClick} to="/"><img src={logo} alt="Sinima.TJ" /></Link>
        </div>
        <div className="social-icons">
          <a style={{display: 'flex'}} href="#"><TelegramIcon  style={{fontSize: '26px'}}/></a>
          <a style={{display: 'flex'}} href="#"><FacebookIcon  style={{fontSize: '26px'}}/></a>
          <a style={{display: 'flex'}} href="#"><InstagramIcon style={{fontSize: '26px'}}/></a>
        </div>
        <div className="banner">
          <img style={{borderRadius: '10px'}} src={formulaBanner} alt="Formula55 Banner" />
        </div>
        <div className="header-righd">
          <a href="#" onClick={handleAddToFavorites} className="bookmarks"><TurnedInNotIcon style={{fontSize: '18px', marginTop: '-1px', marginRight: '3px'}}/>В ЗАКЛАДКИ</a>
          <a href="#" className="contacts"><ContactsIcon style={{fontSize: '18px', marginTop: '-1px', marginRight: '3px'}}/>КОНТАКТЫ</a>
        </div>
        <div style={{width: '200px', display: 'flex', marginRight: '-10px'}}>

        <div className='account-bd'>
          <Link to="/favorites">
          <div className="notification">
            <NotificationsNoneIcon style={{ fontSize: '40px', marginLeft: '8px', marginTop: '7px'}} />
          </div>
          </Link>
        </div>
        <div className='acount'>
          <div className="profile">
            <img src={profilePic} alt="Profile" className="profile-pic" />
          </div>
            <MoreVertIcon style={{color: 'rgb(114, 0, 0)'}}/>
        </div>
        </div>
      </div>
      <NavBar />
    </div>
    
    </>);
};

export default Header;
