import React, { useState } from 'react'
import "../css/Login.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [popupStyle, showPopup] = useState("hide")
  const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const loginData = {
        email: username,
        password: password,
      };
      console.log(loginData);
  
      try {
        const response = await axios.post('http://localhost:8081/api/v1/auth/login', loginData);
        console.log(response.data);
        alert(response.data.message); 
        navigate('/');
        
        // localStorage.setItem('token', response.data.token);
        
        // if (email === 'admin@gmail.com') {
          //   navigate('/');
          // } else {
            // }
          } catch (error) {
            console.error('Error during login:', error);
            alert("Wrong Credentials"); 
          
        }
    };  
  const toggle = () => {
    navigate('/admin')
  }
  return (
    <div className='con'>
    <div className="cover">
    <h1 className='login-color'>Login</h1>
    <input type="text" placeholder="username"
  onChange={(e)=>setUsername(e.target.value)}/>
    <input type="password" placeholder="password"
      
  onChange={(e)=>setPassword(e.target.value)}
    />
    
    <Link to="/user"><div className="login-btn" onClick={handleSubmit}>Login</div></Link>
    <button>Create New Account</button>
    <br></br>
    <button onClick={toggle}>Admin login ? </button>
    <div className="alt-login">

    <div className="google"></div>
    </div>
    <div className={popupStyle}>
    <h3>Login Failed</h3>
    <p>Username or password incorrect</p>
    </div>
    </div>
    </div>
  )
}

export default Login
