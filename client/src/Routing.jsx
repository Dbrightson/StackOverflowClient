import React from 'react'
import {Routes,Route} from "react-router-dom";
import AskQuestion from './pages/AskQuestion/AskQuestion';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home'
import DisplayQuestion from './pages/Questions/DisplayQuestion';
import Questions from './pages/Questions/Questions';
import Tags from './pages/Tags/Tags';
import Users from './pages/Users/Users';
import UserProfile from './pages/UserProfile/UserProfile';
import Plans from './pages/Plans/Plans';
import Success from './pages/Plans/Success';
import Failure from './pages/Plans/Failure';
import StripeForm from './pages/Payment/StripeForm';

import SMHome from './pages/SocialMedia/Home/SMHome'
import SMUsers from './pages/SocialMedia/User/SMUsers'
import EditProfile from './pages/SocialMedia/User/EditProfile';
import Profile from './pages/SocialMedia/User/Profile';

const Routing = () => {
  return (    
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/Auth' element={<Auth />}/>
      <Route path='/Questions' element={<Questions />}/>
      <Route path='/AskQuestion' element={<AskQuestion />}/>
      <Route path='/Questions/:id' element={<DisplayQuestion />}/>
      <Route path='/Tags' element={< Tags />}/>
      <Route path='/Users' element={< Users />}/>
      <Route path='/Users/:id' element={< UserProfile />}/>
      <Route path='/Plans' element={< Plans />}/>
      <Route path='/Payment' element={< StripeForm />}/>
      <Route path='/Success' element={< Success />}/>
      <Route path='/Failure' element={< Failure />} />

      <Route path="/SocialMedia" element={<SMHome />} />
      <Route path="/SocialMedia/Users" element={<SMUsers/>}/>
      <Route path="/SocialMedia/User/edit/:userId" element={<EditProfile/>}/>
      <Route path="/SocialMedia/User/:userId" element={<Profile/>}/>
    </Routes>
  )
}

export default Routing