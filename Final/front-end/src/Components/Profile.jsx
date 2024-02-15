import React, { useState } from 'react';
import "../css/profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'A passionate individual who loves coding!',
  });
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdate = () => {
    toggleEditMode();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  return (
    <div>
    <div class="-user-login-container">
    <h2 class="jf">User Profile</h2>
    {isEditing ? (
      <div>
      <label>Name:</label>
          <input
          class="input"
            type="text"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
          <br />
          <label>Email:</label>
          <input
          class="input"
            type="text"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <br />
          <label>Bio:</label>
          <textarea
          class="textarea"
          name="bio"
          value={userData.bio}
          onChange={handleInputChange}
          ></textarea>
          <br />
          <button onClick={handleUpdate}>Save</button>
          </div>
          ) : (
            <div>
            <p>
            <strong>Name:</strong> {userData.name}
            </p>
            <p>
            <strong>Email:</strong> {userData.email}
            </p>
            <p>
            <strong>Bio:</strong> {userData.bio}
            </p>
            <button class="bt"onClick={toggleEditMode}>Edit</button>
            </div>
            )}
            </div>
            </div>
            );
          };
          
          export default Profile