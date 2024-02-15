import axios from 'axios';
import React, { useState } from 'react';

function CallbackForm() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement your logic to handle form submission, like sending data to a server
    console.log(`Name: ${name}, Phone Number: ${phoneNumber}`);
    // Reset form fields after submission
    setName('');
    setPhoneNumber('');
    axios.post("http://localhost:8080/contact", {name:name,phone:phoneNumber})
      .then(response => {
        console.log( response.data);
      })
      .catch(error => {
        console.error(error);
      });
      alert("Request Submitted");
  };

  return (
    <div>
      <h2>Request a Callback for Senior Care</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit">Request Callback</button>
      </form>
    </div>
  );
}

export default CallbackForm;
