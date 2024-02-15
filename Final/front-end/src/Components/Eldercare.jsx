import React, { useState } from 'react';
import '../css/eldercare.css';
import axios from 'axios';

function AppointmentPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const data={
      name:formData.name,
      phone:formData.phone,
      service:formData.service,
      date:formData.date,
      time:formData.time
    }
    axios.post("http://localhost:8080/add/book", data)
      .then(response => {
        console.log('Resume created successfully:', response.data);
      })
      .catch(error => {
        console.error('Error creating resume:', error);
      });
      alert("Form Submitted");
  };

  return (
    <div className='Miller'>
      <h1 style={{fontSize:"70px",marginTop:"500px",color:"white "}}>Appointment Booking</h1>
    <div className='Meet'>
      <div className='about1'>


- Welcome to our appointment booking service!
<br></br>
<br></br>
- Easily schedule appointments online at your convenience.
<br></br>
<br></br>
- We offer a wide range of services to cater to various needs.
<br></br>
<br></br>
- Booking appointments is quick and simple.
<br></br>
<br></br>
- Tailor appointments to suit your schedule and preferences.
<br></br>
<br></br>
- Rest assured, your information is safe and secure with us.
<br></br>
<br></br>
- Receive prompt confirmation of your appointment via email or text.
<br></br>
<br></br>
- Get timely reminders about your upcoming appointments to stay organized.
<br></br>
<br></br>
- Enjoy 24/7 access to our booking platform.
<br></br>
<br></br>
<br></br>


      </div>
      <div className='No'>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          style={{width:"350px"}}
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <label>PhoneNumber:</label>
        <input
          type="number"
          name="phone"
          style={{width:"350px"}}
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <label>Type of Service:</label>
        <input
          type="text"
          name="service"
          style={{width:"350px"}}
          value={formData.service}
          onChange={handleInputChange}
          required
        />
        <label>Date:</label>
        <input
          type="text"
          name="date"
          style={{width:"350px"}}
          value={formData.date}
          onChange={handleInputChange}
          required
        />
        <label>Time:</label>
        <input
          type="text"
          name="time"
          style={{width:"350px"}}
          value={formData.time}
          onChange={handleInputChange}
          required
        />
        {/* Add similar input fields for email, phone number, preferred date, preferred time, and additional info */}
        <button type="submit">Submit</button>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <p>Phone: <a href="tel:+19787484733">978-748-4733</a></p>
      <p>Email: <a href="mailto:your@email.com">aramseivom@email.com</a></p>
      <p>Address: 12, Purasaiakam Street, Chennai, Tamilnadu, 600028</p>
    </div>
    </div>
    </div>
  );
}

export default AppointmentPage;
