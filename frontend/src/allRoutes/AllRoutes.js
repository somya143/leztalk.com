import React from 'react'
import {Routes , Route , Link} from "react-router-dom";
import Register from '../components/Register';
import Login from '../components/Login';
import GroupChat from '../components/GroupChat';
import Personalchat from '../components/Personalchat';
import Home from '../components/Home';

const AllRoutes = () => {
  return (
    <div>

      <div>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/Login">Login</Link>
        <Link to="/groupchat">GroupChat</Link>
        <Link to="/personalchat">PersonalChat</Link>
      </div>

        <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/groupchat' element={<GroupChat></GroupChat>}></Route>
            <Route path='/personalchat' element={<Personalchat></Personalchat>}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes