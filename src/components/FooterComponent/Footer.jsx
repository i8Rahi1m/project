import React from 'react';
import './Footer.css'; // You can customize styles here
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import logo from './Leonardo_Phoenix_A_stylized_logo_resembling_the_Netflix_logo_b_3-removebg-preview (2).png';

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-content">
                <img className='footerImg' style={{width: '250px', position: 'absolute', left: '6%', top: '25px'}} src={logo} alt="" />
                <div className="footer-links">
                    <a href="/about">About Us</a>
                    <a href="/contact">Contact Us</a>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                </div>
                <div className="footer-social">
                    <a style={{ alignItems: 'center'}} href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FacebookIcon/></a>
                    <a style={{ alignItems: 'center'}} href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><XIcon/></a>
                    <a style={{ alignItems: 'center'}} href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><InstagramIcon/></a>
                    <a style={{ alignItems: 'center'}} href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
                </div>
                <div className="footer-copyright">
                    <p>&copy; {new Date().getFullYear()} Sinima TJ. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
