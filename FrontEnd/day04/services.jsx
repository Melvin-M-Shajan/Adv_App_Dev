import { convertLength } from "@mui/material/styles/cssUtils";
import React, { useState } from "react";
import "./navbar.css";
import image1 from "./image1.avif";
import image2 from "./image2.avif";
import image3 from "./image3.avif";
import image4 from "./image4.avif";
import image5 from "./image5.avif";
import image6 from "./image6.avif";
import { Link as Defpath } from 'react-router-dom';



function Services() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <div className="home">
    <nav className="nav">
        <Defpath to="/" className="nav__brand">
          SeniorCare
        </Defpath>
        <ul className={active}>
          <li className="nav__item">
            <Defpath to="/" className="nav__link">
              Home
            </Defpath>
          </li>
          <li className="nav__item">
            <Defpath to="/services" className="nav__link">
              Services
            </Defpath>
          </li>
          <li className="nav__item">
            <Defpath to="/aboutus" className="nav__link">
              AboutUs
            </Defpath>
          </li>
          <li className="nav__item">
            <Defpath to="/contactus" className="nav__link">
              contactus
            </Defpath>
          </li>
          <li className="nav__item">
            <Defpath to="/myprofile" className="nav__link">
              MyProfile
            </Defpath>
          </li>
          <li className="nav__item">
          <Defpath to="/signup">
            <button className="nav__button">Logout</button></Defpath>
          </li>
        </ul>
        <div onClick={navToggle} className={icon}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </nav><br></br><br></br>
      <div className="image-gallery">
            <div className="gallery-row">
      <div className="gallery-item">
          <img src={image1} alt="Gallery Image 1" />
          <h2 className="image-description">In Home Services</h2>
          </div>
          <div className="gallery-item">
          <img src={image2} alt="Gallery Image 2" />
          <h2 className="image-description">Facility Care</h2>
          </div>
          <div className="gallery-item">
          <img src={image3} alt="Gallery Image 3" />
          <h2 className="image-description">Relative Care</h2>
          </div>
          </div>
          <div className="gallery-row">
          <div className="gallery-item">
          <img src={image4} alt="Gallery Image 1" />
          <h2 className="image-description">Respite Care</h2>
          </div>
          <div className="gallery-item">
          <img src={image5} alt="Gallery Image 2" />
          <h2 className="image-description">Pre&Post Operative</h2>
          </div>
          <div className="gallery-item">
          <img src={image6} alt="Gallery Image 3" />
          <h2 className="image-description">Dementia Care</h2>
          </div>
          </div></div>
          <footer className="content-footer">
          <p> Say hi to us on these social networks: </p>
          <ul className="social">
            <li> <a href="https://www.instagram.com/kalai.varshaa/"> Instagram </a> </li>
            <li> <a href="_INSERT_TWITTER_URL_HERE_"> Twitter </a> </li>
            <li> <a href="_INSERT_GOOGLE+_URL_HERE_"> Google+</a> </li>
          </ul>
        </footer>
      </div>
  );
}
export default Services;