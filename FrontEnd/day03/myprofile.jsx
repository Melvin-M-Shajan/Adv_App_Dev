import { useState } from "react";
import { Link as Defpath } from 'react-router-dom';

function MyProfile() {
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
    <div>
    <div>
      {/* Add the navigation bar here */}
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
      </nav>
      </div>return (

        <div id="wrapper">
          <div id="header">My Profile</div>
          <div id="slider">
            <div className="screen">
              <img className="profile-picture" src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D" />
              <div className="profile-owner">Andrei Dodu</div>
              <p className="ttch">Phone:9025567950  Email:abc@gamil.com</p>
            </div>
            <div className="screen">
              <div className="profile-description">
                <p className="pp">
                  I'm a software developer and web designer. I love electronic music and photography.
                </p>
                <p>
                  Esbjerg - <a href="http://www.andrei.dodu.it" target="_blank">www.andrei.dodu.it</a>
                </p>
                <p>
                  <a href="https://twitter.com/AndreiDodu" target="_blank">@AndreiDodu</a>
                </p>
              </div>
            </div>
          </div>		
          </div>
          </div>
          );
    }
      export default MyProfile;