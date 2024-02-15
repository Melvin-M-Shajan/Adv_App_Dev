import React from 'react'
import"../css/Home.css";
import { Link } from 'react-router-dom';
import '../css/Footer.css';
import GoogleIcon from '@mui/icons-material/Google';

const Home = () => {
  return (
    <div className='body'>
    <div className="header"><h1>SeniorCare Service</h1>
    <br></br>
    <br></br>
    <br></br>
    <div className="topnav">
    <a href="#">Home</a>
    <a href="/about">About Us</a>
    <a href="/call">Callback</a>
    <Link to="/ser">Services</Link>
    <a href="/login">Login</a>
    <a href="/register">Signup</a>
    
    </div>
    <div className='para'>
    <p >
    </p>
    </div>
    </div>
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: AgaramHomeCare@gmail.com</p>
          <p>Phone: +91 (978) 748-4733</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>Connect with us on social media:</p>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Seniocare Service. All rights reserved.</p>
      </div>
    </footer>
</div>
  )
}

export default Home