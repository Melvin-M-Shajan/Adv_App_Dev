import React from 'react'
import { useState} from 'react'
// import './Admin.css'

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    return (
      <div className="adm">
        <h2>Admin Login</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="button" >
            Login
          </button>
        </form>
      </div>
    );
  };
  
export default AdminLogin