import React, { useState } from 'react';
import "../css/Signup.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add logic for submitting the signup data to the server or any other actions
  };

  return (
    <div className='conn'>
      <form className="form" onSubmit={handleSubmit}>
      <h1>Signup Page</h1>
        <label>
          First Name:
          <input style={{backgroundColor:"white",color:"black",border:"3px solid grey"}}
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <br />
          <input style={{backgroundColor:"white",color:"black",border:"3px solid grey"}}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <br/>
          <input style={{backgroundColor:"white",color:"black",border:"3px solid grey"}}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input style={{backgroundColor:"white",color:"black",border:"3px solid grey"}}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
