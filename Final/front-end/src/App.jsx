import React from 'react'
import SignupPage from './Components/Signup'
import Login from './Components/Hello'
import Home from './Components/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Services from './Components/services'
import AboutUsPage from './Components/Aboutus'
import AppointmentPage from './Components/Eldercare'
import User from './Components/User'
import Profile from './Components/Profile'
import CallbackForm from './Components/Callback'
import Adminlogin from './Components/Adminlogin'
// import Admin from './Admin/Admin'





const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<SignupPage/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/ser' element={<Services/>}/>
        <Route path='/user' element={<User/>}/>
        <Route path='/appoint' element={<AppointmentPage/>}/>
        <Route path='/aboutus' element={<AboutUsPage/>}/>
        <Route path='/about' element={<AboutUsPage/>}/>
        <Route path='/service' element={<Services/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/Eldercare' element={<AppointmentPage/>}/>
        <Route path='/call' element={<CallbackForm/>}/>
        <Route path='/admin' element={<Adminlogin/>}/>
        {/* <Route path='/adminpanel' element={<Admin/>}/> */}



      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App