import { useState } from "react";
import { Link as Defpath } from 'react-router-dom';

function AboutUs() {
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
      </div>
      <div>
        <section className="section2" id="AboutUs">
          <table>
            <tbody><tr>
                <td>
                  <img src="https://images.unsplash.com/photo-1499083097717-a156f85f0516?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80" alt="AboutUs" />
                </td>
                <td>
                  <span className="title">About Us</span>
                  <span className="sub-title"></span>
                  <p>At SeniorCare , we are dedicated to providing compassionate and comprehensive care for seniors, ensuring they live fulfilling and dignified lives in the comfort of their own homes. With a team of highly skilled caregivers and a commitment to excellence, we strive to meet the unique needs of each individual we serve.</p>
                  <br></br>
                  <a href="#OurMission" className="btn1">Our Misssion</a> <a href className="btn2">Know More</a>
                </td>
              </tr>
            </tbody></table>
        </section>
        <section className="section3" id="OurMission">
          <table>
            <tbody><tr>
                <td>
                  <span className="title">Our Mission</span>
                  <span className="sub-title">Lorem ipsum dolor sit amet, consectetur adi</span>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <a href className="btn2">Know More</a>
                </td>
                <td>
                  <img src="https://images.unsplash.com/photo-1499083097717-a156f85f0516?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80" alt="AboutUs" />
                </td>
              </tr>
            </tbody></table>
        </section>
        <div className="footer">
          Credits: Unsplash  
        </div>
      </div>
      </div>
    );
  }
export default AboutUs;