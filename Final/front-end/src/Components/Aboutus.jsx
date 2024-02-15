import React from 'react';
import '../css/aboutus.css';

const Aboutus = () => {
  return (
    <div className="about-us-container">
      <div className="mission-section">
        <h2>Our Mission</h2><br></br>
        <p>Empowering seniors to live independently and with dignity in the comfort of their own homes is at the heart of our mission. We strive to enhance the quality of life for each individual we serve by offering personalized care plans tailored to their unique needs and preferences.</p>
      </div>
      <div className="what-sets-us-apart">
        <h2>What Sets Us Apart</h2><br></br>
        <ul>
          <li><strong>Compassionate Caregivers:</strong> Our caregivers undergo rigorous training and are selected for their empathy, professionalism, and dedication to providing exceptional care.</li><br></br>
          <li><strong>Personalized Approach:</strong> We understand that each senior has unique needs and preferences. That's why we work closely with clients and their families to develop customized care plans that promote independence and well-being.</li><br></br>
          <li><strong>Safety and Security:</strong> Ensuring the safety and security of our clients is our top priority. From regular safety assessments to emergency response protocols, we take every precaution to provide peace of mind for seniors and their loved ones.</li>
        </ul>
      </div>
      <div className="contact-section">
        <h2>Get in Touch</h2><br></br>
        <p>We're here to answer any questions you may have and to help you explore how our services can benefit your loved one. Contact us today to schedule a complimentary consultation.</p>
        <p><strong>Phone:</strong> [6382153011]</p>
        <p><strong>Email:</strong> [AgaramHomeCare@gmail.com]</p>
        <p><strong>Address:</strong> []</p>
      </div>
      {/* Testimonials, Our Team, Connect With Us sections can be added similarly */}
    </div>
  );
}

export default Aboutus;