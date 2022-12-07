import React from 'react';
import { useSelector , useDispatch} from "react-redux"
import { registerUser } from '../redux/auth/auth.action';
import {useNavigate} from "react-router-dom"
const Register = () => {
const [register , setRegister] = React.useState({});
const { isLoading , isError} = useSelector((store) => store.auth);
const dispatch = useDispatch();
const Navigate = useNavigate();
 
const handleChange = (e) => {
    const {name , value} = e.target;
   setRegister({
    ...register,
    [name] : value
   })
}

const handleSubmit = (e) => {
e.preventDefault();
dispatch(registerUser(register))
}

const handleClick= () => {
Navigate("/login")
}

if(isLoading){
    return <h1>...Loading. Please wait</h1>
}else if(isError){
    return <h1>...Something went wrong</h1>
}else

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Name...' name='name' onChange={handleChange} />
            <input type="email" placeholder='Enter Email...' name='email' onChange={handleChange} />
            <input type="password" placeholder='Enter Password...' name='password' onChange={handleChange} />
            <input type="number" placeholder='Enter Age...' name='age' onChange={handleChange} />
            <button>Register</button>
        </form>

        <button onClick={handleClick}>Login</button>
    </div>
  )
}

export default Register
