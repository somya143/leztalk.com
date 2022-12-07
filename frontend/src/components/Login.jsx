import React from 'react';
import { useSelector , useDispatch } from "react-redux"
import { loginUser } from '../redux/auth/auth.action';

const Login = () => {
const [login , setLogin] = React.useState({});
const { isError , isLoading} = useSelector((store) => store.auth);
const dispatch = useDispatch();

const handleChange = (e) => {
 const {name ,value} = e.target;
 setLogin({
    ...login,
    [name] : value
 })
}

const handleSubmit = (e) => {
e.preventDefault();
dispatch(loginUser(login));
}

if(isLoading){
    return <h1>...Loading,  Please wait sometime</h1>
}else if(isError){
    return <h1>...Something went wrong</h1>
}else

  return (

    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="email" placeholder='Enter Email...' name='email' onChange={handleChange} />
            <input type="password" placeholder='Enter Password...' name='password' onChange={handleChange} />
            <input type="submit" />
        </form>
    </div>
  )
}

export default Login
